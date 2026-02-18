import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../globals.css'

config.autoAddCss = false
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingBar from '@/components/LoadingBar'
import { Toaster } from '@/components/ui/sonner'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap', // Prevents FOIT (Flash of Invisible Text)
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Ways2Spain - Digital Nomad Visa Spain',
  description: 'Допомагаємо віддаленим спеціалістам з родинами жити і працювати в Іспанії з Digital Nomad Visa.',
  openGraph: {
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Ways 2 Spain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph.png'],
    site: '@ways2spain',
  },
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  const headerGlobal = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })

  const navItems = headerGlobal.navItems?.map((item) => {
    // Check if link is a Page object (populated)
    if (item.link && typeof item.link !== 'string') {
      const page = item.link as any // Using any to avoid strict type checks on 'published' field for now
      
      // Filter unpublished pages for non-authenticated users
      // If user is absent AND page.published is explicitly false, hide it.
      if (!user && page.published === false) {
        return null
      }

      const href = page.slug === 'home' ? '/' : `/${page.slug}`
      return { path: href, label: item.label }
    }
    return null
  }).filter((item): item is { path: string, label: string } => item !== null) || undefined

  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <GoogleTagManagerHead />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/blog/rss.xml"
          title="RSS Блог - Ways2Spain"
        />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerBody />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <div className="min-h-screen flex flex-col">
          <Navbar items={navItems} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
