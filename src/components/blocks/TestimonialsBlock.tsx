import React from 'react'
import { Media } from '@/payload-types'
import { TestimonialsCarousel, type Testimonial } from '@/components/TestimonialsCarousel'

interface TestimonialItem {
  id?: string
  name: string
  title: string
  testimonial: string
  date: string
  photo?: Media | number | null
  linkedin?: string | null
  facebook?: string | null
  xTwitter?: string | null
  instagram?: string | null
  telegram?: string | null
}

interface TestimonialsBlockProps {
  title: string
  subtitle?: string | null
  testimonials?: TestimonialItem[] | null
}

function ensureAbsoluteUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url
  return `https://${url}`
}

function resolvePhotoUrl(photo: Media | number | null | undefined): string | undefined {
  if (!photo || typeof photo === 'number') return undefined
  const url = (photo as Media).url
  if (!url) return undefined
  // Convert absolute localhost URLs to relative paths for Next.js Image
  if (url.startsWith('http')) {
    try {
      const parsed = new URL(url)
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        return parsed.pathname
      }
    } catch {
      // Keep original URL if parsing fails
    }
  }
  return url
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  if (!testimonials || testimonials.length === 0) return null

  const items: Testimonial[] = testimonials.map((item, index) => ({
    id: item.id ?? String(index),
    name: item.name,
    title: item.title,
    testimonial: item.testimonial,
    date: item.date,
    photo: resolvePhotoUrl(item.photo),
    linkedin: ensureAbsoluteUrl(item.linkedin),
    facebook: ensureAbsoluteUrl(item.facebook),
    xTwitter: ensureAbsoluteUrl(item.xTwitter),
    instagram: ensureAbsoluteUrl(item.instagram),
    telegram: ensureAbsoluteUrl(item.telegram),
  }))

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <TestimonialsCarousel testimonials={items} />
      </div>
    </section>
  )
}
