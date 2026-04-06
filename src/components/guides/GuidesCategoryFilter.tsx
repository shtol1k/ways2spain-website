'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { GuideCategory } from '@/api/guides'

interface GuidesCategoryFilterProps {
  categories: GuideCategory[]
  guideCountByCategory?: Record<number, number>
}

export function GuidesCategoryFilter({
  categories,
  guideCountByCategory = {},
}: GuidesCategoryFilterProps) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')
  const isAll = !currentCategory

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href="/guides"
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          isAll
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80'
        )}
      >
        Усі
      </Link>
      {categories.map((cat) => {
        const count = guideCountByCategory[cat.id] ?? 0
        const isActive = currentCategory === cat.slug
        return (
          <Link
            key={cat.id}
            href={`/guides?category=${cat.slug}`}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {cat.name}
            {count > 0 ? ` (${count})` : ''}
          </Link>
        )
      })}
    </div>
  )
}
