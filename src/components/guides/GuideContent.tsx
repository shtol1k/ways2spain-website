import { RichText } from '@payloadcms/richtext-lexical/react'
import { guideContentConverters } from '@/components/guides/guideContentConverters'

interface GuideContentProps {
  content: unknown
}

export function GuideContent({ content }: GuideContentProps) {
  if (!content) return null

  return (
    <div className="guide-content rich-text color-content-secondary [&_p]:text-base! [&_p]:leading-6!">
      <RichText
        data={content as Parameters<typeof RichText>[0]['data']}
        converters={guideContentConverters}
      />
    </div>
  )
}
