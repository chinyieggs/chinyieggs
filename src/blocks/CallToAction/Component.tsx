import React from 'react'
import Link from 'next/link'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-8">
      <div className="max-w-[800px] mx-auto">
        {/* CTA Section - matching static HTML .cta-section */}
        <div
          className="text-center"
          style={{
            padding: '6rem',
            background: '#F5F3EE',
            border: '1px solid #E5E2DB',
          }}
        >
          {/* RichText content - title and description */}
          {richText && (
            <div className="cta-content">
              <RichText
                className="mb-0 [&_h3]:text-sumi [&_h3]:mb-4 [&_h3]:font-serif [&_h3]:text-2xl [&_p]:text-hai [&_p]:mb-0"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}

          {/* CTA Buttons */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {links.map(({ link }, i) => {
                const href = link?.url || (link?.reference?.value as { slug?: string })?.slug || '/'
                const label = link?.label || 'Learn More'
                const isPrimary = link?.appearance === 'default' || i === 0

                return (
                  <Link
                    key={i}
                    href={href}
                    className={
                      isPrimary
                        ? 'inline-block px-8 py-4 bg-aka border border-aka text-white hover:bg-aka-dark hover:border-aka-dark transition-all'
                        : 'inline-block px-8 py-4 border border-sumi text-sumi hover:bg-sumi hover:text-shiro transition-all'
                    }
                    style={{
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
