import type { Block } from 'payload'

export const JapaneseHero: Block = {
  slug: 'japaneseHero',
  interfaceName: 'JapaneseHeroBlock',
  labels: {
    singular: '日式 Hero',
    plural: '日式 Hero',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: '標籤文字',
      defaultValue: "Taiwan's Most Trusted",
      admin: {
        description: 'Hero 上方的小標籤',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '主標題',
      required: true,
      defaultValue: 'CHINYI EGGS',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: '副標題',
      defaultValue: 'Cherishing Everyone. Treasuring Taiwan.',
    },
    {
      name: 'titleFont',
      type: 'select',
      label: '標題字體',
      defaultValue: 'serif',
      options: [
        { label: 'Serif (Cormorant Garamond)', value: 'serif' },
        { label: 'Sans-serif (Source Sans Pro)', value: 'sans' },
      ],
      admin: {
        description: '首頁使用 Sans-serif，其他頁面使用 Serif',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: '背景圖片',
      required: false,
    },
    {
      name: 'backgroundImageUrl',
      type: 'text',
      label: '背景圖片 URL（替代）',
      admin: {
        description: '如果沒有上傳圖片，可使用外部 URL',
        condition: (_, siblingData) => !siblingData?.backgroundImage,
      },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Hero 高度',
      defaultValue: 'medium',
      options: [
        { label: '小', value: 'small' },
        { label: '中', value: 'medium' },
        { label: '大', value: 'large' },
        { label: '全螢幕', value: 'full' },
      ],
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: '遮罩透明度',
      min: 0,
      max: 100,
      defaultValue: 40,
      admin: {
        description: '背景遮罩的透明度 (0-100)',
      },
    },
  ],
}
