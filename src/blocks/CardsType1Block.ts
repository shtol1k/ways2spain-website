import { Block } from 'payload'

export const CardsType1Block: Block = {
  slug: 'cardsType1',
  labels: {
    singular: 'Cards Type 1',
    plural: 'Cards Type 1',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'cardLeft',
      type: 'group',
      label: 'Card Left',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'cardRight',
      type: 'group',
      label: 'Card Right',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
