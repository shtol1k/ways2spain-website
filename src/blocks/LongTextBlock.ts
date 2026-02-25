import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
      editor: lexicalEditor({}),
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
