import type { Guide, GuideCategory } from '@/api/guides'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { BlogBreadcrumbs } from '@/components/blog/BlogBreadcrumbs'
import { GuideShareButton } from '@/components/guides/GuideShareButton'
import { Icon } from '@/components/ui/icons'
import { Badge } from '@/components/ui/tag'
import { getCanonicalUrl } from '@/lib/utils'

interface GuideHeaderProps {
  guide: Guide
  categorySlug: string
}

export function GuideHeader({ guide }: GuideHeaderProps) {
  const category =
    typeof guide.category === 'object' ? (guide.category as GuideCategory) : null

  const breadcrumbs = [
    { label: 'Головна', href: '/' },
    { label: 'Гайди', href: '/guides' },
    ...(category ? [{ label: category.name, href: `/guides?category=${category.slug}` }] : []),
  ]

  const publishedDate = format(new Date(guide.createdAt), 'd MMMM yyyy', { locale: uk })
  const updatedDate = format(new Date(guide.updatedAt), 'd MMMM yyyy', { locale: uk })

  const guideUrl = category
    ? getCanonicalUrl(`/guides/${category.slug}/${guide.slug}`)
    : getCanonicalUrl(`/guides/${guide.slug}`)

  return (
    <header className="flex flex-col items-center pt-24 pb-4 md:pt-32 md:pb-10">
      <div className="flex flex-col gap-4 container mx-auto px-4 lg:px-8">

        {/* Nav row: breadcrumbs always visible, share button hidden on sm */}
        <div className="flex items-center justify-between">
          <BlogBreadcrumbs items={breadcrumbs} />
          <GuideShareButton url={guideUrl} title={guide.title} className="hidden md:flex" />
        </div>

        {/* Note: overrides global h1 typography — Figma uses h2-scale for guide header */}
        <h1 className="text-4xl leading-[1.2] md:text-5xl w-full">
          {guide.title}
        </h1>

        {/* Meta: vertical on sm, horizontal on md+ */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 items-start">
          {category && <Badge label={category.name} />}
          <div className="flex items-center gap-1">
            <Icon name="calendar" size="lg" className="color-content-tertiary shrink-0" />
            <span className="text-body-base color-content-tertiary whitespace-nowrap">
              Опубліковано: {publishedDate}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="calendar" size="lg" className="color-content-tertiary shrink-0" />
            <span className="text-body-base color-content-tertiary whitespace-nowrap">
              Оновлено: {updatedDate}
            </span>
          </div>
        </div>

      </div>
    </header>
  )
}
