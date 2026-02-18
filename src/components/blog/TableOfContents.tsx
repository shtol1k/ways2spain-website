'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section'
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface TableOfContentsProps {
  /** CSS selector for the content container that has h2/h3 */
  selector: string
  className?: string
}

export function TableOfContents({ selector, className }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const el = document.querySelector(selector)
    if (!el) return

    const headings = el.querySelectorAll('h2, h3')
    const list: TocItem[] = []
    headings.forEach((heading) => {
      const text = heading.textContent ?? ''
      const id = slugify(text)
      heading.id = id
      list.push({
        id,
        text,
        level: heading.tagName === 'H2' ? 2 : 3,
      })
    })
    setItems(list)
  }, [selector])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Зміст статті"
      className={cn('flex flex-col gap-4', className)}
    >
      <h4 className="font-bold text-xl color-content-primary">Зміст</h4>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'border-b border-dashed border-border last:border-b-0',
              item.level === 3 && 'pl-4'
            )}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-3 text-sm transition-colors',
                activeId === item.id
                  ? 'color-content-brand font-medium'
                  : 'color-content-secondary hover:color-content-primary'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
