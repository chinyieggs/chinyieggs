import type { Block } from 'payload'

export const YouTube: Block = {
  slug: 'youtube',
  interfaceName: 'YouTubeBlock',
  labels: {
    singular: 'YouTube 影片',
    plural: 'YouTube 影片',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'YouTube 網址',
      required: true,
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=...',
        description: '支援 youtube.com/watch?v=... 或 youtu.be/... 格式',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: '影片標題',
      admin: {
        description: '用於無障礙 (accessibility)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: '寬度 (%)',
          min: 30,
          max: 100,
          defaultValue: 100,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'aspectRatio',
          type: 'select',
          label: '比例',
          defaultValue: '16:9',
          options: [
            { label: '16:9 (標準)', value: '16:9' },
            { label: '4:3', value: '4:3' },
            { label: '1:1 (正方形)', value: '1:1' },
            { label: '9:16 (直式)', value: '9:16' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
