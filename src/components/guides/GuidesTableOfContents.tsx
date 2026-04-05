'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { GuideContentBlock, GuideStepHeaderBlock } from '@/api/guides'

interface GuidesTableOfContentsProps {
  content: GuideContentBlock[] | null | undefined
}

export function GuidesTableOfContents({ content }: GuidesTableOfContentsProps) {
  const stepHeaders = (content ?? []).filter(
    (b): b is GuideStepHeaderBlock => b.blockType === 'guideStepHeader'
  )
  const [activeId, setActiveId] = useState<string>('step-1')
  const [indicator, setIndicator] = useState({ top: 0, height: 32 })
  const listRef = useRef<HTMLUListElement>(null)

  // Позиція індикатора при зміні активного елемента
  useEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector(
      `[data-toc-id="${activeId}"]`
    ) as HTMLElement | null
    if (!activeEl) return
    setIndicator({ top: activeEl.offsetTop, height: activeEl.offsetHeight })
  }, [activeId])

  // Ініціальна позиція (без анімації)
  useLayoutEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector(
      `[data-toc-id="${activeId}"]`
    ) as HTMLElement | null
    if (!activeEl) return
    setIndicator({ top: activeEl.offsetTop, height: activeEl.offsetHeight })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll observer: секція стає активною при перетині 50% viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-step-value')
            if (id) setActiveId(id)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    document.querySelectorAll('[data-step-value]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [stepHeaders.length])

  if (stepHeaders.length === 0) return null

  return (
    <div className="hidden lg:flex sticky top-24 print:hidden flex-col gap-4">
      <h3 className="text-body-large font-bold color-content-primary tracking-tight">
        Зміст
      </h3>
      <nav aria-label="Зміст гайду">
        <ul
          ref={listRef}
          className="relative border-l border-(--color-border-primary) flex flex-col gap-2"
        >
          <div
            className="absolute -left-px w-0.5 bg-(--color-border-brand)"
            style={{
              top: indicator.top,
              height: indicator.height,
              transition:
                'top 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-hidden="true"
          />
          {stepHeaders.map((block, index) => {
            const value = `step-${index + 1}`
            const isActive = activeId === value
            return (
              <li key={block.id} data-toc-id={value}>
                <a
                  href={`#${value}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(value)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={cn(
                    'flex items-center px-4 py-1 text-body-base cursor-pointer hover:underline',
                    isActive ? 'color-content-primary' : 'color-content-tertiary'
                  )}
                >
                  {block.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
