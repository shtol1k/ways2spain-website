import { revalidatePath } from 'next/cache'

/**
 * Revalidation hook for the Pages collection.
 * Called after a page is created/updated/deleted in Payload CMS.
 * Invalidates Next.js cache so the frontend reflects changes immediately.
 */
export const revalidatePage = ({ doc, req: { payload } }: any) => {
  const slug = doc?.slug

  // Determine the frontend path based on slug
  // "home" maps to "/", all other slugs map to "/{slug}"
  const pagePath = slug === 'home' ? '/' : `/${slug}`

  payload.logger.info(`Revalidating page at path: ${pagePath}`)

  try {
    revalidatePath(pagePath)

    // Also revalidate homepage since it may display page-related content
    if (slug !== 'home') {
      revalidatePath('/')
    }
  } catch (err) {
    payload.logger.error(`Error revalidating page: ${err}`)
  }

  return doc
}
