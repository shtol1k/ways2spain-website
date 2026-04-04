/**
 * JSON-LD Schema.org structured data for Guides (HowTo, FAQ)
 */

import { getCanonicalUrl } from './utils'
import type { Guide, GuideStepHeaderBlock, GuideFAQ as GuideFAQType } from '@/api/guides'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function generateHowToSchema(
  guide: Guide,
  categorySlug: string
): object {
  const url = getCanonicalUrl(`guides/${categorySlug}/${guide.slug}`)
  const stepHeaders = (guide.content ?? []).filter(
    (b): b is GuideStepHeaderBlock => b.blockType === 'guideStepHeader'
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.excerpt,
    url,
    ...(guide.summary?.estimatedDuration && {
      totalTime: guide.summary.estimatedDuration,
    }),
    ...(guide.summary?.totalCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: guide.summary.totalCost,
      },
    }),
    ...(guide.summary?.requirements?.length && {
      supply: guide.summary.requirements.map((r) => ({
        '@type': 'HowToSupply',
        name: r.requirement,
      })),
    }),
    step: stepHeaders.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.title,
    })),
  }
}

export function generateFAQSchema(faqs: GuideFAQType[]): object {
  if (!faqs?.length) return {}
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer_html ?? faq.question,
      },
    })),
  }
}

export function generateGuideBreadcrumbSchema(items: BreadcrumbItem[]): object {
  const base = getCanonicalUrl('').replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `${base}${item.href.startsWith('/') ? item.href : `/${item.href}`}`,
      }),
    })),
  }
}
