import { Block } from 'payload'

export const GuideStepBlock: Block = {
  slug: 'guideStep',
  interfaceName: 'GuideStepFields',
  labels: {
    singular: 'Guide Step',
    plural: 'Guide Steps',
  },
  admin: {
    components: {
      Label: '@/blocks/guide-step/GuideStepLabel#GuideStepLabel',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Step Title',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'format',
          type: 'select',
          label: 'Format',
          options: [
            { label: 'Online', value: 'online' },
            { label: 'Hybrid (online + offline)', value: 'hybrid' },
            { label: 'Offline', value: 'offline' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Estimated Duration',
          admin: { width: '33%' },
        },
        {
          name: 'cost',
          type: 'text',
          label: 'Costs',
          admin: { width: '33%' },
        },
      ],
    },
  ],
}
