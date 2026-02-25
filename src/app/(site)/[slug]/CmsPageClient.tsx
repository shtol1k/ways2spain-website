'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { Page } from '@/payload-types'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

interface CmsPageClientProps {
  initialData: Page
}

export const CmsPageClient: React.FC<CmsPageClientProps> = ({ initialData }) => {
  const { data } = useLivePreview<Page>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  return (
    <div className="min-h-screen">
      <RenderBlocks blocks={data.layout} />
    </div>
  )
}
