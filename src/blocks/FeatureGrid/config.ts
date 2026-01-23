import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    singular: '特色卡片網格',
    plural: '特色卡片網格',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: '區段標籤',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: '區段標題',
    },
    {
      name: 'items',
      type: 'array',
      label: '特色項目',
      minRows: 1,
      maxRows: 12,
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
          name: 'title',
          type: 'text',
          label: '標題',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: '描述',
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
      name: 'cardStyle',
      type: 'select',
      label: '卡片樣式',
      defaultValue: 'imageTop',
      options: [
        { label: '圖片在上', value: 'imageTop' },
        { label: '圖片在左', value: 'imageLeft' },
        { label: '純文字（無圖片）', value: 'textOnly' },
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
