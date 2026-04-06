import { CollectionConfig } from 'payload'
import { formatSlug } from '@/utilities/transliterate'

export const GuideCategories: CollectionConfig = {
  slug: 'guide-categories',
  labels: {
    singular: 'Guide Category',
    plural: 'Guide Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Guides',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user && (req.user.role === 'admin' || req.user.role === 'manager')),
    update: ({ req }) => Boolean(req.user && (req.user.role === 'admin' || req.user.role === 'manager')),
    delete: ({ req }) => Boolean(req.user && req.user.role === 'admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
      admin: {
        description: 'Category name (e.g. Visas, Documents, Vehicles)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL-friendly identifier (auto-generated from name if empty)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) return formatSlug(data.name)
            return value
          },
        ],
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
        if (!slugRegex.test(value)) {
          return 'Slug must contain only lowercase latin letters, numbers and hyphens'
        }
        return true
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Order',
      admin: {
        description: 'Sorting order (lower number = higher in list)',
      },
    },
  ],
  defaultSort: 'order',
}
