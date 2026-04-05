import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { CalloutBlockComponent } from './CalloutBlockComponent'

export const calloutJSXConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callout: ({ node }: { node: any }) => <CalloutBlockComponent node={node} />,
  },
})
