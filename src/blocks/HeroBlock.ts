import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
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
      minRows: 0,
      maxRows: 2,
      labels: {
        singular: 'Button',
        plural: 'Buttons',
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
              name: 'type',
              type: 'select',
              label: 'Type',
              defaultValue: 'custom',
              options: [
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
                {
                  label: 'Internal Page',
                  value: 'page',
                },
              ],
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
              name: 'url',
              type: 'text',
              label: 'Custom URL',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                width: '50%',
              },
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Internal Page',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'page',
                width: '50%',
              },
            },
            {
              name: 'style',
              type: 'select',
              label: 'Style',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
                {
                  label: 'Outline',
                  value: 'outline',
                },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
