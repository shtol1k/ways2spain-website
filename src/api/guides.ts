import { getPayload } from 'payload'
import config from '@payload-config'

const getPayloadClient = async () => {
  return await getPayload({ config })
}

export type GuidesResponse = {
  docs: Guide[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type GuideCategory = {
  id: number
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  order?: number | null
  color?: string | null
  updatedAt: string
  createdAt: string
}

export type GuideSummary = {
  totalCost?: string | null
  estimatedDuration?: string | null
  format?: ('online' | 'hybrid' | 'offline')[] | null
  requirements?: Array<{ requirement?: string | null }> | null
  lastUpdated?: string | null
}

export type GuideStepHeaderBlock = {
  id: string
  blockType: 'guideStepHeader'
  title: string
  format?: 'online' | 'hybrid' | 'offline' | null
  duration?: string | null
  cost?: string | null
}

export type GuideRichTextBlock = {
  id: string
  blockType: 'guideRichText'
  content: unknown
  content_html?: string | null
}

export type GuideContentBlock = GuideStepHeaderBlock | GuideRichTextBlock

export type GuideResource = {
  id: string
  title: string
  url: string
  type?: 'website' | 'pdf' | 'video' | 'form' | null
  description?: string | null
}

export type GuideFAQ = {
  id: string
  question: string
  answer: unknown
  answer_html?: string | null
}

export type Guide = {
  id: number
  title: string
  slug: string
  excerpt: string
  category: number | GuideCategory
  featuredImage?: number | { id: number; url?: string; alt?: string } | null
  summary: GuideSummary
  content?: GuideContentBlock[] | null
  resources?: GuideResource[] | null
  faqs?: GuideFAQ[] | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    metaImage?: number | { id: number; url?: string } | null
  } | null
  updatedAt: string
  createdAt: string
  _status?: 'draft' | 'published'
}

/**
 * Get all published guides with pagination
 */
export async function getGuides(
  page: number = 1,
  limit: number = 12
): Promise<GuidesResponse> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'guides',
      where: { _status: { equals: 'published' } },
      sort: '-updatedAt',
      depth: 2,
      page,
      limit,
    })
    return {
      docs: result.docs as Guide[],
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page ?? 1,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    }
  } catch (error) {
    console.error('Error fetching guides:', error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Get a single guide by category slug and guide slug
 */
export async function getGuideBySlug(
  categorySlug: string,
  slug: string
): Promise<Guide | null> {
  try {
    const payload = await getPayloadClient()
    const categoryResult = await payload.find({
      collection: 'guide-categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    if (categoryResult.docs.length === 0) return null
    const categoryId = categoryResult.docs[0].id
    const result = await payload.find({
      collection: 'guides',
      where: {
        _status: { equals: 'published' },
        slug: { equals: slug },
        'category.id': { equals: categoryId },
      },
      depth: 2,
      limit: 1,
    })
    return (result.docs[0] as Guide) || null
  } catch (error) {
    console.error(`Error fetching guide "${categorySlug}/${slug}":`, error)
    return null
  }
}

/**
 * Get guides by category slug
 */
export async function getGuidesByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 12
): Promise<GuidesResponse> {
  try {
    const payload = await getPayloadClient()
    const categoryResult = await payload.find({
      collection: 'guide-categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    if (categoryResult.docs.length === 0) {
      return {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
    const categoryId = categoryResult.docs[0].id
    const result = await payload.find({
      collection: 'guides',
      where: {
        _status: { equals: 'published' },
        'category.id': { equals: categoryId },
      },
      sort: '-updatedAt',
      depth: 2,
      page,
      limit,
    })
    return {
      docs: result.docs as Guide[],
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page ?? 1,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    }
  } catch (error) {
    console.error(`Error fetching guides by category "${categorySlug}":`, error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Get all guide categories
 */
export async function getGuideCategories(): Promise<GuideCategory[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'guide-categories',
      sort: 'order',
      limit: 100,
    })
    return result.docs as GuideCategory[]
  } catch (error) {
    console.error('Error fetching guide categories:', error)
    return []
  }
}

/**
 * Get guide category by slug
 */
export async function getGuideCategoryBySlug(
  slug: string
): Promise<GuideCategory | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'guide-categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as GuideCategory) || null
  } catch (error) {
    console.error(`Error fetching guide category by slug "${slug}":`, error)
    return null
  }
}

/**
 * Get related guides (same category, exclude current)
 */
export async function getRelatedGuides(
  categoryId: number,
  excludeId: number,
  limit: number = 3
): Promise<Guide[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'guides',
      where: {
        _status: { equals: 'published' },
        'category.id': { equals: categoryId },
        id: { not_equals: excludeId },
      },
      sort: '-updatedAt',
      depth: 1,
      limit,
    })
    return result.docs as Guide[]
  } catch (error) {
    console.error(`Error fetching related guides for category ${categoryId}:`, error)
    return []
  }
}

/**
 * Get all guide slugs for static params / sitemap (category + slug)
 */
export async function getAllGuideSlugs(): Promise<
  Array<{ category: string; slug: string; updatedAt: string }>
> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'guides',
      where: { _status: { equals: 'published' } },
      depth: 1,
      limit: 500,
    })
    return (result.docs as Guide[])
      .map((g) => {
        const cat = g.category
        const categorySlug =
          typeof cat === 'object' && cat && 'slug' in cat
            ? (cat as GuideCategory).slug
            : null
        if (!g.slug || !categorySlug) return null
        return {
          category: categorySlug,
          slug: g.slug,
          updatedAt: g.updatedAt || new Date().toISOString()
        }
      })
      .filter((x): x is { category: string; slug: string; updatedAt: string } => x != null)
  } catch (error) {
    console.error('Error fetching guide slugs:', error)
    return []
  }
}
