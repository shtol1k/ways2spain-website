import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical'
import { CalloutBlockComponent } from './CalloutBlockComponent'

type CalloutFields = {
  type: 'info' | 'warning' | 'alert' | 'success'
  title?: string | null
  message: string
}

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CalloutFields>

export const calloutJSXConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    callout: ({ node }) => (
      <CalloutBlockComponent node={node as SerializedBlockNode<CalloutFields>} />
    ),
  },
})
