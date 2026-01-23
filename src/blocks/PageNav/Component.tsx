'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import type { PageNavBlock as PageNavBlockType } from '@/payload-types'

type Props = PageNavBlockType & {
  className?: string
}

export const PageNavBlock: React.FC<Props> = ({
  items,
  className,
}) => {
  const pathname = usePathname()

  if (!items || items.length === 0) return null

  // Get link URL from item
  const getLinkUrl = (item: (typeof items)[0]): string => {
    if (item.navLink?.url) return item.navLink.url
    const ref = item.navLink?.reference?.value as { slug?: string } | undefined
    return ref?.slug ? `/${ref.slug}` : '#'
  }

  // Check if item is active
  const isItemActive = (item: (typeof items)[0]): boolean => {
    if (item.isActive) return true
    const url = getLinkUrl(item)
    return pathname === url || pathname === url.replace(/^\//, '')
  }

  // Match original CSS: .page-nav styles
  return (
    <section className={cn('pt-8 pb-0', className)}>
      <div className="container mx-auto px-4 md:px-8">
        <nav
          className="flex justify-center flex-wrap mb-8"
          style={{ gap: '0.5rem' }}
        >
          {items.map((item, index) => {
            const url = getLinkUrl(item)
            const active = isItemActive(item)

            return (
              <Link
                key={index}
                href={url}
                className={cn(
                  'bg-shiro text-hai transition-all',
                  active && 'border-aka text-aka',
                )}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  border: active ? '1px solid #E8380D' : '1px solid rgba(0,0,0,0.1)',
                  color: active ? '#E8380D' : '#8B8B8B',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#E8380D'
                    e.currentTarget.style.color = '#E8380D'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    e.currentTarget.style.color = '#8B8B8B'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </section>
  )
}

export default PageNavBlock
