import { cn } from '@/lib/utils'

interface TagProps {
  label: string
  className?: string
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center self-start px-[10px] py-[3px] rounded-full',
        'bg-fill-brand text-labels-sm color-content-primary',
        'shrink-0 whitespace-nowrap',
        className
      )}
    >
      {label}
    </span>
  )
}
