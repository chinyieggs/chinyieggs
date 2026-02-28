import React from 'react'
import Link from 'next/link'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8">
      <div className="max-w-[800px] mx-auto">
        {/* CTA Section */}
        <div
          className="text-center px-6 py-12 md:p-16 lg:p-24 bg-kinari border border-border"
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
                        ? 'inline-flex items-center px-8 py-3.5 bg-aka border border-aka text-white text-sm tracking-[0.08em] hover:bg-aka-dark hover:border-aka-dark transition-all'
                        : 'inline-flex items-center px-8 py-3.5 border border-sumi text-sumi text-sm tracking-[0.08em] hover:bg-sumi hover:text-shiro transition-all'
                    }
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
