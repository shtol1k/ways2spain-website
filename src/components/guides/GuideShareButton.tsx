"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icons"

interface GuideShareButtonProps {
  className?: string
}

export function GuideShareButton({ className }: GuideShareButtonProps) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Button
      variant="outline"
      size="default"
      onClick={handleShare}
      className={cn(className)}
    >
      <Icon name="share" size="md" />
      Поділитися
    </Button>
  )
}
