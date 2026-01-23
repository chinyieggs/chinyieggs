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

  // Format certification name with line breaks (e.g., "ISO 22000" -> "ISO<br>22000")
  const formatCertName = (name: string) => {
    // Split on space and join with <br>
    const parts = name.split(' ')
    if (parts.length > 1) {
      return parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    return name
  }

  return (
    <section className={cn('py-[120px]', className)}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Section Header - matching static HTML */}
          {(sectionLabel || sectionTitle) && (
            <div className="text-center mb-12">
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
            <p className="text-center text-hai leading-relaxed mb-8">
              {description}
            </p>
          )}

          {/* Certification Grid - matching static HTML .cert-grid */}
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: '2rem' }}
          >
            {items.map((item, index) => {
              const icon = item.icon as MediaType | undefined

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-hai hover:text-aka hover:border-aka transition-all cursor-default"
                  style={{
                    width: '60px',
                    height: '80px',
                    border: '1px solid #E5E2DB',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    padding: '0.5rem',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}
                >
                  {icon ? (
                    <div className="relative w-8 h-8 mb-1">
                      <Media resource={icon} fill imgClassName="object-contain" />
                    </div>
                  ) : null}
                  <span>{formatCertName(item.name || '')}</span>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Link
              href="/quality-control"
              className="inline-block px-8 py-4 border border-sumi text-sumi hover:bg-sumi hover:text-shiro transition-all"
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
              }}
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
