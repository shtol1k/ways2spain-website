import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { CmsPageClient } from './CmsPageClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  const page = docs[0]
  if (!page) return {}

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: true,
    overrideAccess: !!user,
  })

  const page = docs[0]
  if (!page) notFound()

  return <CmsPageClient initialData={page} />
}
