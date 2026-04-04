import { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { formatSlug } from '@/utilities/transliterate'
import { revalidateGuide } from '@/hooks/revalidateGuide'
import { GuideStepHeaderBlock } from '@/blocks/guide-content/GuideStepHeaderBlock'
import { GuideRichTextBlock } from '@/blocks/guide-content/GuideRichTextBlock'
import { CalloutBlock } from '@/blocks/callout/CalloutBlock'

const lexicalEditorConfig = () =>
  lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({}),
      BlocksFeature({ blocks: [CalloutBlock] }),
    ],
  })

export const Guides: CollectionConfig = {
  slug: 'guides',
  labels: {
    singular: 'Guide',
    plural: 'Guides',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'summary.lastUpdated'],
    group: 'Guides',
  },
  access: {
    read: ({ req }) => {
      const user = req.user
      if (user?.role === 'admin' || user?.role === 'manager') return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req }) =>
      Boolean(req.user && (req.user.role === 'admin' || req.user.role === 'manager')),
    update: ({ req }) =>
      Boolean(req.user && (req.user.role === 'admin' || req.user.role === 'manager')),
    delete: ({ req }) => Boolean(req.user && req.user.role === 'admin'),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateGuide],
    afterDelete: [revalidateGuide],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: { description: 'Guide title' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL)',
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title if empty',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return formatSlug(value)
            if (data?.title) return formatSlug(data.title)
            return value
          },
        ],
      },
      validate: (value) => (value ? true : 'Slug is required'),
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: { description: '150–200 characters for cards and SEO' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'guide-categories',
      required: true,
      label: 'Category',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: { position: 'sidebar' },
    },
    {
      name: 'summary',
      type: 'group',
      label: 'Summary',
      admin: { description: 'Shown at the top of the guide' },
      fields: [
        {
          name: 'totalCost',
          type: 'text',
          label: 'Total Cost',
          admin: { description: 'e.g. €50–100' },
        },
        {
          name: 'estimatedDuration',
          type: 'text',
          label: 'Estimated Duration',
          admin: { description: 'e.g. 2–3 months' },
        },
        {
          name: 'format',
          type: 'select',
          label: 'Format',
          hasMany: true,
          options: [
            { label: 'Online', value: 'online' },
            { label: 'Hybrid (online + offline)', value: 'hybrid' },
            { label: 'Offline', value: 'offline' },
          ],
          admin: { description: 'How the procedure is done' },
        },
        {
          name: 'requirements',
          type: 'array',
          label: 'Requirements',
          fields: [
            {
              name: 'requirement',
              type: 'text',
              required: true,
              label: 'Requirement',
            },
          ],
          admin: { description: 'e.g. Residency, NIE, e-signature' },
        },
        {
          name: 'lastUpdated',
          type: 'date',
          label: 'Last Updated',
          admin: { description: 'Guide accuracy as of this date' },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              label: 'Контент',
              minRows: 0,
              maxRows: 200,
              blocks: [GuideStepHeaderBlock, GuideRichTextBlock],
              admin: {
                description: 'Додавайте блоки в будь-якому порядку: шапку кроку, текст, callout тощо',
              },
            },
            {
              name: 'resources',
              type: 'array',
              label: 'Resources & Links',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Title' },
                { name: 'url', type: 'text', required: true, label: 'URL' },
                {
                  name: 'type',
                  type: 'select',
                  label: 'Type',
                  options: [
                    { label: 'Website', value: 'website' },
                    { label: 'PDF', value: 'pdf' },
                    { label: 'Video', value: 'video' },
                    { label: 'Form', value: 'form' },
                  ],
                },
                { name: 'description', type: 'text', label: 'Description' },
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'FAQ',
              fields: [
                { name: 'question', type: 'text', required: true, label: 'Question' },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
                  label: 'Answer',
                  editor: lexicalEditorConfig(),
                },
                lexicalHTML('answer', { name: 'answer_html' }),
              ],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Meta Title' },
            { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image',
            },
          ],
        },
      ],
    },
  ],
}
