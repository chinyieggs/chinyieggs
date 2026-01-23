import type { Block } from 'payload'

export const CertificationGrid: Block = {
  slug: 'certificationGrid',
  interfaceName: 'CertificationGridBlock',
  labels: {
    singular: '認證徽章網格',
    plural: '認證徽章網格',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: '區段標籤',
      defaultValue: 'Quality',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: '區段標題',
      defaultValue: 'Certified Excellence',
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述文字',
    },
    {
      name: 'items',
      type: 'array',
      label: '認證項目',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: '認證名稱',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: '說明（可選）',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: '圖標（可選）',
        },
      ],
      admin: {
        initCollapsed: false,
      },
      defaultValue: [
        { name: 'HACCP' },
        { name: 'ISO 22000' },
        { name: 'CAS' },
        { name: 'HALAL' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: '背景色',
      defaultValue: 'kinari',
      options: [
        { label: '米色 (Kinari)', value: 'kinari' },
        { label: '象牙白 (Shiro)', value: 'shiro' },
      ],
    },
  ],
}
