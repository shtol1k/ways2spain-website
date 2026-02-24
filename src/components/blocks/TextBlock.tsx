import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface TextBlockProps {
  content: Parameters<typeof RichText>[0]['data']
}

export const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
    <div className="w-full py-4 lg:py-6">
      <div className="mx-auto px-4 lg:px-8 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div className="rich-text color-content-secondary">
          <RichText data={content} />
        </div>
      </div>
    </div>
  )
}
