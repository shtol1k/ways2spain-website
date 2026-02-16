"use client";

import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { Icon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { SmartImage } from "@/components/SmartImage";
import { Post } from "@/payload-types";
import { BlogBreadcrumbs, type BlogBreadcrumbItem } from "@/components/blog/BlogBreadcrumbs";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { CategoryTag } from "@/components/blog/CategoryTag";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BlogPostContentProps {
  post: Post;
  contentHtml: string | null;
  relatedPosts: Post[];
  breadcrumbItems?: BlogBreadcrumbItem[];
}

const BlogPostContent = ({ post, contentHtml, relatedPosts, breadcrumbItems }: BlogPostContentProps) => {
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
          <div id="metadata" className="flex items-center gap-[var(--space-4)] md:gap-[var(--space-6)] w-full h-6 md:h-8">
             {/* Category Tag */}
             {post.category && typeof post.category !== 'number' && (
                <CategoryTag>{post.category.name}</CategoryTag>
             )}
             
             {/* Date */}
             <div className="flex items-center gap-[var(--space-1)] md:gap-[var(--space-2)] color-content-tertiary">
                <Icon name="calendar" size="md" className="md:hidden text-current" />
                <Icon name="calendar" size="lg" className="hidden md:flex text-current" />
                <span className="text-sm md:text-base leading-[var(--leading-5)] md:leading-[var(--leading-6)] whitespace-nowrap">
                  {post.publishedAt 
                    ? format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: uk }) 
                    : format(new Date(post.createdAt), 'd MMMM yyyy', { locale: uk })
                  }
                </span>
             </div>
             
             {/* Read Time */}
             <div className="hidden md:flex items-center gap-[var(--space-2)] color-content-tertiary">
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base leading-[var(--leading-5)] md:leading-[var(--leading-6)] whitespace-nowrap">
                   {post.readTime ? `${post.readTime} хв читання` : "3 хв читання"}
                </span>
             </div>
          </div>
        </header>

        {/* Existing Content (pushed down) */}

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="h-96 md:h-[500px] bg-muted rounded-2xl flex items-center justify-center overflow-hidden relative">
            {post.featuredImage && typeof post.featuredImage !== 'number' && post.featuredImage.url ? (
              <SmartImage
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <span className="color-content-tertiary text-8xl">📄</span>
            )}
          </div>
        </div>

        {/* Content + ToC */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_200px] gap-12">
          <div className="min-w-0">
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
            <div className="text-center py-10 color-content-tertiary text-body-base">
              Контент не знайдено або він має неправильний формат.
            </div>
          )}

          {/* Author card */}
          {post.author && typeof post.author !== "number" && (
            <div className="mt-12">
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
            </div>
          )}

          {/* Share buttons */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Поділитися статтею</h3>
              <Button variant="outline" size="sm" className="text-ui-btn-m">
                <Share2 className="w-4 h-4 mr-2" />
                Поділитися
              </Button>
            </div>
          </div>

          {/* Related posts carousel */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-8">Читайте також</h3>
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-4">
                  {relatedPosts.map((relatedPost) => (
                    <CarouselItem key={relatedPost.id} className="pl-4 md:basis-1/2">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="bg-card rounded-xl border border-border p-6 hover:shadow-elegant transition-smooth flex flex-col h-full"
                      >
                        {relatedPost.category && typeof relatedPost.category !== "number" && (
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 color-content-brand text-ui-label mb-3 w-fit">
                            {relatedPost.category.name}
                          </span>
                        )}
                        <h4 className="mb-2 hover:color-content-brand transition-smooth line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="color-content-secondary text-body-small mb-4 line-clamp-2 grow">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center text-body-extra-small color-content-tertiary mt-auto">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {relatedPost.readTime ? `${relatedPost.readTime} хв` : "3 хв"}
                          </span>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          )}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents selector=".blog-content" />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default BlogPostContent;
