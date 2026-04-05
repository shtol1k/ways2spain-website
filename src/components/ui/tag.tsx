import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center self-start h-6 px-2 rounded-full',
        'border border-(--color-border-brand)',
        'text-body-small color-content-brand',
        'shrink-0 whitespace-nowrap',
        className
      )}
    >
      {label}
    </span>
  )
}
