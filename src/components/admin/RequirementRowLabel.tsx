'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RequirementRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ requirement?: string }>()

  return <div>{data?.requirement || `Requirement ${String(rowNumber).padStart(2, '0')}`}</div>
}
