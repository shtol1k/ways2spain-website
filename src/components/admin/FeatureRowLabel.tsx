'use client'

import { useRowLabel } from '@payloadcms/ui'

/**
 * Custom row label for Features array items.
 * Shows the feature title in the collapsed row header,
 * making it easy to identify items without expanding them.
 */
export const FeatureRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  return <div>{data?.title || `Feature ${String(rowNumber).padStart(2, '0')}`}</div>
}
