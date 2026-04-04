import { Callout } from '@/components/ui/callout'
import { GuideStepHeader } from '@/components/guides/GuideStepHeader'
import type { GuideContentBlock, GuideStepHeaderBlock, GuideCalloutBlock, GuideRichTextBlock } from '@/api/guides'

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
          if (!richBlock.content_html) return null
          return (
            <div
              key={block.id}
              className="rich-text max-w-none color-content-secondary [&_p]:!text-base [&_p]:!leading-6"
              dangerouslySetInnerHTML={{
                __html: richBlock.content_html.replace(/<p>(<p[\s\S]*?<\/p>)<\/p>/g, '$1'),
              }}
            />
          )
        }

        if (block.blockType === 'guideCallout') {
          const calloutBlock = block as GuideCalloutBlock
          return (
            <Callout
              key={block.id}
              variant={calloutBlock.type}
              title={calloutBlock.title ?? undefined}
              className="my-4"
            >
              {calloutBlock.content_html ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: calloutBlock.content_html.replace(/<p>(<p[\s\S]*?<\/p>)<\/p>/g, '$1'),
                  }}
                />
              ) : null}
            </Callout>
          )
        }

        return null
      })}
    </div>
  )
}
