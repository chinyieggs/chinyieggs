import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HighlightBox: Block = {
  slug: 'highlightBox',
  interfaceName: 'HighlightBoxBlock',
  labels: {
    singular: '重點區塊',
    plural: '重點區塊',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: '樣式',
      defaultValue: 'quote',
      options: [
        { label: '引言', value: 'quote' },
        { label: '資訊', value: 'info' },
        { label: '重點', value: 'highlight' },
        { label: '警告', value: 'warning' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: '內容',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'author',
      type: 'text',
      label: '作者（引言樣式）',
      admin: {
        condition: (_, { variant }) => variant === 'quote',
      },
    },
  ],
}
