import { revalidatePath } from 'next/cache'

export const revalidateGuide = async ({
  doc,
  req: { payload },
}: any) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
  let categorySlug: string | null = null
  if (doc?.category && typeof doc.category === 'object' && 'slug' in doc.category) {
    categorySlug = (doc.category as { slug?: string }).slug ?? null
  }

  if (slug && !categorySlug && doc?.id) {
    try {
      const found = await payload.find({
        collection: 'guides',
        where: { id: { equals: doc.id } },
        depth: 1,
        limit: 1,
      })
      const cat = found.docs[0]?.category
      if (cat && typeof cat === 'object' && 'slug' in cat) {
        categorySlug = (cat as { slug: string }).slug
      }
    } catch {
      // ignore
    }
  }

  payload.logger?.info?.(`Revalidating guide: /guides/${categorySlug ?? '…'}/${slug ?? '…'}`)

  try {
    if (slug && categorySlug) {
      revalidatePath(`/guides/${categorySlug}/${slug}`)
    }
    revalidatePath('/guides')
    revalidatePath('/')
  } catch (err) {
    payload.logger?.error?.(`Error revalidating guide: ${err}`)
  }

  return doc
}
