import { Block } from 'payload'

export const CardsType2Block: Block = {
  slug: 'cardsType2',
  labels: {
    singular: 'Cards Type 2',
    plural: 'Cards Type 2',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/CardType2RowLabel#CardType2RowLabel',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon / Illustration',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
}
