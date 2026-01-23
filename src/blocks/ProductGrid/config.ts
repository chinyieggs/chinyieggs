import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ProductGrid: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: {
    singular: '產品卡片網格',
    plural: '產品卡片網格',
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
      defaultValue: 'Our Product Lines',
    },
    {
      name: 'items',
      type: 'array',
      label: '產品卡片',
      minRows: 1,
      maxRows: 6,
      fields: [
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
          label: '中文副標題',
          admin: {
            description: '例如：客製調理液系列',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: '產品描述',
        },
        link({
          overrides: {
            name: 'productLink',
            label: '產品連結',
          },
        }),
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
  ],
}
