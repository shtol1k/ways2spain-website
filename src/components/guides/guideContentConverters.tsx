import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { CalloutBlockComponent } from '@/components/callout/CalloutBlockComponent'
import { GuideStepBlockComponent } from '@/components/guide-step/GuideStepBlockComponent'

export const guideContentConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callout: ({ node }: { node: any }) => <CalloutBlockComponent node={node} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guideStep: ({ node }: { node: any }) => <GuideStepBlockComponent node={node} />,
  },
})
