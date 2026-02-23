import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/TestimonialRowLabel#TestimonialRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Client Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Client Title / Role',
          required: true,
        },
        {
          name: 'testimonial',
          type: 'textarea',
          label: 'Testimonial Text',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
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
          label: 'Client Photo',
        },
        {
          type: 'collapsible',
          label: 'Social Links',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'xTwitter',
              type: 'text',
              label: 'X (Twitter) URL',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'telegram',
              type: 'text',
              label: 'Telegram URL',
            },
          ],
        },
      ],
    },
  ],
}
