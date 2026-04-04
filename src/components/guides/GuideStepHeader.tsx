import { Icon } from '@/components/ui/icons'
import type { GuideStepHeaderBlock } from '@/api/guides'

interface GuideStepHeaderProps {
  block: GuideStepHeaderBlock
  stepIndex: number
}

const formatLabels: Record<string, string> = {
  online: 'Онлайн',
  hybrid: 'Онлайн + Офлайн',
  offline: 'Офлайн',
}

export function GuideStepHeader({ block, stepIndex }: GuideStepHeaderProps) {
  const { title, format, duration, cost } = block
  const stepId = `step-${stepIndex}`

  const hasMeta = format || duration || cost

  return (
    <div id={stepId} data-step-value={stepId} className="flex flex-col gap-2 mt-10 mb-4 scroll-mt-28">
      <h3 className="color-content-primary">{title}</h3>
      {hasMeta ? (
        <div className="flex flex-wrap gap-4">
          {format ? (
            <div className="flex items-center gap-2">
              <Icon name="cube" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary">
                {formatLabels[format] ?? format}
              </span>
            </div>
          ) : null}
          {duration ? (
            <div className="flex items-center gap-2">
              <Icon name="clock" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary">{duration}</span>
            </div>
          ) : null}
          {cost ? (
            <div className="flex items-center gap-2">
              <Icon name="wallet" size="lg" className="color-content-secondary shrink-0" />
              <span className="text-body-base color-content-secondary">{cost}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
