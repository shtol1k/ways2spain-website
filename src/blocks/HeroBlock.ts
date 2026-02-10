import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  // Prevent renaming the block in the admin UI
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
      name: 'text',
      type: 'textarea',
      label: 'Text',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      // Always exactly 2 buttons: Primary CTA and Secondary CTA
      minRows: 2,
      maxRows: 2,
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      admin: {
        // Prevent reordering and deleting — buttons are fixed
        isSortable: false,
        description: 'First button = Primary CTA (gold), Second button = Secondary CTA (outline)',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Target Page',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      minRows: 0,
      maxRows: 5,
      labels: {
        singular: 'Benefit',
        plural: 'Benefits',
      },
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
}
