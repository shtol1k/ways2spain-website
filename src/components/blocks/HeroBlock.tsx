
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media, Page } from '@/payload-types'

interface HeroBlockProps {
  title: string
  text?: string
  media?: Media | string
  buttons?: {
    id?: string
    label: string
    type: 'custom' | 'page'
    url?: string
    page?: Page | string | any // Loose type to avoid build errors if types aren't perfect
    style?: 'primary' | 'secondary' | 'outline'
  }[]
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, text, media, buttons }) => {
  const mediaUrl = typeof media === 'object' && media !== null ? media.url : null
  const mediaAlt = (typeof media === 'object' && media !== null ? media.alt : '') || 'Hero Background'

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      {mediaUrl && (
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105" // Subtle zoom effect could be nice, or just static
            priority // Critical for LCP
            sizes="100vw"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-black/40 bg-linear-to-t from-black/80 via-black/20 to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg text-balance">
          {title}
        </h1>
        
        {text && (
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100/90 leading-relaxed font-light text-balance drop-shadow-md">
            {text}
          </p>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {buttons.map((button, index) => {
              // Determine href
              let href = '#'
              if (button.type === 'custom' && button.url) {
                href = button.url
              } else if (button.type === 'page' && button.page) {
                // Handle populated relationship
                const pageData = button.page as any // Cast to allow property access
                if (typeof pageData === 'object' && pageData.slug) {
                    href = pageData.slug === 'home' ? '/' : `/${pageData.slug}`
                }
              }

              // Determine styles
              const baseClasses = "group relative px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl overflow-hidden"
              
              let styleClasses = ""
              if (button.style === 'outline') {
                styleClasses = "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
              } else if (button.style === 'secondary') {
                 styleClasses = "bg-white/10 border-2 border-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              } else {
                // Default / Primary
                styleClasses = "bg-white text-gray-900 hover:bg-gray-100 border-2 border-transparent"
              }

              return (
                <Link 
                    key={index} 
                    href={href} 
                    className={`${baseClasses} ${styleClasses}`}
                >
                    <span className="relative z-10">{button.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
