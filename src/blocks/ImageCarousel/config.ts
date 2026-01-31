import type { Block } from 'payload'

export const ImageCarousel: Block = {
  slug: 'imageCarousel',
  interfaceName: 'ImageCarouselBlock',
  labels: {
    singular: '圖片輪播',
    plural: '圖片輪播',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: '圖片列表',
      minRows: 2,
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
            description: '如果沒有上傳圖片，可使用外部 URL',
            condition: (_, siblingData) => !siblingData?.image,
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: '圖片說明',
          admin: {
            description: '可選的圖片描述文字',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: '啟用自動輪播',
      defaultValue: true,
    },
    {
      name: 'autoplayInterval',
      type: 'select',
      label: '輪播間隔（秒）',
      defaultValue: '3',
      options: [
        { label: '3 秒', value: '3' },
        { label: '5 秒', value: '5' },
        { label: '7 秒', value: '7' },
        { label: '10 秒', value: '10' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.autoplay === true,
      },
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      label: '滑鼠懸停時暫停',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.autoplay === true,
      },
    },
    {
      name: 'showThumbnails',
      type: 'checkbox',
      label: '顯示縮圖列',
      defaultValue: true,
    },
  ],
}
