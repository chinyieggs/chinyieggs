import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SectionIntro: Block = {
  slug: 'sectionIntro',
  interfaceName: 'SectionIntroBlock',
  labels: {
    singular: '區塊介紹',
    plural: '區塊介紹',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: '標籤 (小字)',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: '標題',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: '內容',
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
      name: 'showDivider',
      type: 'checkbox',
      label: '顯示分隔線',
      defaultValue: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: '按鈕文字',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: '按鈕連結',
    },
    {
      name: 'textAlign',
      type: 'select',
      label: '文字對齊',
      defaultValue: 'center',
      options: [
        { label: '置中', value: 'center' },
        { label: '靠左', value: 'left' },
      ],
    },
  ],
}
