import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { Icon } from '@/components/ui/icons'

interface CardItem {
  text: string
  id?: string | null
}

interface CardData {
  image?: Media | number | null
  title: string
  items?: CardItem[] | null
}

interface CardsType1BlockProps {
  cardLeft: CardData
  cardRight: CardData
}

function InfoCard({ image, title, items }: CardData) {
  const imageObj = typeof image === 'object' && image !== null ? (image as Media) : null
  let imageUrl = imageObj?.url

  if (imageUrl && imageUrl.startsWith('http')) {
    try {
      const urlObj = new URL(imageUrl)
      if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
        imageUrl = urlObj.pathname
      }
    } catch {
      // Keep original URL if parsing fails
    }
  }

  return (
    <div className="bg-fill-primary border border-[var(--color-border-primary)] rounded-xl p-8 shadow-elegant flex flex-col gap-6 items-start w-full lg:flex-1 lg:self-stretch">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageObj?.alt || title}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-lg shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-slate-200 shrink-0" />
      )}

      <h3>{title}</h3>

      {items && items.length > 0 && (
        <ul className="flex flex-col gap-3 w-full">
          {items.map((item, index) => (
            <li key={item.id ?? index} className="flex gap-2 items-start">
              <Icon name="circleCheck" size="lg" className="color-content-brand shrink-0 mt-0.5" />
              <span className="text-body-base color-content-primary">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const CardsType1Block: React.FC<CardsType1BlockProps> = ({ cardLeft, cardRight }) => {
  return (
    <section className="py-6 lg:py-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 xl:gap-8">
        <InfoCard {...cardLeft} />
        <InfoCard {...cardRight} />
      </div>
    </section>
  )
}
