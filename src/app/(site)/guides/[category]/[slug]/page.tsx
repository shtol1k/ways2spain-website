import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getGuideBySlug,
  getAllGuideSlugs,
} from '@/api/guides'
import { getCanonicalUrl } from '@/lib/utils'
import { GuideHeader } from '@/components/guides/GuideHeader'
import { GuideSummary } from '@/components/guides/GuideSummary'
import { GuideContent } from '@/components/guides/GuideContent'
import { GuideResources } from '@/components/guides/GuideResources'
import { GuidesTableOfContents } from '@/components/guides/GuidesTableOfContents'
import { GuideFAQ } from '@/components/guides/GuideFAQ'
import { PrintButton } from '@/components/guides/PrintButton'
import { PrintStyles } from '@/components/guides/PrintStyles'
import { JsonLd } from '@/components/JsonLd'
import type { GuideCategory } from '@/api/guides'
import {
  generateHowToSchema,
  generateFAQSchema,
  generateGuideBreadcrumbSchema,
} from '@/lib/guideSchema'

export const revalidate = 60

interface GuidePageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs()
  return slugs.map(({ category, slug }) => ({ category, slug }))
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const guide = await getGuideBySlug(category, slug)
  if (!guide) return { title: 'Гайд не знайдено' }

  const metaTitle =
    typeof guide.seo?.metaTitle === 'string' && guide.seo.metaTitle
      ? guide.seo.metaTitle
      : guide.title
  const metaDescription =
    typeof guide.seo?.metaDescription === 'string' && guide.seo.metaDescription
      ? guide.seo.metaDescription
      : guide.excerpt
  const canonical = getCanonicalUrl(`guides/${category}/${slug}`)
  const ogImage =
    guide.seo?.metaImage && typeof guide.seo.metaImage === 'object' && guide.seo.metaImage.url
      ? guide.seo.metaImage.url
      : guide.featuredImage && typeof guide.featuredImage === 'object' && guide.featuredImage.url
        ? guide.featuredImage.url
        : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      type: 'article',
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { category, slug } = await params
  const guide = await getGuideBySlug(category, slug)
  if (!guide) notFound()

  const categoryData =
    typeof guide.category === 'object'
      ? (guide.category as GuideCategory)
      : null
  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    { label: 'Гайди', href: '/guides' },
    ...(categoryData
      ? [{ label: categoryData.name, href: `/guides?category=${categoryData.slug}` }]
      : []),
    { label: guide.title },
  ]

  const howToSchema = generateHowToSchema(guide, category)
  const faqSchema = guide.faqs?.length
    ? generateFAQSchema(guide.faqs)
    : null
  const breadcrumbSchema = generateGuideBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <JsonLd data={howToSchema} />
      {faqSchema && Object.keys(faqSchema).length > 0 ? (
        <JsonLd data={faqSchema} />
      ) : null}
      <JsonLd data={breadcrumbSchema} />

      <GuideHeader guide={guide} categorySlug={category} />

      <div className="min-h-screen pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <main className="min-w-0">
              {guide.introduction ? (
                <p className="text-body-large color-content-secondary mb-6">{guide.introduction}</p>
              ) : null}
              <GuideSummary summary={guide.summary} />
              <GuideContent content={guide.content} />
              <GuideFAQ faqs={guide.faqs} />
            </main>

            <aside className="space-y-6 print:hidden">
              <div className="lg:sticky lg:top-24 space-y-6">
                <GuidesTableOfContents content={guide.content} />
                <GuideResources resources={guide.resources} />
                <PrintButton />
              </div>
            </aside>
          </div>

          <PrintStyles />
        </div>
      </div>
    </>
  )
}
