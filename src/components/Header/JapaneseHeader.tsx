'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import type { Header } from '@/payload-types'

interface NavSection {
  title: string
  items: { label: string; href: string }[]
}

interface JapaneseHeaderProps {
  data?: Header
  navSections?: NavSection[]
  logoText?: string
}

export const JapaneseHeader: React.FC<JapaneseHeaderProps> = ({
  data: _data,
  navSections,
  logoText = 'CHINYI EGGS',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Build nav sections from Payload data or use provided navSections
  const sections: NavSection[] = navSections || [
    {
      title: 'Company',
      items: [
        { label: 'About Chinyi', href: '/about' },
        { label: 'Corporate Milestones', href: '/milestones' },
        { label: 'Quality Control', href: '/quality-control' },
        { label: 'Factory Tour', href: '/factory-tour' },
      ],
    },
    {
      title: 'Products',
      items: [
        { label: 'Prepared Egg Liquid', href: '/egg-tart-liquid' },
        { label: 'Biotech Ingredients', href: '/hydrolyzed-eggshell-membrane' },
        { label: 'High-Protein Foods', href: '/egg-white-products' },
      ],
    },
    {
      title: 'Contact',
      items: [{ label: 'Get in Touch', href: '/contact' }],
    },
  ]

  return (
    <>
      {/* Fixed Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] h-20 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-shiro border-border'
            : 'bg-shiro border-border',
        )}
      >
        <div className="flex items-center justify-between h-full max-w-[1200px] mx-auto px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-10 text-aka">
              <svg viewBox="0 0 32 40" className="w-full h-full fill-current">
                <ellipse cx="16" cy="22" rx="12" ry="15" />
              </svg>
            </div>
            <span
              className="text-lg tracking-[0.15em] text-sumi"
              style={{ fontFamily: "'Source Sans Pro', -apple-system, sans-serif" }}
            >
              {logoText}
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-8">
            {/* Menu Toggle - 48x48px with 6px gap, 1px lines */}
            <button
              className={cn(
                'relative w-12 h-12 flex flex-col justify-center items-center',
                'hover:[&>span]:bg-aka',
              )}
              style={{ gap: '6px' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'block w-6 bg-sumi transition-all duration-400 origin-center',
                  isOpen ? 'rotate-45 translate-y-[7px]' : '',
                )}
                style={{ height: '1px' }}
              />
              <span
                className={cn(
                  'block w-6 bg-sumi transition-all duration-400',
                  isOpen ? 'opacity-0' : '',
                )}
                style={{ height: '1px' }}
              />
              <span
                className={cn(
                  'block w-6 bg-sumi transition-all duration-400 origin-center',
                  isOpen ? '-rotate-45 -translate-y-[7px]' : '',
                )}
                style={{ height: '1px' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Navigation Overlay */}
      <nav
        className={cn(
          'fixed inset-0 bg-shiro z-[1001] flex items-center justify-center',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 text-xs tracking-[0.15em] text-hai hover:text-aka transition-colors py-2 px-4 z-10"
          style={{ fontFamily: "'Noto Sans JP', 'Noto Sans TC', sans-serif" }}
        >
          CLOSE ✕
        </button>

        {/* Nav Content - 3 Column Grid, gap: 6rem, padding: 6rem */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 max-w-[900px]"
          style={{ gap: '6rem', padding: '6rem' }}
        >
          {sections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`} className="md:text-left text-center">
              <h3
                className="tracking-[0.2em] text-hai uppercase border-b border-border"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                  fontSize: '0.875rem',
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                }}
              >
                {section.title}
              </h3>
              <ul className="list-none">
                {section.items.map((item, itemIndex) => (
                  <li key={item.href || `item-${sectionIndex}-${itemIndex}`} style={{ marginBottom: '0.75rem' }}>
                    <Link
                      href={item.href || '/'}
                      className={cn(
                        'text-hai hover:text-aka inline-block',
                        pathname === item.href && 'text-aka',
                      )}
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nav Footer */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center">
          <div
            className="flex items-center gap-4 text-xs tracking-[0.3em] text-hai-light"
            style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif', serif" }}
          >
            <span className="w-10 h-px bg-border" />
            {logoText}
            <span className="w-10 h-px bg-border" />
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" />
    </>
  )
}

export default JapaneseHeader
