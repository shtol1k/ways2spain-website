import { Block } from 'payload'

export const GuideStepHeaderBlock: Block = {
  slug: 'guideStepHeader',
  labels: {
    singular: 'Шапка кроку',
    plural: 'Шапки кроків',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок кроку',
      admin: { description: 'Наприклад: Крок 1: Отримання DUA' },
    },
    {
      name: 'format',
      type: 'select',
      label: 'Формат',
      options: [
        { label: 'Онлайн', value: 'online' },
        { label: 'Гібрид (онлайн + офлайн)', value: 'hybrid' },
        { label: 'Офлайн', value: 'offline' },
      ],
      admin: { description: 'Як виконується цей крок' },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Тривалість',
      admin: { description: 'Наприклад: 2–3 дні, 1 тиждень' },
    },
    {
      name: 'cost',
      type: 'text',
      label: 'Витрати',
      admin: { description: 'Наприклад: 320€, безкоштовно' },
    },
  ],
}
