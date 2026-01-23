import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Japanese (日式)', value: 'japanese' },
      ],
      admin: {
        description: '選擇 Footer 樣式',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'CHINYI EGGS TECHNOLOGY',
      admin: {
        condition: (_, { style }) => style === 'japanese',
        description: '公司名稱（僅 Japanese 樣式）',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      admin: {
        condition: (_, { style }) => style === 'japanese',
        description: '聯絡資訊（僅 Japanese 樣式）',
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          defaultValue: 'No. 37, Xinmin Road, Chiayi City, Taiwan',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '05-2354049',
        },
        {
          name: 'fax',
          type: 'text',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      admin: {
        condition: (_, { style }) => style === 'japanese',
        description: '認證徽章（僅 Japanese 樣式）',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { name: 'HACCP' },
        { name: 'ISO 22000' },
        { name: 'CAS' },
        { name: 'HALAL' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: {
        condition: (_, { style }) => style === 'japanese',
        description: '版權聲明文字',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
