import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface FeatureItem {
  icon: Media | number
  title: string
  description: string
  id?: string
}

interface FeaturesBlockProps {
  title: string
  subtitle?: string | null
  features?: FeatureItem[] | null
}

/**
 * Features block component — renders the "Why Choose Us" section.
 *
 * Layout rules:
 * - Desktop: max 4 cards per row, extra cards wrap to aligned new rows
 * - Tablet: 2 columns
 * - Mobile: 1 column (full width stack)
 *
 * Preserves all original styling: gradient background, card shadows,
 * hover scale animation, and transition effects.
 */
export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ title, subtitle, features }) => {
  if (!features || features.length === 0) return null

  return (
    <section className="py-20 lg:py-32 gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header — centered with constrained width */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Features grid — max 4 columns on desktop, left-aligned overflow rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // Handle icon field which can be a full Media object or just an ID number
            const iconObj = typeof feature.icon === 'object' && feature.icon !== null
              ? feature.icon as Media
              : null

            let iconUrl = iconObj?.url
            const iconAlt = iconObj?.alt || feature.title

            // Convert absolute localhost URLs to relative paths for Next.js Image
            if (iconUrl && iconUrl.startsWith('http')) {
              try {
                const urlObj = new URL(iconUrl)
                if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                  iconUrl = urlObj.pathname
                }
              } catch {
                // Keep original URL if parsing fails
              }
            }

            return (
              <div
                key={feature.id || index}
                className="bg-card rounded-xl p-8 shadow-elegant hover:shadow-strong transition-smooth border border-border hover:scale-105"
              >
                {/* Icon container with neutral background */}
                {iconUrl && (
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-neutral-100 mb-6">
                    <Image
                      src={iconUrl}
                      alt={iconAlt}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
