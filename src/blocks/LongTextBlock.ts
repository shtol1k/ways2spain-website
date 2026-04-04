import { Block } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CalloutBlock } from '@/blocks/callout/CalloutBlock'

export const LongTextBlock: Block = {
  slug: 'longText',
  labels: {
    singular: 'Long Text',
    plural: 'Long Text Blocks',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [CalloutBlock] }),
        ],
      }),
      required: true,
    },
    {
      name: 'showTableOfContents',
      type: 'checkbox',
      label: 'Show Table of Contents',
      defaultValue: true,
    },
  ],
}
