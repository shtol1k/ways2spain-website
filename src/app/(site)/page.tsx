
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ways 2 Spain - Релокація в Іспанію через Digital Nomad Visa',
  description: 'Професійна допомога з релокацією в Іспанію. Digital Nomad Visa, NIE, TIE, резиденція. 300+ успішних кейсів, 98% схвалених заявок. Персональний супровід на кожному етапі.',
  keywords: ['релокація Іспанія', 'Digital Nomad Visa', 'NIE Іспанія', 'імміграція в Іспанію', 'переїзд в Іспанію', 'резиденція Іспанія', 'Ways2Spain'],
  openGraph: {
    title: 'Ways 2 Spain - Релокація в Іспанію через Digital Nomad Visa',
    description: 'Професійна допомога з релокацією в Іспанію. 300+ успішних кейсів, 98% схвалених заявок.',
    url: 'https://ways2spain.com',
    siteName: 'Ways 2 Spain',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Ways 2 Spain - Релокація в Іспанію',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ways 2 Spain - Релокація в Іспанію',
    description: 'Професійна допомога з релокацією в Іспанію. 300+ успішних кейсів.',
    images: ['/opengraph.png'],
    site: '@ways2spain',
  },
  alternates: {
    canonical: 'https://ways2spain.com',
  },
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
    depth: 2,
  })

  // We don't want to show 404 for home page if it doesn't exist in CMS yet,
  // we just fall back to static content.
  const homePage = docs[0] || null

  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd
        data={[
          // Organization Schema
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://ways2spain.com/#organization',
            name: 'Ways 2 Spain',
            legalName: 'Ways 2 Spain',
            url: 'https://ways2spain.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://ways2spain.com/logo.png',
              width: 512,
              height: 512,
            },
            description: 'Професійна допомога з релокацією в Іспанію через Digital Nomad Visa. 300+ успішних кейсів, 98% схвалених заявок.',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'hello@ways2spain.com',
              availableLanguage: ['Ukrainian', 'English', 'Russian'],
            },
            sameAs: [
              'https://t.me/ways2spain',
              'https://instagram.com/ways2spain',
              'https://x.com/ways2spain',
            ],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'ES',
            },
          },
          // WebSite Schema with Search
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://ways2spain.com/#website',
            name: 'Ways 2 Spain',
            url: 'https://ways2spain.com',
            description: 'Професійна допомога з релокацією в Іспанію через Digital Nomad Visa',
            publisher: {
              '@id': 'https://ways2spain.com/#organization',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://ways2spain.com/blog?search={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          },
        ]}
      />
      
      <div className="min-h-screen">
        {/* CMS Blocks */}
        {homePage?.layout && (
          <RenderBlocks blocks={homePage.layout} />
        )}

        <Features />
        <Testimonials />
        <ProcessSection />
        <CTASection />
      </div>
    </>
  )
}
