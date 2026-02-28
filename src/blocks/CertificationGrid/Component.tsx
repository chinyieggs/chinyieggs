import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { CertificationGridBlock as CertificationGridBlockType, Media as MediaType } from '@/payload-types'

type Props = CertificationGridBlockType & {
  className?: string
}

export const CertificationGridBlock: React.FC<Props> = ({
  sectionLabel,
  sectionTitle,
  description,
  items,
  className,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('py-12 md:py-20 lg:py-[120px]', className)}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          {/* Section Header */}
          {(sectionLabel || sectionTitle) && (
            <div className="text-center mb-10 md:mb-12">
              {sectionLabel && (
                <p
                  className="text-aka uppercase"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    marginBottom: '1rem',
                  }}
                >
                  {sectionLabel}
                </p>
              )}
              {sectionTitle && (
                <h2
                  className="text-sumi"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {sectionTitle}
                </h2>
              )}
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: '#E8380D',
                  margin: '2rem auto 0',
                }}
              />
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-center text-hai leading-relaxed mb-10">
              {description}
            </p>
          )}

          {/* Certification Grid - upgraded badge cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, index) => {
              const icon = item.icon as MediaType | undefined

              return (
                <div
                  key={index}
                  className="group flex flex-col items-center justify-center text-center p-6 md:p-8 border border-border bg-kinari/50 hover:border-aka/40 hover:bg-aka-pale transition-all duration-300 cursor-default"
                >
                  {icon ? (
                    <div className="relative w-10 h-10 md:w-12 md:h-12 mb-3">
                      <Media resource={icon} fill imgClassName="object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-aka/60 group-hover:text-aka transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <span
                    className="text-sumi group-hover:text-aka-dark font-semibold tracking-[0.08em] transition-colors"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    {item.name}
                  </span>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link
              href="/quality-control"
              className="inline-flex items-center px-8 py-3.5 border border-sumi text-sumi text-sm tracking-[0.08em] hover:bg-sumi hover:text-shiro transition-all"
            >
              Quality Control →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificationGridBlock
