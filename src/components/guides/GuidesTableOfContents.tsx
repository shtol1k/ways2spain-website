'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type GuideStep = {
  id: string
  title: string
}

interface GuidesTableOfContentsProps {
  steps: GuideStep[]
}

export function GuidesTableOfContents({ steps }: GuidesTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? '')
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
  }, [steps.length])

  if (steps.length === 0) return null

  return (
    <div className="hidden lg:flex print:hidden flex-col gap-4">
      <h4 className="mb-0">Зміст</h4>
      <nav aria-label="Зміст гайду">
        <ul
          ref={listRef}
          className="relative border-l border-(--color-border-primary) flex flex-col gap-1"
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
          {steps.map((step) => {
            const isActive = activeId === step.id
            return (
              <li key={step.id} data-toc-id={step.id}>
                <a
                  href={`#${step.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(step.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={cn(
                    'flex items-center pl-4 py-1 text-body-small cursor-pointer',
                    isActive
                      ? 'color-content-primary'
                      : 'color-content-tertiary hover:color-content-primary hover:underline'
                  )}
                >
                  {step.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
