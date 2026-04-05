'use client'

export function GuideStepLabel({ data }: { data?: { title?: string | null } }) {
  const title = data?.title
  return <span>{title ? `${title} · Guide Step` : 'Guide Step'}</span>
}
