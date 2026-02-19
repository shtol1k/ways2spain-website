"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faLink, faCheck } from "@fortawesome/pro-regular-svg-icons";
import {
  faTelegram,
  faWhatsapp,
  faFacebook,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonProps {
  url: string;
  title?: string;
}

const getShareLinks = (url: string, title: string) => [
  {
    key: "telegram",
    label: "Telegram",
    icon: faTelegram,
    href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: faWhatsapp,
    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: faFacebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "x-twitter",
    label: "X (Twitter)",
    icon: faXTwitter,
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: faLinkedinIn,
    href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
];

export function ShareButton({ url, title = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available (e.g. non-secure context)
    }
  };

  const shareLinks = getShareLinks(url, title);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="px-3 gap-3 [&_svg]:size-5 cursor-pointer"
        >
          <FontAwesomeIcon icon={faShareNodes} />
          Поділитися
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {shareLinks.map(({ key, label, icon, href }) => (
          <DropdownMenuItem key={key} asChild>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer"
            >
              <FontAwesomeIcon icon={icon} className="w-4 h-4 shrink-0" />
              {label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleCopy();
          }}
          className="gap-3 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={copied ? faCheck : faLink}
            className="w-4 h-4 shrink-0"
          />
          {copied ? "Скопійовано!" : "Копіювати посилання"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
