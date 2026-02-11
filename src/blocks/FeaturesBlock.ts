import { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features',
    plural: 'Features',
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/FeatureRowLabel#FeatureRowLabel',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Feature Description',
          required: true,
        },
      ],
    },
  ],
}
