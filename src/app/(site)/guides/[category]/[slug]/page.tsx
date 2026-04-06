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
import type { GuideStep } from '@/components/guides/GuidesTableOfContents'
import { GuideFAQ } from '@/components/guides/GuideFAQ'
import { PrintStyles } from '@/components/guides/PrintStyles'
import { JsonLd } from '@/components/JsonLd'
import type { GuideCategory } from '@/api/guides'
import {
  generateHowToSchema,
  generateFAQSchema,
  generateGuideBreadcrumbSchema,
} from '@/lib/guideSchema'

function extractGuideSteps(content: unknown): GuideStep[] {
  if (!content || typeof content !== 'object') return []
  const root = (content as Record<string, unknown>).root
  if (!root || typeof root !== 'object') return []
  const children = (root as Record<string, unknown>).children
  if (!Array.isArray(children)) return []

  const steps: GuideStep[] = []
  for (const node of children) {
    if (
      node &&
      typeof node === 'object' &&
      (node as Record<string, unknown>).type === 'block'
    ) {
      const fields = (node as Record<string, unknown>).fields as Record<string, unknown> | undefined
      if (fields?.blockType === 'guideStep' && typeof fields.id === 'string' && typeof fields.title === 'string') {
        steps.push({ id: fields.id, title: fields.title })
      }
    }
  }
  return steps
}

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

  const guideSteps = extractGuideSteps(guide.content)
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
              {guide.introduction_html ? (
                <div
                  className="mb-6 [&_p]:text-body-base [&_p]:color-content-secondary [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_a]:color-content-link [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: guide.introduction_html }}
                />
              ) : null}
              <GuideSummary summary={guide.summary} />
              <GuideContent content={guide.content} />
              <GuideFAQ faqs={guide.faqs} />
              <div className="lg:hidden mt-8 print:hidden">
                <GuideResources resources={guide.resources} variant="inline" />
              </div>
            </main>

            <aside className="space-y-6 print:hidden">
              <div className="lg:sticky lg:top-24 space-y-10">
                <GuidesTableOfContents steps={guideSteps} />
                <div className="hidden lg:block">
                  <GuideResources resources={guide.resources} />
                </div>
              </div>
            </aside>
          </div>

          <PrintStyles />
        </div>
      </div>
    </>
  )
}
