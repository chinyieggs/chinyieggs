import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: '時間軸',
    plural: '時間軸',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: '區段標籤',
      defaultValue: 'History',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: '區段標題',
      defaultValue: 'Corporate Milestones',
    },
    {
      name: 'items',
      type: 'array',
      label: '里程碑項目',
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: '年份',
          required: true,
          admin: {
            description: '例如：1981、2000s、Present',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: '標題',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: '描述',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '圖片（可選）',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: '布局',
      defaultValue: 'alternating',
      options: [
        { label: '交替式', value: 'alternating' },
        { label: '左側式', value: 'left' },
        { label: '右側式', value: 'right' },
      ],
    },
  ],
}
