
import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidatePost = ({ doc, req: { payload } }: any) => {
    payload.logger.info(`Revalidating post at path: /blog/${doc.slug}`)

    try {
        revalidatePath(`/blog/${doc.slug}`)
        revalidatePath('/blog')
        revalidatePath('/') // Assuming posts might be displayed on the home page
    } catch (err) {
        payload.logger.error(`Error revalidating post: ${err}`)
    }

    return doc
}

