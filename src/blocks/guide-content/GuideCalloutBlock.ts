import { Block } from 'payload'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'

export const GuideCalloutBlock: Block = {
  slug: 'guideCallout',
  labels: {
    singular: 'Callout',
    plural: 'Callout-блоки',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Тип',
      options: [
        { label: 'Інформація', value: 'info' },
        { label: 'Попередження', value: 'warning' },
        { label: 'Увага', value: 'alert' },
        { label: 'Успіх', value: 'success' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (опціонально)',
    },
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
