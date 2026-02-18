import { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Main Menu',
  admin: {
    group: 'Layout',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },
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
      type: 'row',
      fields: [
        {
          name: 'ctaPrimary',
          type: 'group',
          label: 'Primary CTA Button',
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
        {
          name: 'ctaSecondary',
          type: 'group',
          label: 'Secondary CTA Button',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button Label',
              defaultValue: 'Contact Us',
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
    },
  ],
}
