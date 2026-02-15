import { buildConfig } from 'payload'
import './src/styles/payload-editor.css'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import { Users } from './src/collections/Users'
import { Testimonials } from './src/collections/Testimonials'
import { Media } from './src/collections/Media'
import { Categories } from './src/collections/Categories'
import { Tags } from './src/collections/Tags'
import { Authors } from './src/collections/Authors'
import { Posts } from './src/collections/Posts'
import { GuideCategories } from './src/collections/GuideCategories'
import { Guides } from './src/collections/Guides'
import { Pages } from './src/collections/Pages'
import { resendAdapter } from '@payloadcms/email-resend'
import { SiteSettings } from './src/globals/SiteSettings'
import { Footer } from './src/globals/Footer'

// ============================================
// Environment Variables Validation
// ============================================

/**
 * Fail-fast strategy: Validate critical environment variables
 * Better to crash at startup than run with insecure/broken configuration
 */

// PAYLOAD_SECRET: Critical for JWT tokens, sessions, encryption
if (!process.env.PAYLOAD_SECRET) {
  throw new Error(
    '❌ PAYLOAD_SECRET environment variable is required.\n' +
    'This secret is used for JWT tokens, sessions, and encryption.\n' +
    'Generate a secure secret: openssl rand -base64 32\n' +
    'Add it to your .env.local file or Vercel environment variables.'
  )
}

// DATABASE_URL: Critical for database connection
if (!process.env.DATABASE_URL) {
  throw new Error(
    '❌ DATABASE_URL environment variable is required.\n' +
    'Example: postgresql://user:password@host:5432/database\n' +
    'Add it to your .env.local file or Vercel environment variables.'
  )
}

// Note: RESEND_API_KEY and FROM_EMAIL have fallbacks for local dev
// Email functionality will fail gracefully without crashing the app

export default buildConfig({
  // Email configuration
  email: resendAdapter({
    defaultFromAddress: process.env.FROM_EMAIL || 'no-reply@ways2spain.com',
    defaultFromName: 'Ways2Spain Service',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // Rich text editor
  editor: lexicalEditor(),

  // Database configuration
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Disable push mode - use migrations only for schema changes
    // To add new fields: npx payload migrate:create --name your-migration-name
    // Migrations run automatically on Vercel deploy (see vercel.json buildCommand)
    push: false,
  }),

  // Sharp for image processing
  sharp,

  // Admin panel configuration
  admin: {
    user: Users.slug,
    meta: {
      title: 'Ways2Spain Admin',
      description: 'Content Management System',
    },
  },

  // Globals
  globals: [
    SiteSettings,
    Footer,
  ],

  // Collections — ordered by sidebar group appearance
  collections: [
    // Resources
    Media,
    // Layout
    Pages,
    // Blog
    Posts,
    Categories,
    Authors,
    Tags,
    // Guides
    Guides,
    GuideCategories,
    // Testimonials
    Testimonials,
    // Settings
    Users,
  ],

  // Server configuration
  // Uses VERCEL_URL automatically on Vercel deployments, localhost for local dev
  // Note: On Vercel preview deployments, VERCEL_BRANCH_URL contains the actual URL being used
  serverURL: process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  cors: [
    // Production & Dev domains
    'https://ways2spain.com',
    'https://dev.ways2spain.com',
    // Auto-generated Vercel URLs (both canonical and branch-specific)
    ...(process.env.VERCEL_BRANCH_URL ? [`https://${process.env.VERCEL_BRANCH_URL}`] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    // Local development
    'http://localhost:3000',
  ],
  csrf: [
    // Production & Dev domains
    'https://ways2spain.com',
    'https://dev.ways2spain.com',
    // Auto-generated Vercel URLs (both canonical and branch-specific)
    ...(process.env.VERCEL_BRANCH_URL ? [`https://${process.env.VERCEL_BRANCH_URL}`] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    // Local development
    'http://localhost:3000',
  ],

  // Security
  secret: process.env.PAYLOAD_SECRET,

  // Localization configuration - DISABLED until all _locales tables are created
  // The Testimonials collection has localized: true fields, but no testimonials_locales table
  // Uncomment after running migrations to create locales tables for all collections
  // localization: {
  //   locales: [
  //     {
  //       label: 'Українська',
  //       code: 'uk',
  //     },
  //     {
  //       label: 'English',
  //       code: 'en',
  //     },
  //     {
  //       label: 'Español',
  //       code: 'es',
  //     },
  //   ],
  //   defaultLocale: 'uk',
  //   fallback: true,
  // },

  // Typescript
  typescript: {
    outputFile: './src/payload-types.ts',
  },

  // Folders feature (beta) - enables folder organization for collections
  folders: {
    browseByFolder: true, // Enable "browse by folder" view in Admin UI
  },

  // Cloudflare R2 Storage Plugin (S3-compatible)
  plugins: process.env.MEDIA_STORAGE === 'local' ? [] : [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          generateFileURL: ({ filename, prefix }) => {
            // IMPORTANT: Return undefined (not empty string!) when filename is missing
            // Empty string causes React rendering crash in Payload Admin UI
            if (!filename) {
              return undefined as unknown as string
            }
            // Use R2 public URL for production
            if (process.env.R2_PUBLIC_URL) {
              return `${process.env.R2_PUBLIC_URL}/${prefix}/${filename}`
            }
            // For local development without R2
            return `/api/media/file/${filename}`
          },
        },
      },
      bucket: process.env.R2_BUCKET_NAME || 'w2s-media',
      config: {
        endpoint: process.env.R2_REGION
          ? `https://${process.env.R2_ACCOUNT_ID}.${process.env.R2_REGION}.r2.cloudflarestorage.com`
          : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        forcePathStyle: true,
      },
    }),
  ],

  // Debug logging
  onInit: async () => {
    const storageMode = process.env.MEDIA_STORAGE
    console.log('🔍 Payload Storage Configuration:')
    console.log(`  - MEDIA_STORAGE: ${storageMode}`)
    console.log(`  - Plugins: ${storageMode === 'local' ? 'NONE (using local staticDir)' : 's3Storage (R2)'}`)
    console.log(`  - R2 URL: ${process.env.R2_PUBLIC_URL}`)

    console.log('🔐 Payload Auth Configuration:')
    console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`  - VERCEL_URL: ${process.env.VERCEL_URL || 'not set'}`)
    console.log(`  - VERCEL_BRANCH_URL: ${process.env.VERCEL_BRANCH_URL || 'not set'}`)
    const serverURL = process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'
    console.log(`  - serverURL: ${serverURL}`)
    console.log(`  - secure cookie: ${process.env.NODE_ENV === 'production'}`)
  },
})
