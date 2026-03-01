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
    <section className={cn('py-12 md:py-20 lg:py-[120px]', className)}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Section Header */}
          <div
            className={cn('mb-12', isCenter && 'text-center')}
          >
            {/* Label - small caps, tracking wide */}
            {label && (
              <p
                className="text-hai uppercase"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  marginBottom: '1.25rem',
                }}
              >
                {label}
              </p>
            )}

            {/* Title - serif italic, Hermès style */}
            {title && (
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: 'hsl(0 0% 8%)',
                  lineHeight: 1.3,
                  marginBottom: '1.25rem',
                }}
              >
                {title}
              </h2>
            )}

            {/* Divider - thin, subtle */}
            {showDivider && (
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: '#E5E2DB',
                  marginTop: '1.5rem',
                  ...(isCenter ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
                }}
              />
            )}
          </div>

          {/* Content — serif body text */}
          {content && (
            <div className={cn(isCenter && 'text-center')}>
              <RichText data={content} enableGutter={false} />
            </div>
          )}

          {/* CTA Button — Hermès underline link style */}
          {ctaLabel && ctaLink && (
            <div className={cn('mt-10', isCenter && 'text-center')}>
              <Link
                href={ctaLink}
                className="inline-block uppercase tracking-[0.15em] text-sumi border-b border-sumi pb-0.5 hover:text-aka hover:border-aka transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
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
