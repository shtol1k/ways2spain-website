"use client";

import { Icon } from "@/components/ui/icons";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Post } from "@/payload-types";
import { BlogBreadcrumbs, type BlogBreadcrumbItem } from "@/components/blog/BlogBreadcrumbs";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { CategoryTag } from "@/components/blog/CategoryTag";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { LatestArticles } from "@/components/blog/LatestArticles";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { SmartImage } from "@/components/SmartImage";

interface BlogPostContentProps {
  post: Post;
  contentHtml: string | null;
  relatedPosts: Post[];
  latestPosts: Post[];
  breadcrumbItems?: BlogBreadcrumbItem[];
}

const BlogPostContent = ({ post, contentHtml, relatedPosts, latestPosts, breadcrumbItems }: BlogPostContentProps) => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <ReadingProgress />
      <article className="container mx-auto px-4 lg:px-8">
        {/* Refactored Header Scaffolding (Placeholders) */}
        <header className="w-full max-w-screen-2xl mx-auto mb-10">
          {/* Top Row: Breadcrumbs + Share */}
          <div id="nav" className="flex items-center justify-between w-full h-5 md:h-10 mb-6">
            <div className="flex-1 min-w-0 md:mr-8 overflow-hidden">
              {breadcrumbItems?.length ? <BlogBreadcrumbs items={breadcrumbItems} className="mb-0 [&>ol]:p-0 [&>ol]:m-0" /> : null}
            </div>
            
            {/* Share Button Placeholder (Desktop/Tablet only) */}
            <div className="hidden md:block h-full w-32 bg-muted/50 rounded-md animate-pulse shrink-0" />
          </div>

          {/* Title Section */}
          <div id="title" className="flex flex-col w-full mb-4 md:mb-6">
            <h2>{post.title}</h2>
            {post.excerpt && <p className="text-body-large mb-0">{post.excerpt}</p>}
          </div>

          {/* Divider Placeholder */}
          <div id="divider" className="w-full border-t border-slate-300 border-dashed mb-4 md:mb-6" />

          {/* Meta Data Row */}
          <div id="metadata" className="flex flex-wrap items-center gap-4 md:gap-6 gap-y-3 w-full">
             {/* Category Tag */}
             {post.category && typeof post.category !== 'number' && (
                <CategoryTag>{post.category.name}</CategoryTag>
             )}
             
             {/* Date */}
             <div id="published" className="flex items-center gap-1 md:gap-2 color-content-tertiary">
                <Icon name="calendar" size="responsive" className="w-5 h-5 md:w-6 md:h-6 text-current" />
                <span className="text-sm md:text-base leading-[var(--leading-5)] md:leading-[var(--leading-6)] whitespace-nowrap">
                  {post.publishedAt 
                    ? format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: uk }) 
                    : format(new Date(post.createdAt), 'd MMMM yyyy', { locale: uk })
                  }
                </span>
             </div>
             
             {/* Read Time */}
             <div id="timetoread" className="flex items-center gap-1 md:gap-2 color-content-tertiary">
                <Icon name="clock" size="responsive" className="w-5 h-5 md:w-6 md:h-6 text-current" />
                <span className="text-sm md:text-base leading-[var(--leading-5)] md:leading-[var(--leading-6)] whitespace-nowrap">
                   {post.readTime ? `${post.readTime} хв читання` : "3 хв читання"}
                </span>
             </div>
          </div>
        </header>

        {/* Main layout: two-column on desktop, single-column on tablet/mobile */}
        <div className="max-w-screen-2xl mx-auto mt-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

            {/* LEFT COLUMN */}
            <div className="flex-1 min-w-0 flex flex-col gap-10">
              {/* Intro image */}
              <div className="relative w-full aspect-1024/500 rounded-2xl overflow-hidden bg-muted">
                {post.featuredImage && typeof post.featuredImage !== "number" && post.featuredImage.url && (
                  <SmartImage
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {/* Article text */}
              {contentHtml ? (
                <div
                  className="blog-content prose prose-lg dark:prose-invert max-w-none
                  prose-headings:color-content-primary prose-headings:scroll-mt-24
                  prose-p:color-content-secondary prose-p:leading-relaxed
                  prose-a:color-content-brand prose-a:no-underline hover:prose-a:underline
                  prose-strong:color-content-primary
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:color-content-secondary
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-4 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                <div className="w-full min-h-96 bg-muted/60 rounded-xl" />
              )}
              {/* Related articles */}
              <RelatedArticles posts={relatedPosts} />
            </div>

            {/* RIGHT SIDEBAR — desktop only */}
            <aside className="hidden lg:flex lg:flex-col w-[280px] shrink-0 gap-6 sticky top-24">
              {/* Author */}
              {post.author && typeof post.author !== "number" && (
                <AuthorCard
                  author={{
                    id: post.author.id,
                    name: post.author.name ?? "",
                    slug: post.author.slug ?? null,
                    role: post.author.role ?? null,
                    bio: post.author.bio ?? null,
                    photo: post.author.photo ?? null,
                    socialLinks: post.author.socialLinks ?? null,
                  }}
                  variant="sidebar"
                />
              )}
              {/* Table of contents */}
              <TableOfContents selector=".blog-content" />
              {/* Latest articles */}
              <LatestArticles posts={latestPosts} layout="sidebar" />
            </aside>

          </div>

          {/* BELOW CONTENT — tablet/mobile only */}
          <div className="lg:hidden flex flex-col gap-10 mt-10">
            {/* Author */}
            {post.author && typeof post.author !== "number" && (
              <AuthorCard
                author={{
                  id: post.author.id,
                  name: post.author.name ?? "",
                  slug: post.author.slug ?? null,
                  role: post.author.role ?? null,
                  bio: post.author.bio ?? null,
                  photo: post.author.photo ?? null,
                  socialLinks: post.author.socialLinks ?? null,
                }}
                variant="compact"
              />
            )}
            {/* Latest articles */}
            <LatestArticles posts={latestPosts} layout="below" />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostContent;
