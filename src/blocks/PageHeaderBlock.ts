import { Block } from 'payload'

export const PageHeaderBlock: Block = {
  slug: 'pageHeader', // This is the block type name
  labels: {
    singular: 'Page Header',
    plural: 'Page Headers',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
    },
  ],
}
