import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts } from "@/api/blog";
import BlogPostContent from "./BlogPostContent";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/utils";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generatePersonSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate this page every 60 seconds

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Статтю не знайдено",
    };
  }

  const seo = (post as { seo?: { metaTitle?: string; metaDescription?: string; metaImage?: { url?: string } | number } }).seo;
  const metaTitle = seo?.metaTitle || (post as { meta?: { metaTitle?: string } }).meta?.metaTitle;
  const metaDescription = seo?.metaDescription ?? (post as { meta?: { metaDescription?: string } }).meta?.metaDescription ?? post.excerpt ?? '';
  const metaImage = seo?.metaImage && typeof seo.metaImage !== "number" && seo.metaImage?.url
    ? seo.metaImage.url
    : post.featuredImage && typeof post.featuredImage !== "number" && post.featuredImage?.url
      ? post.featuredImage.url
      : undefined;

  return {
    title: metaTitle || `${post.title} - Digital Nomad Visa Іспанія`,
    description: metaDescription,
    alternates: { canonical: getCanonicalUrl(`blog/${slug}`) },
    openGraph: {
      title: metaTitle || post.title,
      description: metaDescription,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: metaImage ? [metaImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || post.title,
      description: metaDescription,
      images: metaImage ? [metaImage] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts (exclude current post)
  // Error handling: if fetch fails, continue with empty array
  let relatedPosts = [];
  try {
    if (post.relatedPosts && post.relatedPosts.length > 0) {
      relatedPosts = post.relatedPosts;
    } else {
      relatedPosts = await getRecentPosts(2, post.id);
    }
  } catch (error) {
    console.error('Error fetching related posts:', error);
    relatedPosts = [];
  }

  // Fetch latest posts for sidebar / below-content block (always by date, exclude current)
  let latestPosts = [];
  try {
    latestPosts = await getRecentPosts(4, post.id);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    latestPosts = [];
  }

  // Serialize content to HTML if it's available in the special field
  // or user content_html if lexicalHTML populated it (which we configured)
  const contentHtml = (post as any).content_html || null;

  const breadcrumbItems = [
    { label: "Головна", href: "/" },
    { label: "Блог", href: "/blog" },
    ...(post.category && typeof post.category !== "number"
      ? [{ label: post.category.name, href: `/blog/category/${post.category.slug}` }]
      : []),
    { label: post.title },
  ];

  const articleSchema = generateArticleSchema({
    ...post,
    slug: post.slug || slug,
  });
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const personSchema =
    post.author && typeof post.author !== "number" && post.author.name
      ? generatePersonSchema({
          name: post.author.name,
          slug: post.author.slug ?? null,
          bio: post.author.bio ?? null,
          photo: post.author.photo ?? null,
          socialLinks: post.author.socialLinks ?? null,
        })
      : null;

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, ...(personSchema ? [personSchema] : [])]} />
      <BlogPostContent
        post={post}
        contentHtml={contentHtml}
        relatedPosts={relatedPosts}
        latestPosts={latestPosts}
        breadcrumbItems={breadcrumbItems}
      />
    </>
  );
}
