'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Header, Media } from '@/payload-types'

const navFont = "'Inter', sans-serif"

interface NavSection {
  title: string
  items: { label: string; href: string }[]
  featuredImage?: Media | null
}

interface JapaneseHeaderProps {
  data?: Header
  navSections?: NavSection[]
  logoText?: string
  logo?: Media | number | null
}

export const JapaneseHeader: React.FC<JapaneseHeaderProps> = ({
  data,
  navSections,
  logoText = 'CHINYI EGGS',
  logo,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Handle scroll effect — also close mega menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setActiveDropdown(null)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
    setLangOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [langOpen])

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

  // Dropdown hover handlers with delay
  const handleDropdownEnter = useCallback((index: number) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setActiveDropdown(index)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  // Cancel close timer when hovering mega panel
  const handleMegaPanelEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    }
  }, [])

  // Build nav sections from Payload data or use provided navSections
  const buildSectionsFromPayload = (): NavSection[] => {
    if (!data?.navItems || data.navItems.length === 0) {
      return []
    }

    return data.navItems.map((navItem) => {
      const link = navItem.link
      const title = link?.label || ''

      const items: { label: string; href: string }[] = []

      if (navItem.submenu && navItem.submenu.length > 0) {
        navItem.submenu.forEach((subItem) => {
          const subLink = subItem.link
          if (subLink) {
            const href = subLink.type === 'reference' && subLink.reference
              ? `/${(subLink.reference.value as { slug?: string })?.slug || ''}`
              : subLink.url || '/'
            items.push({
              label: subLink.label || '',
              href,
            })
          }
        })
      } else {
        const href = link?.type === 'reference' && link.reference
          ? `/${(link.reference.value as { slug?: string })?.slug || ''}`
          : link?.url || '/'
        items.push({
          label: link?.label || '',
          href,
        })
      }

      // Parse featuredImage
      const featuredImage =
        navItem.featuredImage && typeof navItem.featuredImage === 'object'
          ? (navItem.featuredImage as Media)
          : null

      return { title, items, featuredImage }
    })
  }

  const payloadSections = buildSectionsFromPayload()

  const sections: NavSection[] = payloadSections.length > 0 ? payloadSections : (navSections || [
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
  ])

  // Check if a section's items include the current path
  const isSectionActive = (section: NavSection) => {
    return section.items.some((item) => pathname === item.href)
  }

  // Get contact section for the top-right text link
  const contactSection = sections.find((s) => s.title?.toLowerCase() === 'contact')
  const contactHref = contactSection?.items[0]?.href || '/contact'

  // Nav sections excluding Contact (rendered separately)
  const navOnlySections = sections.filter((s) => s.title?.toLowerCase() !== 'contact')

  // The active section for mega menu
  const activeMegaSection = activeDropdown !== null ? navOnlySections[activeDropdown] : null

  return (
    <>
      {/* Fixed Header — Hermès-style dual row */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b',
          isScrolled
            ? 'bg-shiro/95 backdrop-blur-sm border-border'
            : 'bg-shiro border-border',
        )}
      >
        {/* ── Top Row: Language | Logo (center) | Contact ── */}
        <div className="relative flex items-center justify-between h-[56px] max-w-[1200px] mx-auto px-4 md:px-8">
          {/* Left — empty spacer for centering */}
          <div className="shrink-0" />

          {/* Center — Logo (absolute center) */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 group"
          >
            {logo && typeof logo === 'object' && logo.url ? (
              <Image
                src={getMediaUrl(logo.url)}
                alt={logo.alt || logoText}
                width={28}
                height={34}
                className="w-7 h-[34px] object-contain"
              />
            ) : (
              <div className="w-7 h-[34px] text-aka">
                <svg viewBox="0 0 32 40" className="w-full h-full fill-current">
                  <ellipse cx="16" cy="22" rx="12" ry="15" />
                </svg>
              </div>
            )}
            <span
              className="text-base tracking-[0.2em] text-sumi"
              style={{ fontFamily: "'Source Sans Pro', -apple-system, sans-serif" }}
            >
              {logoText}
            </span>
          </Link>

          {/* Right — Contact text link + Language Switcher (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            {contactSection && (
              <Link
                href={contactHref}
                className="hidden md:inline-block text-sm tracking-[0.15em] uppercase text-sumi hover:text-aka transition-colors mr-2"
                style={{ fontFamily: navFont, fontSize: '0.6875rem', fontWeight: 600 }}
              >
                Contact
              </Link>
            )}

            {/* Language Switcher */}
            <div className="relative flex items-center" ref={langRef}>
              <button
                className="flex items-center gap-1.5 text-sumi hover:text-aka transition-colors"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Switch language"
              >
                <Globe className="w-4 h-4" />
                <span
                  className="hidden md:inline text-xs tracking-[0.08em] uppercase"
                  style={{ fontFamily: navFont }}
                >
                  EN
                </span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border-t border-border py-2 min-w-[140px] z-[1002]">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-sumi hover:bg-kinari flex items-center gap-2 transition-colors"
                    style={{ fontFamily: navFont }}
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-aka" />
                    English
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-sumi hover:bg-kinari flex items-center gap-2 transition-colors"
                    style={{ fontFamily: navFont }}
                    onClick={() => { window.location.href = 'https://tw.chinyieggs.com' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                    繁體中文
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                'relative w-12 h-12 flex flex-col justify-center items-center md:hidden',
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

        {/* ── Bottom Row: Navigation (desktop only) — no dropdowns inside ── */}
        <nav className="hidden md:flex items-center justify-center h-[40px] max-w-[1200px] mx-auto px-8 gap-8">
          {navOnlySections.map((section, sectionIndex) => {
            const hasSubmenu = section.items.length > 1
            const singleHref = section.items[0]?.href

            if (!hasSubmenu) {
              return (
                <Link
                  key={section.title || `nav-${sectionIndex}`}
                  href={singleHref || '/'}
                  className={cn(
                    'relative py-2 text-sumi transition-colors',
                    isSectionActive(section) && 'border-b-2 border-sumi',
                  )}
                  style={{
                    fontFamily: navFont,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {section.title}
                </Link>
              )
            }

            return (
              <div
                key={section.title || `nav-${sectionIndex}`}
                onMouseEnter={() => handleDropdownEnter(sectionIndex)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    'relative py-2 text-sumi transition-colors',
                    (isSectionActive(section) || activeDropdown === sectionIndex)
                      && 'border-b-2 border-sumi',
                  )}
                  style={{
                    fontFamily: navFont,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {section.title}
                </button>
              </div>
            )
          })}
        </nav>

        {/* ── Mega Menu Panel (full-width, below header) ── */}
        <div
          className={cn(
            'absolute left-0 right-0 top-full bg-white border-t border-border transition-all duration-200 hidden md:block',
            activeDropdown !== null
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-1 pointer-events-none',
          )}
          onMouseEnter={handleMegaPanelEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {activeMegaSection && (
            <div className="max-w-[1200px] mx-auto px-8 py-10 flex gap-12">
              {/* Left — Featured Image */}
              <div className="w-[280px] shrink-0">
                {activeMegaSection.featuredImage &&
                  typeof activeMegaSection.featuredImage === 'object' &&
                  activeMegaSection.featuredImage.url ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getMediaUrl(activeMegaSection.featuredImage.url)}
                      alt={activeMegaSection.featuredImage.alt || activeMegaSection.title}
                      fill
                      className="object-cover"
                    />
                    {/* Bottom gradient caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <span
                        className="text-white text-xs tracking-[0.15em] uppercase"
                        style={{ fontFamily: navFont }}
                      >
                        {activeMegaSection.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-kinari flex items-center justify-center">
                    <span
                      className="text-hai text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: navFont }}
                    >
                      {activeMegaSection.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Right — Section title + link grid */}
              <div className="flex-1">
                <h4
                  className="mb-6 text-hai"
                  style={{
                    fontFamily: navFont,
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    fontStyle: 'normal',
                  }}
                >
                  {activeMegaSection.title}
                </h4>
                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                  {activeMegaSection.items.map((item, itemIndex) => (
                    <Link
                      key={item.href || `mega-${itemIndex}`}
                      href={item.href || '/'}
                      className={cn(
                        'text-sm transition-colors',
                        pathname === item.href
                          ? 'text-sumi border-b border-sumi inline-block'
                          : 'text-hai hover:text-sumi',
                      )}
                      style={{
                        fontFamily: navFont,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Full Screen Navigation Overlay - Mobile only */}
      <nav
        className={cn(
          'fixed inset-0 bg-shiro z-[1001] flex items-center justify-center md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 text-xs tracking-[0.15em] text-hai hover:text-aka transition-colors py-2 px-4 z-10 uppercase"
          style={{ fontFamily: navFont }}
        >
          CLOSE ✕
        </button>

        {/* Nav Content */}
        <div className="flex flex-col gap-8 px-8 w-full max-w-sm">
          {sections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`} className="text-center">
              <h3
                className="tracking-[0.2em] text-hai uppercase border-b border-border"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                  fontSize: '0.875rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                }}
              >
                {section.title}
              </h3>
              <ul className="list-none">
                {section.items.map((item, itemIndex) => (
                  <li key={item.href || `item-${sectionIndex}-${itemIndex}`} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      href={item.href || '/'}
                      className={cn(
                        'text-hai hover:text-sumi inline-block transition-colors uppercase tracking-[0.08em]',
                        pathname === item.href && 'text-sumi border-b border-sumi',
                      )}
                      style={{
                        fontFamily: navFont,
                        fontSize: '0.875rem',
                        fontWeight: 400,
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

        {/* Nav Footer - with safe bottom padding */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center pb-safe">
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
      <div className="h-24" />
    </>
  )
}

export default JapaneseHeader
