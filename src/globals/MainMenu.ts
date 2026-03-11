import { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Main Menu',
  admin: {
    group: 'Structure',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoLarge',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Large',
      admin: {
        description: 'Displayed at XL and 2XL breakpoints (240×48 px). Use SVG or PNG with a transparent background.',
      },
    },
    {
      name: 'logoMedium',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Medium',
      admin: {
        description: 'Displayed at SM, MD and LG breakpoints (170×40 px). Use SVG or PNG with a transparent background.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/FooterRowLabels#LabelRowLabel',
        },
      },
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
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'External Link (Optional)',
          admin: {
            description: 'Use this only if not linking to an internal page.',
          },
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
