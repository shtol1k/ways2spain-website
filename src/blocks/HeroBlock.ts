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
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'primaryLabel',
              type: 'text',
              label: 'Primary CTA Label',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'primaryPage',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Primary CTA Target',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondaryLabel',
              type: 'text',
              label: 'Secondary CTA Label',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'secondaryPage',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Secondary CTA Target',
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
