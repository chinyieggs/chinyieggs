'use client'

import Link from 'next/link'
import React from 'react'
import { cn } from '@/utilities/ui'
import type { Footer } from '@/payload-types'

interface FooterLink {
  id?: string
  label: string
  href: string
}

interface JapaneseFooterProps {
  data?: Footer
  companyName?: string
  navLinks?: FooterLink[]
  address?: string
  phone?: string
  fax?: string
  certifications?: string[]
  copyright?: string
  className?: string
}

export const JapaneseFooter: React.FC<JapaneseFooterProps> = ({
  data: _data,
  companyName = 'CHINYI EGGS TECHNOLOGY',
  navLinks,
  address = 'No. 37, Xinmin Road, Chiayi City, Taiwan',
  phone = '05-2354049',
  fax,
  certifications = ['HACCP', 'ISO 22000', 'CAS', 'HALAL'],
  copyright,
  className,
}) => {
  const currentYear = new Date().getFullYear()
  const defaultCopyright = `© ${currentYear} Chinyi Eggs Technology Co., Ltd. All Rights Reserved.`

  const defaultNavLinks: FooterLink[] = navLinks || [
    { label: 'Company', href: '/about' },
    { label: 'Products', href: '/egg-tart-liquid' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer
      className={cn(className)}
      style={{
        background: '#3D3D3D',
        color: '#FAFAF8',
        padding: '2rem 2rem 1rem',
      }}
    >
      {/* Footer Inner - flex wrap, justify-between, gap 1rem */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
            fontSize: '1rem',
            letterSpacing: '0.3em',
            marginBottom: 0,
          }}
        >
          {companyName}
        </div>

        {/* Divider - hidden in original CSS */}
        <div style={{ display: 'none' }} />

        {/* Navigation - flex-col on mobile, row on desktop */}
        <nav className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 flex-wrap mb-0">
          {defaultNavLinks.map((link, index) => (
            <Link
              key={link.id || `footer-nav-${index}`}
              href={link.href}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FAFAF8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          {address}
          <br />
          Tel: {phone}
          {fax && <span> | Fax: {fax}</span>}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: 0,
            }}
          >
            {certifications.map((cert) => (
              <span
                key={cert}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Footer Bottom - Copyright */}
        <div
          style={{
            width: '100%',
            paddingTop: '1rem',
            marginTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
          }}
        >
          {copyright || defaultCopyright}
        </div>
      </div>
    </footer>
  )
}

export default JapaneseFooter
