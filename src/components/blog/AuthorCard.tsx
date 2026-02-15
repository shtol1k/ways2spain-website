import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
} from "@/components/ui/social-icons";
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
  variant?: "full" | "compact";
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

  const content = (
    <div
      className={cn(
        "flex gap-4 rounded-xl border border-border bg-card p-6",
        variant === "compact" && "p-4",
        className
      )}
    >
      <Avatar
        className={cn(
          "shrink-0",
          variant === "full" ? "h-20 w-20" : "h-12 w-12"
        )}
      >
        {photo?.url && (
          <AvatarImage src={photo.url} alt={photo.alt ?? author.name ?? ""} />
        )}
        <AvatarFallback className="bg-muted text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {author.slug ? (
            <Link
              href={`/blog/author/${author.slug}`}
              className="font-semibold color-content-primary hover:text-primary hover:underline"
            >
              {author.name}
            </Link>
          ) : (
            <span className="font-semibold color-content-primary">{author.name}</span>
          )}
          {author.role && (
            <span className="text-body-small color-content-secondary">{author.role}</span>
          )}
        </div>
        {variant === "full" && author.bio && (
          <p className="mt-2 text-body-small color-content-secondary">{author.bio}</p>
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
                <LinkedInIcon className="h-5 w-5" />
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
                <XIcon className="h-5 w-5" />
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
                <InstagramIcon className="h-5 w-5" />
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
                <FacebookIcon className="h-5 w-5" />
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
                <TelegramIcon className="h-5 w-5" />
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
