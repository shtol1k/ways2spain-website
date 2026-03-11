'use client'

import { useRowLabel } from '@payloadcms/ui'

export const CardType2RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  return <div>{data?.title || `Card ${String(rowNumber).padStart(2, '0')}`}</div>
}
