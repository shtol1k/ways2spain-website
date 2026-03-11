import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

interface CardItem {
  icon?: Media | number | null
  title: string
  description: string
  id?: string
}

interface CardsType2BlockProps {
  cards?: CardItem[] | null
}

export const CardsType2Block: React.FC<CardsType2BlockProps> = ({ cards }) => {
  if (!cards || cards.length === 0) return null

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 xl:gap-6">
          {cards.map((card, index) => {
            const iconObj =
              typeof card.icon === 'object' && card.icon !== null ? (card.icon as Media) : null

            let iconUrl = iconObj?.url

            if (iconUrl && iconUrl.startsWith('http')) {
              try {
                const urlObj = new URL(iconUrl)
                if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                  iconUrl = urlObj.pathname
                }
              } catch {
                // keep original URL
              }
            }

            return (
              <div
                key={card.id || index}
                className={cn(
                  'flex flex-row md:flex-col items-start',
                  'gap-6 md:gap-4',
                  'p-6',
                  'bg-fill-primary',
                  'border border-(--color-border-primary)',
                  'rounded-xl',
                  'shadow-elegant',
                )}
              >
                {iconUrl && (
                  <div className="shrink-0 size-12">
                    <Image
                      src={iconUrl}
                      alt={card.title}
                      width={48}
                      height={48}
                      className="size-12 object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h4>{card.title}</h4>
                  <p className="text-body-small color-content-secondary mb-0">{card.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
