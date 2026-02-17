import type { Metadata } from 'next'
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

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <Navbar />
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
