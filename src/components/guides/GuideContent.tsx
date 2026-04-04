import { RichText } from '@payloadcms/richtext-lexical/react'
import { GuideStepHeader } from '@/components/guides/GuideStepHeader'
import { calloutJSXConverters } from '@/components/callout/calloutConverters'
import type { GuideContentBlock, GuideStepHeaderBlock, GuideRichTextBlock } from '@/api/guides'

interface GuideContentProps {
  content: GuideContentBlock[] | null | undefined
}

export function GuideContent({ content }: GuideContentProps) {
  if (!content?.length) return null

  let stepIndex = 0

  return (
    <div className="guide-content">
      {content.map((block) => {
        if (block.blockType === 'guideStepHeader') {
          stepIndex += 1
          return (
            <GuideStepHeader
              key={block.id}
              block={block as GuideStepHeaderBlock}
              stepIndex={stepIndex}
            />
          )
        }

        if (block.blockType === 'guideRichText') {
          const richBlock = block as GuideRichTextBlock
          return (
            <div
              key={block.id}
              className="rich-text color-content-secondary [&_p]:text-base! [&_p]:leading-6!"
            >
              <RichText
                data={richBlock.content as Parameters<typeof RichText>[0]['data']}
                converters={calloutJSXConverters}
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
