'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { AnimatedSection } from '@/components/AnimatedSection'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {richText && (
          <AnimatedSection animation="fade-up" delay={0}>
            <RichText className="mb-6" data={richText} enableGutter={false} />
          </AnimatedSection>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <AnimatedSection animation="fade-up" delay={0.15}>
            <ul className="flex gap-4">
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
      <div className="container ">
        {media && typeof media === 'object' && (
          <AnimatedSection animation="zoom-in" delay={0.2}>
            <div>
              <Media
                className="-mx-4 md:-mx-8 2xl:-mx-16"
                imgClassName=""
                priority
                resource={media}
              />
              {media?.caption && (
                <div className="mt-3">
                  <RichText data={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
