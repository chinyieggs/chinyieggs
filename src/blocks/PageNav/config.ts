import type { Block } from 'payload'

import { link } from '@/fields/link'

export const PageNav: Block = {
  slug: 'pageNav',
  interfaceName: 'PageNavBlock',
  labels: {
    singular: '頁面標籤導航',
    plural: '頁面標籤導航',
  },
  fields: [
    {
      name: 'groupId',
      type: 'text',
      label: '群組 ID',
      admin: {
        description: '用於識別同一組導航的 ID，例如：company、products-liquid',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: '導航項目',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: '標籤文字',
          required: true,
        },
        link({
          overrides: {
            name: 'navLink',
            label: '連結',
          },
        }),
        {
          name: 'isActive',
          type: 'checkbox',
          label: '目前頁面',
          defaultValue: false,
          admin: {
            description: '勾選表示此項目為目前所在頁面',
          },
        },
      ],
      admin: {
        initCollapsed: false,
      },
    },
    {
      name: 'style',
      type: 'select',
      label: '樣式',
      defaultValue: 'tabs',
      options: [
        { label: '標籤式', value: 'tabs' },
        { label: '按鈕式', value: 'buttons' },
        { label: '文字式', value: 'text' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: '對齊方式',
      defaultValue: 'center',
      options: [
        { label: '置左', value: 'left' },
        { label: '置中', value: 'center' },
        { label: '置右', value: 'right' },
      ],
    },
  ],
}
