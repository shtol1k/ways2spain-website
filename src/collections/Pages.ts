import { CollectionConfig } from 'payload'
import { PageHeaderBlock } from '../blocks/PageHeaderBlock'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturesBlock } from '../blocks/FeaturesBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { TextBlock } from '../blocks/TextBlock'
import { CardsType1Block } from '../blocks/CardsType1Block'
import { CardsType2Block } from '../blocks/CardsType2Block'
import { LongTextBlock } from '../blocks/LongTextBlock'
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
    group: 'Structure',
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
    read: ({ req: { user } }) => {
      // If user is logged in, grant full access
      if (user) {
        return true
      }
      
      // If not logged in, only return published pages
      return {
        published: {
          equals: true,
        },
      }
    },
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
                FeaturesBlock,
                TestimonialsBlock,
                TextBlock,
                CardsType1Block,
                CardsType2Block,
                LongTextBlock,
              ],
              // Limit Hero block to maximum 1 per page
              validate: (value) => {
                if (!Array.isArray(value)) return true
                const heroCount = value.filter(
                  (block: any) => block.blockType === 'hero'
                ).length
                if (heroCount > 1) {
                  return 'Only one Hero block is allowed per page'
                }
                return true
              },
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
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'If unchecked, this page will be hidden from public access and menus.',
      },
    },
  ],
}
