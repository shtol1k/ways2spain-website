import Link from "next/link";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Post } from "@/payload-types";

interface LatestArticlesProps {
  posts: Post[];
  /**
   * "sidebar" — single-column list with dashed separators (desktop sidebar)
   * "below"   — 2-column grid on tablet, 1-column on mobile (below article content)
   */
  layout?: "sidebar" | "below";
  className?: string;
}

export function LatestArticles({ posts, layout = "sidebar", className }: LatestArticlesProps) {
  if (!posts || posts.length === 0) return null;

  const isSidebar = layout === "sidebar";

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <h4
        className={cn(
          "font-bold color-content-primary",
          isSidebar ? "text-xl" : "text-2xl md:text-3xl"
        )}
      >
        Останні новини
      </h4>

      {isSidebar ? (
        /* Sidebar: single-column list with dashed border separators */
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-b border-dashed border-border last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-2 py-4 hover:color-content-brand transition-colors group"
              >
                <span className="text-base font-bold color-content-primary group-hover:color-content-brand transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </span>
                <span className="flex items-center gap-1 text-sm color-content-tertiary">
                  <Icon name="calendar" size="sm" className="w-4 h-4 shrink-0" />
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), 'd MMM yyyy', { locale: uk })
                    : format(new Date(post.createdAt), 'd MMM yyyy', { locale: uk })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        /* Below content: 2-column grid on tablet, 1-column on mobile */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-2 border border-border rounded-xl p-4 hover:shadow-elegant transition-smooth group"
            >
              <span className="text-base font-bold color-content-primary group-hover:color-content-brand transition-colors line-clamp-2 leading-snug">
                {post.title}
              </span>
              <span className="flex items-center gap-1 text-sm color-content-tertiary mt-auto">
                <Icon name="calendar" size="sm" className="w-4 h-4 shrink-0" />
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'd MMM yyyy', { locale: uk })
                  : format(new Date(post.createdAt), 'd MMM yyyy', { locale: uk })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
