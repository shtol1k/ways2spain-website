'use client'

import { useRowLabel } from '@payloadcms/ui'

/**
 * Row label for footer array items that have a `label` field (navItems, resourceItems, serviceLinks).
 * Displays the item's label in the collapsed row header.
 */
export const LabelRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()
  return <div>{data?.label || `Item ${String(rowNumber).padStart(2, '0')}`}</div>
}

/**
 * Row label for social media links. Displays the platform name.
 */
export const PlatformRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ platform?: string }>()
  return <div>{data?.platform || `Social ${String(rowNumber).padStart(2, '0')}`}</div>
}
