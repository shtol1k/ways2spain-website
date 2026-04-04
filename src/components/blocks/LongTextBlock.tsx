'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { calloutJSXConverters } from '@/components/callout/calloutConverters'

interface LongTextBlockProps {
  content: Parameters<typeof RichText>[0]['data']
  showTableOfContents?: boolean | null
}

export const LongTextBlock: React.FC<LongTextBlockProps> = ({
  content,
  showTableOfContents = true,
}) => {
  return (
    <section className="py-6 lg:py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start max-w-screen-2xl mx-auto">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="long-text-content rich-text color-content-secondary">
              <RichText data={content} converters={calloutJSXConverters} />
            </div>
          </div>

          {/* Sidebar with ToC — desktop only */}
          {showTableOfContents && (
            <aside className="hidden lg:flex lg:flex-col w-[280px] shrink-0 gap-6 sticky top-24">
              <TableOfContents selector=".long-text-content" />
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
