import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const TextBlock: Block = {
  slug: 'text',
  labels: {
    singular: 'Text',
    plural: 'Text Blocks',
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
  ],
}
