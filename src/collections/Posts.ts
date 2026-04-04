import { CollectionConfig } from 'payload'
import {
    BlocksFeature,
    HTMLConverterFeature,
    lexicalEditor,
    lexicalHTML
} from '@payloadcms/richtext-lexical'
import { CalloutBlock } from '@/blocks/callout/CalloutBlock'
import { formatSlug } from '@/utilities/transliterate'
import { revalidatePost } from '@/hooks/revalidatePost'

export const Posts: CollectionConfig = {
    slug: 'posts',
    labels: {
        singular: 'Article',
        plural: 'Articles',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishedAt'],
        group: 'Blog',
    },
    access: {
        read: ({ req }) => {
            const user = req.user
            if (user?.role === 'admin' || user?.role === 'manager') return true
            return {
                _status: {
                    equals: 'published',
                },
            }
        },
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
            const user = req.user
            if (!user) return false
            return user.role === 'admin'
        },
    },
    versions: {
        drafts: true,
    },
    hooks: {
        afterChange: [revalidatePost],
        afterDelete: [revalidatePost],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            admin: {
                description: 'Main article title',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'excerpt',
                            type: 'textarea',
                            required: true,
                            label: 'Short Description',
                            admin: {
                                description: 'Preview text for lists (SEO description by default)',
                            },
                        },
                        {
                            name: 'featuredImage',
                            type: 'upload',
                            relationTo: 'media',
                            required: false,
                            label: 'Main Image',
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            required: true,
                            label: 'Content',
                            editor: lexicalEditor({
                                features: ({ defaultFeatures }) => [
                                    ...defaultFeatures,
                                    HTMLConverterFeature({}),
                                    BlocksFeature({ blocks: [CalloutBlock] }),
                                ],
                            }),
                        },
                        lexicalHTML('content', { name: 'content_html' }),
                    ],
                },
                {
                    label: 'SEO',
                    name: 'seo', // Preserves the data structure: { seo: { metaTitle: ... } }
                    fields: [
                        {
                            name: 'metaTitle',
                            type: 'text',
                            label: 'Meta Title',
                            admin: {
                                description: 'Leave empty to use article title',
                            },
                        },
                        {
                            name: 'metaDescription',
                            type: 'textarea',
                            label: 'Meta Description',
                            admin: {
                                description: 'Leave empty to use short description',
                            },
                        },
                        {
                            name: 'metaImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'OG Image',
                            admin: {
                                description: 'Leave empty to use main image',
                            },
                        },
                    ],
                },
            ],
        },
        // Sidebar fields
        {
            name: 'slug',
            type: 'text',
            unique: true,
            index: true,
            label: 'Slug (URL)',
            admin: {
                description: 'Article URL (automatically generated from title if empty)',
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return formatSlug(data.title)
                        }
                        return value
                    },
                ],
            },
            validate: (value) => {
                if (!value) {
                    return 'Slug is required (will be auto-generated from Title)'
                }
                return true
            },
        },

        {
            name: 'publishedAt',
            type: 'date',
            label: 'Published At',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
            required: true,
            label: 'Author',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
            label: 'Category',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
            label: 'Tags',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'relatedPosts',
            type: 'relationship',
            relationTo: 'posts',
            hasMany: true,
            label: 'Related Articles',
            filterOptions: ({ id }) => {
                return {
                    id: {
                        not_equals: id,
                    },
                }
            },
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'readTime',
            type: 'number',
            label: 'Reading Time (min)',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Calculated automatically on save',
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        if (data?.content) {
                            const text = JSON.stringify(data.content)
                            const wordCount = text.split(/\s+/).length
                            return Math.ceil(wordCount / 200)
                        }
                        return 0
                    },
                ],
            },
        },
    ],
}
