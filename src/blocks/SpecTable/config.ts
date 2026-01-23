import type { Block } from 'payload'

export const SpecTable: Block = {
  slug: 'specTable',
  interfaceName: 'SpecTableBlock',
  labels: {
    singular: '規格表格',
    plural: '規格表格',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '表格標題（可選）',
    },
    {
      name: 'showHeaders',
      type: 'checkbox',
      label: '顯示欄位標題',
      defaultValue: true,
    },
    {
      name: 'columnHeaders',
      type: 'group',
      label: '欄位標題（預設為 Item / Specification）',
      admin: {
        condition: (data, siblingData) => siblingData?.showHeaders !== false,
      },
      fields: [
        {
          name: 'labelHeader',
          type: 'text',
          label: '第一欄標題',
          defaultValue: 'Item',
        },
        {
          name: 'valueHeader',
          type: 'text',
          label: '第二欄標題',
          defaultValue: 'Specification',
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: '表格行',
      minRows: 1,
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
      name: 'style',
      type: 'select',
      label: '樣式',
      defaultValue: 'striped',
      options: [
        { label: '條紋式', value: 'striped' },
        { label: '邊框式', value: 'bordered' },
        { label: '簡潔式', value: 'minimal' },
      ],
    },
  ],
}
