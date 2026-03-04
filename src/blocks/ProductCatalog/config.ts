import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProductCatalog: Block = {
  slug: 'productCatalog',
  interfaceName: 'ProductCatalogBlock',
  labels: {
    singular: '產品目錄（彈窗）',
    plural: '產品目錄（彈窗）',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: '區段標籤',
      defaultValue: 'Products',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: '區段標題',
      defaultValue: 'Our Product Range',
    },
    {
      name: 'items',
      type: 'array',
      label: '產品項目',
      minRows: 1,
      maxRows: 12,
      fields: [
        // Card fields
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '產品圖片',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: '圖片 URL（替代）',
          admin: {
            condition: (_, siblingData) => !siblingData?.image,
          },
        },
        {
          name: 'title',
          type: 'text',
          label: '產品標題',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: '副標題',
        },
        // Modal fields
        {
          name: 'description',
          type: 'richText',
          label: '詳細描述',
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
          name: 'features',
          type: 'array',
          label: '特色列表',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: '特色文字',
              required: true,
            },
          ],
          admin: {
            initCollapsed: false,
          },
        },
        {
          name: 'specs',
          type: 'array',
          label: '規格',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: '項目名稱',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              label: '值',
              required: true,
            },
          ],
          admin: {
            initCollapsed: false,
          },
        },
        {
          name: 'applicationImages',
          type: 'array',
          label: '應用圖片',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: '圖片',
            },
            {
              name: 'imageUrl',
              type: 'text',
              label: '圖片 URL（替代）',
              admin: {
                condition: (_, siblingData) => !siblingData?.image,
              },
            },
            {
              name: 'caption',
              type: 'text',
              label: '圖片說明',
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: '每行列數',
      defaultValue: '3',
      options: [
        { label: '2 列', value: '2' },
        { label: '3 列', value: '3' },
        { label: '4 列', value: '4' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: '背景色',
      defaultValue: 'shiro',
      options: [
        { label: '象牙白 (Shiro)', value: 'shiro' },
        { label: '米色 (Kinari)', value: 'kinari' },
      ],
    },
  ],
}
