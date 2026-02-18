import Link from "next/link";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Icon } from "@/components/ui/icons";
import { SmartImage } from "@/components/SmartImage";
import { Post } from "@/payload-types";

interface RelatedArticlesProps {
  posts: Post[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h4 className="font-bold color-content-primary text-2xl md:text-3xl lg:text-xl">
        Читайте також
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {posts.map((post) => {
          const featuredImage =
            post.featuredImage && typeof post.featuredImage !== "number"
              ? post.featuredImage
              : null;

          const date = post.publishedAt
            ? format(new Date(post.publishedAt), 'd MMM yyyy', { locale: uk })
            : format(new Date(post.createdAt), 'd MMM yyyy', { locale: uk });

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-4 items-start p-4 lg:p-6 rounded-xl border border-border bg-card hover:shadow-elegant transition-smooth group"
            >
              {/* Thumbnail */}
              {featuredImage?.url && (
                <div className="relative shrink-0 size-20 rounded-lg overflow-hidden">
                  <SmartImage
                    src={featuredImage.url}
                    alt={featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <p className="text-base font-bold color-content-primary group-hover:color-content-brand transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="text-sm color-content-secondary line-clamp-2 lg:hidden">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-sm color-content-tertiary mt-auto">
                  <span className="flex items-center gap-1">
                    <Icon name="calendar" size="sm" className="w-4 h-4 shrink-0" />
                    {date}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Icon name="clock" size="sm" className="w-4 h-4 shrink-0" />
                      {post.readTime} хв
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
