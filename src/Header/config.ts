import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
        description: '選擇 Header 樣式',
      },
    },
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'CHINYI EGGS',
      admin: {
        condition: (_, { style }) => style === 'japanese',
        description: 'Logo 文字（僅 Japanese 樣式）',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        // 添加子選單支援
        linkGroup({
          overrides: {
            name: 'submenu',
            label: 'Submenu Items',
            admin: {
              description: '添加子選單項目（滑鼠移到主選單時顯示）',
            },
          },
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
