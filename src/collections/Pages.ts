import { CollectionConfig } from 'payload'
import { PageHeaderBlock } from '../blocks/PageHeaderBlock'
import { HeroBlock } from '../blocks/HeroBlock'
import { revalidatePage } from '../hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePage],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Layout',
    livePreview: {
      url: ({ data }) => {
        const path = data.slug !== 'home' ? `/${data.slug}` : '/'
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${serverURL}${path}`
      },
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Name',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              label: 'URL Slug',
              admin: {
                description: 'The URL slug for the page (e.g. "about", "contact"). Use "home" for the homepage.',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Page Content',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
              minRows: 0,
              blocks: [
                PageHeaderBlock,
                HeroBlock,
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              label: 'SEO Metadata',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Meta Title',
                  minLength: 20,
                  maxLength: 100,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Meta Description',
                  minLength: 40,
                  maxLength: 160,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'OG Image',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
