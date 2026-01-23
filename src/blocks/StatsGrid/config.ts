import type { Block } from 'payload'

export const StatsGrid: Block = {
  slug: 'statsGrid',
  interfaceName: 'StatsGridBlock',
  labels: {
    singular: '統計數字網格',
    plural: '統計數字網格',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: '統計項目',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: '數字',
          required: true,
          admin: {
            description: '例如：46+、80+、#1、100K',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: '標籤',
          required: true,
          admin: {
            description: '例如：Years、Vehicles、Market Share',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: '後綴（可選）',
          admin: {
            description: '例如：Class Cleanroom',
          },
        },
      ],
      admin: {
        initCollapsed: false,
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: '背景色',
      defaultValue: 'kinari',
      options: [
        { label: '米色 (Kinari)', value: 'kinari' },
        { label: '象牙白 (Shiro)', value: 'shiro' },
        { label: '深色 (Sumi)', value: 'sumi' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: '每行列數',
      defaultValue: '4',
      options: [
        { label: '2 列', value: '2' },
        { label: '3 列', value: '3' },
        { label: '4 列', value: '4' },
      ],
    },
  ],
}
