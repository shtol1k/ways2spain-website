import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { CalloutBlockComponent } from '@/components/callout/CalloutBlockComponent'
import { GuideStepBlockComponent } from '@/components/guide-step/GuideStepBlockComponent'
import { LightboxImage } from '@/components/ui/image-lightbox'

export const guideContentConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: ({ node }: { node: any }) => <LightboxImage node={node} />,
  blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callout: ({ node }: { node: any }) => <CalloutBlockComponent node={node} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guideStep: ({ node }: { node: any }) => <GuideStepBlockComponent node={node} />,
  },
})
