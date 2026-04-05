import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { CalloutBlockComponent } from './CalloutBlockComponent'
import { LightboxImage } from '@/components/ui/image-lightbox'

export const calloutJSXConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: ({ node }: { node: any }) => <LightboxImage node={node} />,
  blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callout: ({ node }: { node: any }) => <CalloutBlockComponent node={node} />,
  },
})
