import { Block } from 'payload'
import {
  BlocksFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CalloutBlock } from '@/blocks/callout/CalloutBlock'

export const GuideRichTextBlock: Block = {
  slug: 'guideRichText',
  labels: {
    singular: 'Текст',
    plural: 'Текстові блоки',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Контент',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
          BlocksFeature({ blocks: [CalloutBlock] }),
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
  ],
}
