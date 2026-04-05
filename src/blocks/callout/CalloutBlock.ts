import { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Type',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Alert', value: 'alert' },
        { label: 'Success', value: 'success' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'message',
      type: 'text',
      required: true,
      label: 'Text',
    },
  ],
}
