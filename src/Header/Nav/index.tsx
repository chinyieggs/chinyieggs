'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map(({ link, submenu }, i) => {
        // 檢查是否為當前頁面
        const isActive = pathname === link.url
        const hasSubmenu = submenu && Array.isArray(submenu) && submenu.length > 0

        if (hasSubmenu) {
          // 帶有子選單的導航項目（主項目不是連結，只用來觸發下拉選單）
          return (
            <div
              key={i}
              className="relative py-3"
              onMouseEnter={() => setOpenSubmenu(i)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <span
                className={cn(
                  'cursor-pointer transition-colors',
                  'hover:text-primary',
                )}
              >
                {link.label}
              </span>

              {/* 下拉選單 */}
              <AnimatePresence>
                {openSubmenu === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -10, x: '-50%' }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 pt-1 w-32 bg-card rounded-lg shadow-xl py-2 z-50"
                  >
                    {submenu.map((subItem: any, subIndex: number) => {
                      const subIsActive = pathname === subItem.link.url
                      return (
                        <CMSLink
                          key={subIndex}
                          {...subItem.link}
                          appearance="link"
                          className={cn(
                            'block px-4 py-2 transition-colors text-sm text-center no-underline hover:no-underline',
                            subIsActive
                              ? 'text-white bg-primary hover:bg-primary/90'
                              : 'hover:bg-primary/5 hover:text-primary',
                          )}
                        />
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        // 一般導航項目（無子選單）
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn(
              'transition-colors relative py-3',
              'hover:text-primary',
              isActive &&
                'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary',
            )}
          />
        )
      })}
      <div className="flex gap-2 items-center ml-2 border-l border-border pl-4">
        <Link href="/search" className="hover:text-primary transition-colors">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5" />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
