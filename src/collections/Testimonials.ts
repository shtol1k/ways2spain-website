import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'date'],
    group: 'Testimonials',
  },
  access: {
    read: () => true, // Public read
    create: ({ req }) => {
      const user = req.user
      if (!user) return false
      return user.role === 'admin' || user.role === 'manager'
    },
    update: ({ req }) => {
      const user = req.user
      if (!user) return false
      return user.role === 'admin' || user.role === 'manager'
    },
    delete: ({ req }) => {
      // Only admins can delete testimonials
      const user = req.user
      if (!user) return false
      return user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      // localized: true, // Disabled - no testimonials_locales table exists
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      // localized: true, // Disabled - no testimonials_locales table exists
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      // localized: true, // Disabled - no testimonials_locales table exists
      admin: {
        description: 'Client testimonial text',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Client photo (optional)',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook profile URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profile URL',
          },
        },
        {
          name: 'telegram',
          type: 'text',
          admin: {
            description: 'Telegram profile URL',
          },
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show on website',
      },
    },
  ],
}
