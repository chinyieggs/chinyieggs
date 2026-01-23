import type { Block } from 'payload'

export const CheckList: Block = {
  slug: 'checkList',
  interfaceName: 'CheckListBlock',
  labels: {
    singular: '功能清單',
    plural: '功能清單',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '標題（可選）',
    },
    {
      name: 'items',
      type: 'array',
      label: '清單項目',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: '項目文字',
          required: true,
        },
      ],
      admin: {
        initCollapsed: false,
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: '圖示樣式',
      defaultValue: 'check',
      options: [
        { label: '打勾 ✓', value: 'check' },
        { label: '圓點 •', value: 'bullet' },
        { label: '數字', value: 'number' },
        { label: '星號 ★', value: 'star' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: '列數',
      defaultValue: '1',
      options: [
        { label: '單列', value: '1' },
        { label: '雙列', value: '2' },
      ],
    },
  ],
}
