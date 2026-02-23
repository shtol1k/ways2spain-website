'use client'
import { useRowLabel } from '@payloadcms/ui'

export const TestimonialRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()
  return <div>{data?.name || `Testimonial ${String(rowNumber).padStart(2, '0')}`}</div>
}
