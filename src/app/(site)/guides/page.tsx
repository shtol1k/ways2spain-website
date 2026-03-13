import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  getGuides,
  getGuidesByCategory,
  getGuideCategories,
} from '@/api/guides'
import { getCanonicalUrl } from '@/lib/utils'
import { GuidesCategoryFilter } from '@/components/guides/GuidesCategoryFilter'
import { GuidesBentoGrid } from '@/components/guides/GuidesBentoGrid'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import type { GuidesCTABlockProps } from '@/components/blocks/GuidesCTABlock'

export const metadata: Metadata = {
  title: 'Гайди - Digital Nomad Visa Іспанія',
  description:
    'Покрокові інструкції: віза Digital Nomad, відкриття autónomo, перереєстрація авто, медична картка та інші процедури в Іспанії.',
  alternates: { canonical: getCanonicalUrl('guides') },
  openGraph: {
    title: 'Гайди - Digital Nomad Visa Іспанія',
    description:
      'Покрокові інструкції з отримання візи, оформлення документів та державних процедур в Іспанії.',
    url: getCanonicalUrl('guides'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гайди - Digital Nomad Visa Іспанія',
    description:
      'Покрокові інструкції з отримання візи та оформлення документів в Іспанії.',
  },
}

export const revalidate = 60

interface GuidesPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const resolved = await searchParams
  const categorySlug = resolved?.category

  const payload = await getPayload({ config: configPromise })

  const [guidesResult, categories, cmsPage] = await Promise.all([
    categorySlug
      ? getGuidesByCategory(categorySlug, 1, 999)
      : getGuides(1, 999),
    getGuideCategories(),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'guides' } },
      limit: 1,
      depth: 2,
    }),
  ])

  const { docs: guides } = guidesResult
  const page = cmsPage.docs[0] ?? null
  const layout = page?.layout ?? []

  const ctaBlock = layout.find(
    (b): b is GuidesCTABlockProps & { blockType: 'guidesCTA' } =>
      b.blockType === 'guidesCTA'
  ) ?? null

  const otherBlocks = layout.filter((b) => b.blockType !== 'guidesCTA')

  const hasPageBlocks = otherBlocks.length > 0

  return (
    <div className="min-h-screen pb-20">
      {/* @ts-ignore */}
      {hasPageBlocks && <RenderBlocks blocks={otherBlocks} />}

      <div className={`container mx-auto px-4 lg:px-8${hasPageBlocks ? '' : ' pt-32'}`}>
        {categories.length > 0 && (
          <div className="mb-8">
            <GuidesCategoryFilter categories={categories} />
          </div>
        )}

        {!guides?.length ? (
          <div className="text-center py-16">
            <p className="color-content-secondary">
              Поки що немає опублікованих гайдів. Завітайте пізніше.
            </p>
          </div>
        ) : (
          <GuidesBentoGrid guides={guides} cta={ctaBlock} />
        )}
      </div>
    </div>
  )
}
