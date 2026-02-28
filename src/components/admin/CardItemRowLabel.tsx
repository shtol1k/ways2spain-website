'use client'

import { useRowLabel } from '@payloadcms/ui'

export const CardItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ text?: string }>()

  return <div>{data?.text || `Item ${String(rowNumber).padStart(2, '0')}`}</div>
}
