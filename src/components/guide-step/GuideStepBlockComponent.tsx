import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { Icon } from '@/components/ui/icons'

type GuideStepFields = {
  id: string
  title: string
  format?: 'online' | 'hybrid' | 'offline' | null
  duration?: string | null
  cost?: string | null
}

const formatLabels: Record<string, string> = {
  online: 'Online',
  hybrid: 'Online + Offline',
  offline: 'Offline',
}

export function GuideStepBlockComponent({
  node,
}: {
  node: SerializedBlockNode<GuideStepFields>
}) {
  const { id, title, format, duration, cost } = node.fields
  const hasMeta = format || duration || cost

  return (
    <div
      id={id}
      data-step-value={id}
      className="flex flex-col gap-2 mt-10 mb-4 scroll-mt-28"
    >
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
