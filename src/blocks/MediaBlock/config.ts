import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: '圖片區塊',
    plural: '圖片區塊',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: '上傳圖片',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: '圖片 URL（替代）',
      admin: {
        description: '如果沒有上傳圖片，可使用外部 URL',
        condition: (_, siblingData) => !siblingData?.media,
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: '圖片描述 (Alt)',
      admin: {
        description: '用於無障礙和 SEO',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: '縮放 (%)',
          min: 20,
          max: 100,
          defaultValue: 100,
          admin: {
            width: '50%',
            description: '圖片縮放比例 (20-100%)',
          },
        },
        {
          name: 'offsetX',
          type: 'number',
          label: '水平偏移 (%)',
          min: -50,
          max: 50,
          defaultValue: 0,
          admin: {
            width: '50%',
            description: '負值向左，正值向右',
          },
        },
      ],
    },
  ],
}
