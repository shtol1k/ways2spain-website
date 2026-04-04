import { Icon } from '@/components/ui/icons'
import type { GuideSummary as GuideSummaryType } from '@/api/guides'

interface GuideSummaryProps {
  summary: GuideSummaryType
}

const formatLabels: Record<string, string> = {
  online: 'Онлайн',
  hybrid: 'Онлайн + Офлайн',
  offline: 'Офлайн',
}

export function GuideSummary({ summary }: GuideSummaryProps) {
  const {
    totalCost,
    estimatedDuration,
    format,
    requirements,
  } = summary

  const hasLeftColumn = !!(format || totalCost || estimatedDuration)
  const hasRightColumn = !!requirements?.length

  if (!hasLeftColumn && !hasRightColumn) return null

  return (
    <div className="border border-(--color-border-primary) rounded-xl p-4 flex flex-col md:flex-row gap-4">

      {hasLeftColumn && (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {format ? (
            <div className="flex items-center gap-2 h-6 overflow-hidden">
              <Icon name="cube" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary whitespace-nowrap">Формат:</span>
              <span className="text-body-base color-content-primary truncate">
                {formatLabels[format] ?? format}
              </span>
            </div>
          ) : null}

          {totalCost ? (
            <div className="flex items-center gap-2 h-6 overflow-hidden">
              <Icon name="wallet" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary whitespace-nowrap">Витрати:</span>
              <span className="text-body-base color-content-primary truncate">{totalCost}</span>
            </div>
          ) : null}

          {estimatedDuration ? (
            <div className="flex items-center gap-2 h-6 overflow-hidden">
              <Icon name="calendar" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary whitespace-nowrap">Тривалість:</span>
              <span className="text-body-base color-content-primary truncate">{estimatedDuration}</span>
            </div>
          ) : null}
        </div>
      )}

      {hasRightColumn && (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Icon name="clipboardList" size="lg" className="color-content-secondary shrink-0" />
            <span className="text-body-base color-content-secondary whitespace-nowrap">Вимоги:</span>
          </div>
          <div className="pl-2 md:pl-0">
            <ul className="list-disc">
              {requirements!.map((r, i) => (
                <li key={i} className="ms-6 text-body-base color-content-primary leading-6">
                  {r.requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}
