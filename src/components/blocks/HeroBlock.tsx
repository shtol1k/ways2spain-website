import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Media, Page } from '@/payload-types'

interface CtaGroup {
  primaryLabel?: string
  primaryPage?: Page | string | any
  secondaryLabel?: string
  secondaryPage?: Page | string | any
}

interface HeroBlockProps {
  title: string
  text?: string
  media?: Media | string
  cta?: CtaGroup
  benefits?: {
    id?: string
    text: string
  }[]
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, text, media, cta, benefits }) => {
  // Handle media field which can be a full Media object or just an ID string depending on depth
  const mediaObj = typeof media === 'object' && media !== null ? media as Media : null
  let mediaUrl = mediaObj?.url
  const mediaAlt = mediaObj?.alt || 'Hero Background'

  // Ensure internal media URLs are relative for Next.js Image
  if (mediaUrl && mediaUrl.startsWith('http')) {
      const urlObj = new URL(mediaUrl);
      if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
          mediaUrl = urlObj.pathname;
      }
  }

  // Resolve page relationship to a URL path
  const getPageHref = (page: Page | string | any): string => {
    if (typeof page === 'object' && page?.slug) {
      return page.slug === 'home' ? '/' : `/${page.slug}`
    }
    return '#'
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Dark Overlay */}
      {mediaUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Dark overlay — keeps image visible but ensures text readability */}
          <div className="absolute inset-0 bg-black/40 bg-linear-to-t from-black/80 via-black/20 to-black/30" />
        </div>
      )}

      {/* Fallback background when no image is set */}
      {!mediaUrl && (
        <div className="absolute inset-0 z-0 bg-primary" />
      )}

      {/* Content — left-aligned, matching original Hero composition */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6 animate-fade-in">
            {title}
          </h1>

          {text && (
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in">
              {text}
            </p>
          )}

          {/* CTA Buttons — Primary (gold) + Secondary (outline) */}
          {(cta?.primaryLabel || cta?.secondaryLabel) && (
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
              {cta?.primaryLabel && (
                <Link href={cta.primaryPage ? getPageHref(cta.primaryPage) : '#'}>
                  <Button variant="hero" size="xl">
                    {cta.primaryLabel}
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              )}
              {cta?.secondaryLabel && (
                <Link href={cta.secondaryPage ? getPageHref(cta.secondaryPage) : '#'}>
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    {cta.secondaryLabel}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Key Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="flex flex-wrap lg:flex-nowrap gap-6 animate-fade-in">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id || index}
                  className={`flex items-center space-x-2 rounded-lg shrink-0 ${
                    index === 0 ? 'whitespace-nowrap' : ''
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-white text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
