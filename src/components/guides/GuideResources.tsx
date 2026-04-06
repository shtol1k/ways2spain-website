import type { GuideResource } from '@/api/guides'
import { FileText, Globe, Video, FileInput } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GuideResourcesProps {
  resources: GuideResource[] | null | undefined
  variant?: 'sidebar' | 'inline'
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  website: Globe,
  pdf: FileText,
  video: Video,
  form: FileInput,
}

function getFaviconUrl(url: string): string {
  try {
    const host = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${host}&sz=32`
  } catch {
    return ''
  }
}

export function GuideResources({ resources, variant = 'sidebar' }: GuideResourcesProps) {
  if (!resources?.length) return null

  return (
    <div className="flex flex-col gap-4">
      <h4 className="mb-0">Ресурси</h4>

      {variant === 'sidebar' ? (
        <div className="flex flex-col gap-3">
          {resources.map((r, index) => {
            const isLast = index === resources.length - 1
            const Icon = typeIcons[r.type ?? 'website'] ?? Globe
            const faviconUrl = getFaviconUrl(r.url)
            return (
              <div
                key={r.id}
                className="flex gap-2 items-start w-full overflow-hidden"
              >
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt=""
                    className="size-5 shrink-0 rounded mt-0.5"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Icon className="size-5 shrink-0 color-content-tertiary mt-0.5" />
                )}
                <div
                  className={cn(
                    'flex-1 min-w-0 flex flex-col gap-1',
                    !isLast && 'border-b border-(--color-border-primary) pb-3',
                  )}
                >
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-0 text-labels-sm color-content-primary truncate hover:underline"
                  >
                    {r.title}
                  </a>
                  {r.description ? (
                    <p className="mb-0 text-body-extra-small color-content-secondary">{r.description}</p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {resources.map((r) => {
            const Icon = typeIcons[r.type ?? 'website'] ?? Globe
            const faviconUrl = getFaviconUrl(r.url)
            return (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-(--color-border-primary) rounded-lg p-3 flex gap-2 items-start overflow-hidden"
              >
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt=""
                    className="size-6 md:size-5 shrink-0 rounded mt-0.5"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Icon className="size-6 md:size-5 shrink-0 color-content-tertiary mt-0.5" />
                )}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="mb-0 text-labels-sm color-content-primary">{r.title}</p>
                  {r.description ? (
                    <p className="mb-0 text-body-small md:text-body-extra-small color-content-secondary">
                      {r.description}
                    </p>
                  ) : null}
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
