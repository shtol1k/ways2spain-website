'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { Page } from '@/payload-types'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

interface HomePageClientProps {
  initialData: Page
}

/**
 * Client wrapper for the homepage that enables Live Preview.
 *
 * How it works:
 * - In normal mode: renders using `initialData` from server
 * - In Live Preview (admin iframe): `useLivePreview` hook listens for
 *   postMessage events from Payload admin and updates `data` in real-time
 *   as the editor types, without needing to publish changes first
 */
export const HomePageClient: React.FC<HomePageClientProps> = ({ initialData }) => {
  const { data } = useLivePreview<Page>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  return (
    <>
      {data.layout && Array.isArray(data.layout) && data.layout.length > 0 && (
        <RenderBlocks blocks={data.layout} />
      )}
    </>
  )
}
