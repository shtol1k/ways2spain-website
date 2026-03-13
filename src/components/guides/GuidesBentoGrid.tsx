import { GuideCard } from '@/components/guides/GuideCard'
import { GuidesCTABlock } from '@/components/blocks/GuidesCTABlock'
import type { Guide } from '@/api/guides'
import type { GuidesCTABlockProps } from '@/components/blocks/GuidesCTABlock'
import { cn } from '@/lib/utils'

interface GuidesBentoGridProps {
  guides: Guide[]
  cta?: GuidesCTABlockProps | null
}

/**
 * Computes the CSS column-span class for a card at the given index.
 *
 * Pattern (4-column bento, xl/2xl only):
 *   Even groups (0,2,4…): [large(2), small(1), small(1)]
 *   Odd  groups (1,3,5…): [small(1), small(1), large(2)]
 *
 * Auto-placement works because each group sums to 4 columns.
 */
function getXlColSpan(index: number): string {
  const groupIndex = Math.floor(index / 3)
  const posInGroup = index % 3
  const isEvenGroup = groupIndex % 2 === 0
  const isLarge = isEvenGroup ? posInGroup === 0 : posInGroup === 2
  return isLarge ? 'xl:col-span-2 2xl:col-span-2' : 'xl:col-span-1 2xl:col-span-1'
}

export function GuidesBentoGrid({ guides, cta }: GuidesBentoGridProps) {
  if (!guides.length && !cta) return null

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4',
        'lg:grid-cols-2',
        'xl:grid-cols-4 xl:gap-6'
      )}
    >
      {guides.map((guide, index) => (
        <div
          key={guide.id}
          className={cn(
            'col-span-1',
            'lg:col-span-1',
            getXlColSpan(index)
          )}
        >
          <GuideCard guide={guide} index={index} />
        </div>
      ))}

      {cta && (
        <div className="col-span-1 lg:col-span-2 xl:col-span-4">
          <GuidesCTABlock {...cta} />
        </div>
      )}
    </div>
  )
}
