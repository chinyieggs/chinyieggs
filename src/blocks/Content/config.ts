import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: '欄位寬度',
    defaultValue: 'oneThird',
    options: [
      {
        label: '1/3',
        value: 'oneThird',
      },
      {
        label: '1/2',
        value: 'half',
      },
      {
        label: '2/3',
        value: 'twoThirds',
      },
      {
        label: '全寬',
        value: 'full',
      },
    ],
  },
  {
    name: 'contentType',
    type: 'select',
    label: '內容類型',
    defaultValue: 'text',
    options: [
      {
        label: '純文字',
        value: 'text',
      },
      {
        label: '純圖片',
        value: 'media',
      },
      {
        label: '圖片 + 文字',
        value: 'both',
      },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.contentType === 'media' || siblingData?.contentType === 'both'
      },
    },
  },
  {
    type: 'row',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.contentType === 'media' || siblingData?.contentType === 'both'
      },
    },
    fields: [
      {
        name: 'mediaWidth',
        type: 'number',
        label: '縮放 (%)',
        min: 20,
        max: 100,
        defaultValue: 100,
        admin: {
          width: '50%',
        },
      },
      {
        name: 'mediaPosition',
        type: 'select',
        label: '圖片位置',
        defaultValue: 'above',
        admin: {
          width: '50%',
          condition: (_data, siblingData) => {
            return siblingData?.contentType === 'both'
          },
        },
        options: [
          {
            label: '文字上方',
            value: 'above',
          },
          {
            label: '文字下方',
            value: 'below',
          },
        ],
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.contentType === 'text' || siblingData?.contentType === 'both'
      },
    },
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
