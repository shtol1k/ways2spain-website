import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Layout',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Page Link',
          required: true,
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Get Consultation',
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Link Target',
        },
      ],
    },
  ],
}
