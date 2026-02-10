import { getPayload } from 'payload'
import config from '@payload-config'
import type { Testimonial as PayloadTestimonial, Media } from '@/payload-types'
import { TestimonialsCarousel, type Testimonial } from './TestimonialsCarousel'

/**
 * Get photo URL from Payload media object.
 * Handles both populated Media objects and raw IDs.
 */
function getPhotoUrl(photo: PayloadTestimonial['photo']): string | undefined {
  if (!photo || typeof photo === 'number') return undefined

  const media = photo as Media
  return media.url ?? undefined
}

export default async function Testimonials() {
  let testimonials: Testimonial[] = []

  try {
    // Use Payload Local API instead of HTTP fetch.
    // This works reliably during both build-time and runtime,
    // because it queries the database directly without needing a running server.
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'testimonials',
      where: {
        published: { equals: true },
      },
      sort: '-date',
      depth: 1, // Populate photo relationship
    })

    testimonials = (result.docs as PayloadTestimonial[]).map((item) => ({
      id: String(item.id),
      name: item.name,
      title: item.title,
      testimonial: item.testimonial,
      date: item.date,
      facebook: item.socialLinks?.facebook ?? undefined,
      linkedin: item.socialLinks?.linkedin ?? undefined,
      photo: getPhotoUrl(item.photo),
    }))
  } catch (err) {
    console.error('Error loading testimonials:', err)
    // Continue with empty array — testimonials are non-critical
  }

  // Don't render section if no testimonials
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-6">Відгуки наших клієнтів</h2>
          <p className="text-xl text-muted-foreground">
            Реальні відгуки реальних людей, які вже переїхали в Іспанію через Digital Nomad Visa
          </p>
        </div>

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}
