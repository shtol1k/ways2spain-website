import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Structure',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'slogan',
      type: 'textarea',
      label: 'Slogan',
      admin: {
        description: 'Text displayed below the logo in the footer.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 6,
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
          label: 'Title',
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
      name: 'resourceItems',
      type: 'array',
      label: 'Resource Items',
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
          label: 'Title',
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
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/FooterRowLabels#PlatformRowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'xTwitter' },
            { label: 'Twitter (legacy)', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'TikTok', value: 'tiktok' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'serviceLinks',
      type: 'array',
      label: 'Service Links',
      maxRows: 6,
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
          label: 'Title',
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
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2024 Ways 2 Spain. All rights reserved.',
    },
  ],
}
