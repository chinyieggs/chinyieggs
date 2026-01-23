'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/utilities/ui'

interface BreadcrumbItemType {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItemType[]
  showHome?: boolean
  homeLabel?: string
  className?: string
}

// Map of slug to display label
const labelMap: Record<string, string> = {
  about: 'About Chinyi',
  milestones: 'Corporate Milestones',
  'quality-control': 'Quality Control',
  'factory-tour': 'Factory Tour',
  'egg-tart-liquid': 'Egg Tart Liquid',
  'chawanmushi-liquid': 'Chawanmushi Liquid',
  'pudding-liquid': 'Pudding Liquid',
  'omelette-liquid': 'Omelette Liquid',
  'hydrolyzed-eggshell-membrane': 'Eggshell Membrane',
  'eggshell-calcium': 'Eggshell Calcium',
  'egg-yolk-lecithin': 'Egg Yolk Lecithin',
  'lysozyme': 'Lysozyme',
  'immunoglobulin': 'Immunoglobulin',
  'egg-white-products': 'Egg White Products',
  contact: 'Contact',
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  homeLabel = 'Home',
  className,
}) => {
  const pathname = usePathname()

  // Generate breadcrumb items from pathname if not provided
  const generateItemsFromPath = (): BreadcrumbItemType[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const result: BreadcrumbItemType[] = []

    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const label = labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

      result.push({
        label,
        href: index < pathSegments.length - 1 ? href : undefined, // Last item has no href
      })
    })

    return result
  }

  const breadcrumbItems = items || generateItemsFromPath()
  const isHomePage = pathname === '/'

  // Match static HTML: .breadcrumb { padding: 1rem 0; border-bottom: 1px solid border; margin-top: 80px; }
  // .breadcrumb-list { font-size: 0.75rem; gap: 0.5rem; color: hai; }
  return (
    <div
      className={cn('border-b border-border', className)}
      style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div
          className="flex items-center text-hai"
          style={{ gap: '0.5rem', fontSize: '0.75rem' }}
        >
          {showHome && (
            <>
              {isHomePage ? (
                <span className="text-sumi">{homeLabel}</span>
              ) : (
                <Link href="/" className="hover:text-aka transition-colors">
                  {homeLabel}
                </Link>
              )}
              {breadcrumbItems.length > 0 && (
                <span style={{ color: '#D0CCC4' }}>›</span>
              )}
            </>
          )}

          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.href ? (
                <Link href={item.href} className="hover:text-aka transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sumi">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <span style={{ color: '#D0CCC4' }}>›</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
