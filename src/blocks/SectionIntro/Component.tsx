import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { SectionIntroBlock as SectionIntroBlockType } from '@/payload-types'

type Props = SectionIntroBlockType & {
  className?: string
}

export const SectionIntroBlock: React.FC<Props> = ({
  label,
  title,
  content,
  showDivider = true,
  ctaLabel,
  ctaLink,
  textAlign = 'center',
  className,
}) => {
  const isCenter = textAlign === 'center'

  return (
    <section className={cn('py-[120px]', className)}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Section Header */}
          <div
            className={cn('mb-12', isCenter && 'text-center')}
          >
            {/* Label - 0.75rem, letter-spacing 0.3em, uppercase, aka color */}
            {label && (
              <p
                className="text-aka uppercase"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  marginBottom: '1rem',
                }}
              >
                {label}
              </p>
            )}

            {/* Title - serif font, clamp size */}
            {title && (
              <h2
                className="text-sumi"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                {title}
              </h2>
            )}

            {/* Divider - 40px, 1px, aka color */}
            {showDivider && (
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: '#E8380D',
                  marginTop: '2rem',
                  ...(isCenter ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
                }}
              />
            )}
          </div>

          {/* Content */}
          {content && (
            <div className={cn(isCenter && 'text-center')}>
              <RichText data={content} enableGutter={false} />
            </div>
          )}

          {/* CTA Button */}
          {ctaLabel && ctaLink && (
            <div className={cn('mt-8', isCenter && 'text-center')}>
              <Link
                href={ctaLink}
                className="inline-block px-8 py-3 border border-sumi text-sumi hover:bg-sumi hover:text-shiro transition-all"
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SectionIntroBlock
