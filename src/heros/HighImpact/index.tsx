'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { AnimatedSection } from '@/components/AnimatedSection'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  const hasLinks = Array.isArray(links) && links.length > 0

  return (
    <div className="relative -mt-[10.4rem] text-white md:min-h-[50vh] bg-gray-900 md:bg-transparent">
      {/* Image: natural flow, determines block height */}
      <div className="w-full select-none">
        {media && typeof media === 'object' && (
          <Media
            className="w-full"
            imgClassName="w-full h-auto block md:min-h-[60vh] md:object-cover"
            priority
            resource={media}
          />
        )}
      </div>
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none" />
      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mb-8 px-6 md:px-8">
          <div className="max-w-[36.5rem] md:text-center mx-auto">
            {richText && (
              <AnimatedSection animation="fade-up" delay={0}>
                <RichText className="mb-6" data={richText} enableGutter={false} />
              </AnimatedSection>
            )}
            <AnimatedSection animation="fade-up" delay={0.1}>
              {hasLinks ? (
                <ul className="flex flex-wrap md:justify-center gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="flex flex-wrap md:justify-center gap-4">
                  <Link
                    href="/egg-tart-liquid"
                    className="inline-flex items-center px-8 py-3.5 bg-aka text-white text-sm tracking-[0.08em] hover:bg-aka-dark transition-colors"
                  >
                    Explore Our Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-3.5 border border-white/80 text-white text-sm tracking-[0.08em] hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
