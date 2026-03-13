import Link from 'next/link'
import { SmartImage } from '@/components/SmartImage'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'
import type { Guide, GuideCategory } from '@/api/guides'

interface GuideCardProps {
  guide: Guide
  index?: number
}

function getCategorySlug(category: Guide['category']): string {
  if (typeof category === 'object' && category && 'slug' in category) {
    return (category as GuideCategory).slug
  }
  return ''
}

function getImageData(
  image: Guide['featuredImage']
): { url: string; alt: string } | null {
  if (!image || typeof image === 'number') return null
  if (typeof image === 'object' && 'url' in image && image.url) {
    return { url: image.url, alt: 'alt' in image && image.alt ? image.alt : '' }
  }
  return null
}

export function GuideCard({ guide, index = 0 }: GuideCardProps) {
  const categorySlug = getCategorySlug(guide.category)
  const category = typeof guide.category === 'object' ? guide.category : null
  const href = `/guides/${categorySlug}/${guide.slug}`
  const imageData = getImageData(guide.featuredImage)

  return (
    <Link href={href} className="block h-full">
      <article
        className={cn(
          'relative h-[340px] rounded-xl overflow-hidden isolate group',
          'shadow-elegant',
          // Hover lift + shadow — xl і 2xl only
          'xl:transition-[box-shadow,transform] xl:ease-out xl:duration-300',
          'xl:hover:shadow-strong xl:hover:-translate-y-1'
        )}
      >
        {/* Background image */}
        {imageData ? (
          <SmartImage
            src={imageData.url}
            alt={imageData.alt || guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 25vw"
            className={cn(
              'object-cover pointer-events-none',
              // Saturation — xl і 2xl only
              'xl:[filter:saturate(0.5)] xl:group-hover:[filter:saturate(1.35)]',
              'xl:transition-[filter] xl:ease-out xl:duration-300'
            )}
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 bg-fill-secondary flex items-center justify-center text-6xl">
            📋
          </div>
        )}

        {/* Overlay mask z-[1] */}
        <div
          className={cn(
            'absolute inset-0 z-[1] mask-default',
            'xl:transition-[background-color] xl:ease-out xl:duration-300',
            'xl:group-hover:mask-hover'
          )}
        />

        {/* Content z-[2] */}
        <div className="relative z-[2] p-6 flex flex-col gap-3">
          {category && <Tag label={category.name} />}
          <h3 className="color-content-primary-inverse line-clamp-3">{guide.title}</h3>
          <p className="text-body-base color-content-secondary-inverse line-clamp-2">
            {guide.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
