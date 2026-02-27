'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { AnimatedSection } from '@/components/AnimatedSection'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="relative -mt-[10.4rem] text-white">
      {/* Image: natural flow, determines block height */}
      <div className="w-full select-none">
        {media && typeof media === 'object' && (
          <Media
            className="w-full"
            imgClassName="w-full h-auto block"
            priority
            resource={media}
          />
        )}
      </div>
      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mb-8">
          <div className="max-w-[36.5rem] md:text-center mx-auto">
            {richText && (
              <AnimatedSection animation="fade-up" delay={0}>
                <RichText className="mb-6" data={richText} enableGutter={false} />
              </AnimatedSection>
            )}
            {Array.isArray(links) && links.length > 0 && (
              <AnimatedSection animation="fade-up" delay={0.2}>
                <ul className="flex md:justify-center gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  })}
                </ul>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
