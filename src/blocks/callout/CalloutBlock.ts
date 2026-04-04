import { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callout-блоки',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Тип',
      defaultValue: 'info',
      options: [
        { label: 'Інформація', value: 'info' },
        { label: 'Попередження', value: 'warning' },
        { label: 'Увага', value: 'alert' },
        { label: 'Успіх', value: 'success' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (опціонально)',
    },
    {
      name: 'message',
      type: 'text',
      required: true,
      label: 'Текст',
    },
  ],
}
