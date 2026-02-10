import { getPayload } from "payload"
import configPromise from "@payload-config"
import { VisaPageClient } from "./VisaPageClient"
import type { Metadata } from "next"

// SEO Metadata - kept static as requested, or could be dynamic
export const metadata: Metadata = {
  title: "Digital Nomad Visa в Іспанії - Ways 2 Spain | Посібник 2025",
  description: "Повна інформація про Digital Nomad Visa в Іспанії: вимоги, процедура отримання, документи, строки. Дохід від €2763/місяць, термін дії 3 роки.",
  keywords: ["Digital Nomad Visa", "Іспанія", "віза для цифрових кочівників", "релокація", "віддалена робота", "ТІЕ", "резиденція"],
  openGraph: {
    title: "Digital Nomad Visa в Іспанії - Ways 2 Spain",
    description: "Повна інформація про візу для віддалених спеціалістів — від умов до процедури отримання",
    url: "https://ways2spain.com/visa",
    siteName: "Ways 2 Spain",
    locale: "uk_UA",
    type: "article",
  },
  alternates: {
    canonical: "https://ways2spain.com/visa",
  },
}

export const revalidate = 60

export default async function VisaPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch page data
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'visa',
      },
    },
    depth: 2,
    // Note: Live Preview will automatically fetch drafts on the client side
    // Initial server render uses published data by default
  })

  // Basic fallback data structure if no page is found in CMS yet
  const pageData = docs[0] || {
    id: 0,
    title: 'Digital Nomad Visa в Іспанії',
    slug: 'visa',
    hero: {
      title: 'Digital Nomad Visa в Іспанії',
      description: 'Повна інформація про візу для віддалених спеціалістів — від умов до процедури отримання',
    },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  // Cast to specific type if needed, or rely on TS compatibility
  return <VisaPageClient initialData={pageData as any} />
}
