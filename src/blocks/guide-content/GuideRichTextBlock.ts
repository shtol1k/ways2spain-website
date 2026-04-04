import { Block } from 'payload'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'

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
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
  ],
}
