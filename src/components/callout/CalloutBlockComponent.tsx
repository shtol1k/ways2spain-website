import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { Callout } from '@/components/ui/callout'

type CalloutFields = {
  type: 'info' | 'warning' | 'alert' | 'success'
  title?: string | null
  message: string
}

export function CalloutBlockComponent({
  node,
}: {
  node: SerializedBlockNode<CalloutFields>
}) {
  const { type, title, message } = node.fields

  return (
    <Callout variant={type} title={title ?? undefined} className="my-4">
      <p>{message}</p>
    </Callout>
  )
}
