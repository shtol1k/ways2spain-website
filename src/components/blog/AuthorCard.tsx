import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface AuthorCardAuthor {
  id: number;
  name: string;
  slug?: string | null;
  role?: string | null;
  bio?: string | null;
  photo?: { url?: string; alt?: string } | number | null;
  socialLinks?: {
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    telegram?: string | null;
  } | null;
}

export interface AuthorCardProps {
  author: AuthorCardAuthor;
  variant?: "full" | "compact" | "sidebar";
  className?: string;
}

export function AuthorCard({
  author,
  variant = "full",
  className,
}: AuthorCardProps) {
  const photo =
    author.photo && typeof author.photo !== "number" ? author.photo : null;
  const initials = (author.name ?? "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const social = author.socialLinks;

  const avatarSize = cn(
    "shrink-0",
    variant === "full"    && "h-20 w-20",
    variant === "sidebar" && "h-20 w-20",
    variant === "compact" && "h-16 w-16",
  );

  const content = (
    <div
      className={cn(
        "flex border border-border bg-card",
        variant === "full"    && "gap-4 rounded-xl p-6 items-start",
        variant === "sidebar" && "gap-2 rounded-xl p-4 items-start",
        variant === "compact" && "gap-4 rounded-2xl p-4 items-center",
        className
      )}
    >
      <Avatar className={avatarSize}>
        {photo?.url && (
          <AvatarImage src={photo.url} alt={photo.alt ?? author.name ?? ""} />
        )}
        <AvatarFallback className="bg-muted text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          {author.slug ? (
            <Link
              href={`/blog/author/${author.slug}`}
              className="font-bold color-content-primary hover:underline"
            >
              {author.name}
            </Link>
          ) : (
            <span className="font-bold color-content-primary">{author.name}</span>
          )}
        </div>
        {author.role && (
          <span className="text-sm color-content-tertiary">{author.role}</span>
        )}
        {variant === "full" && author.bio && (
          <p className="mt-1 text-body-small color-content-secondary">{author.bio}</p>
        )}
        {variant === "full" && social && (
          <div className="mt-3 flex flex-wrap gap-3">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="color-content-secondary hover:color-content-primary"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size="md" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="color-content-secondary hover:color-content-primary"
                aria-label="Twitter / X"
              >
                <Icon name="xTwitter" size="md" />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="color-content-secondary hover:color-content-primary"
                aria-label="Instagram"
              >
                <Icon name="instagram" size="md" />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="color-content-secondary hover:color-content-primary"
                aria-label="Facebook"
              >
                <Icon name="facebook" size="md" />
              </a>
            )}
            {social.telegram && (
              <a
                href={
                  social.telegram.startsWith("http")
                    ? social.telegram
                    : `https://t.me/${social.telegram.replace(/^@/, "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="color-content-secondary hover:color-content-primary"
                aria-label="Telegram"
              >
                <Icon name="telegram" size="md" />
              </a>
            )}
          </div>
        )}
        {variant === "full" && author.slug && (
          <Link href={`/blog/author/${author.slug}`} className="mt-3 inline-block">
            <Button variant="ghost" size="sm">
              Усі статті автора
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  return content;
}
