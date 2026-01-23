'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { ProductGridBlock as ProductGridBlockType, Media as MediaType } from '@/payload-types'

type Props = ProductGridBlockType & {
  className?: string
}

const columnClasses = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export const ProductGridBlock: React.FC<Props> = ({
  sectionLabel,
  sectionTitle,
  items,
  columns = '3',
  className,
}) => {
  if (!items || items.length === 0) return null

  const columnClass = columnClasses[columns as keyof typeof columnClasses] || columnClasses['3']

  return (
    <section className={cn('py-section-sm md:py-section bg-shiro', className)}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        {(sectionLabel || sectionTitle) && (
          <div className="text-center mb-12 md:mb-16">
            {sectionLabel && (
              <p className="text-sm tracking-[0.3em] text-hai uppercase mb-3">
                {sectionLabel}
              </p>
            )}
            {sectionTitle && (
              <h2 className="font-serif text-3xl md:text-4xl text-sumi mb-4">
                {sectionTitle}
              </h2>
            )}
            <Separator className="w-16 mx-auto bg-aka" />
          </div>
        )}

        {/* Product Grid */}
        <div className={cn('grid gap-8', columnClass)}>
          {items.map((item, index) => {
            const image = item.image as MediaType | undefined
            const imageUrl = image?.url || item.imageUrl
            const linkUrl = item.productLink?.url || (item.productLink?.reference?.value as { slug?: string })?.slug

            const CardContent = (
              <div className="group bg-kinari overflow-hidden transition-shadow hover:shadow-lg">
                {/* Image */}
                {imageUrl && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {image ? (
                      <Media
                        resource={image}
                        fill
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {item.title && (
                    <h3 className="font-serif text-xl md:text-2xl text-sumi mb-1">
                      {item.title}
                    </h3>
                  )}
                  {item.subtitle && (
                    <p className="text-sm text-hai mb-3">{item.subtitle}</p>
                  )}
                  <Separator className="w-8 bg-aka/50 mb-4" />
                  {item.description && (
                    <p className="text-sm text-hai leading-relaxed mb-4">
                      {item.description}
                    </p>
                  )}
                  <span className="text-sm text-aka group-hover:text-aka-dark transition-colors">
                    View Products →
                  </span>
                </div>
              </div>
            )

            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                {linkUrl ? (
                  <Link href={linkUrl} className="block">
                    {CardContent}
                  </Link>
                ) : (
                  <div>{CardContent}</div>
                )}
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductGridBlock
