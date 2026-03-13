import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface GuidesCTABlockProps {
  blockType?: 'guidesCTA'
  title: string
  description?: string | null
  primaryButton: {
    label: string
    url: string
  }
  secondaryButton: {
    label: string
    url: string
  }
  className?: string
}

export function GuidesCTABlock({
  title,
  description,
  primaryButton,
  secondaryButton,
  className,
}: GuidesCTABlockProps) {
  return (
    <div
      className={cn(
        'bg-fill-primary border border-[var(--color-border-primary)] rounded-2xl shadow-elegant',
        'flex flex-col items-center justify-center gap-8 h-[340px]',
        'px-6 md:px-20 xl:px-56 py-10 text-center',
        className
      )}
    >
      <div className="flex flex-col gap-2 w-full">
        <h3 className="color-content-primary">{title}</h3>
        {description && (
          <p className="text-body-large color-content-secondary">{description}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row items-center gap-4 md:gap-6 w-full justify-center">
        <Button variant="amber" size="lg" asChild>
          <a href={primaryButton.url}>{primaryButton.label}</a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={secondaryButton.url}>{secondaryButton.label}</a>
        </Button>
      </div>
    </div>
  )
}
