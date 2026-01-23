'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { StatsGridBlock as StatsGridBlockType } from '@/payload-types'

type Props = StatsGridBlockType & {
  className?: string
}

const bgClasses = {
  kinari: 'bg-kinari',
  shiro: 'bg-shiro',
  sumi: 'bg-sumi',
}

const textClasses = {
  kinari: 'text-sumi',
  shiro: 'text-sumi',
  sumi: 'text-shiro',
}

const columnClasses = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
}

export const StatsGridBlock: React.FC<Props> = ({
  items,
  backgroundColor = 'kinari',
  columns = '4',
  className,
}) => {
  if (!items || items.length === 0) return null

  const bgClass = bgClasses[backgroundColor as keyof typeof bgClasses] || bgClasses.kinari
  const textClass = textClasses[backgroundColor as keyof typeof textClasses] || textClasses.kinari
  const columnClass = columnClasses[columns as keyof typeof columnClasses] || columnClasses['4']

  return (
    <section className={cn('py-section-sm md:py-section', bgClass, className)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={cn('grid gap-8 md:gap-12', columnClass)}>
          {items.map((item, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
              <div className="text-center">
                {/* Number */}
                <div
                  className={cn(
                    'font-serif text-4xl md:text-5xl lg:text-6xl tracking-wider mb-2',
                    backgroundColor === 'sumi' ? 'text-aka-light' : 'text-aka',
                  )}
                >
                  {item.number}
                </div>

                {/* Label */}
                <div
                  className={cn(
                    'text-sm md:text-base tracking-widest uppercase',
                    textClass,
                  )}
                >
                  {item.label}
                  {item.suffix && (
                    <span className="block text-xs mt-1 opacity-70">
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* Underline */}
                <div
                  className={cn(
                    'w-12 h-px mx-auto mt-4',
                    backgroundColor === 'sumi' ? 'bg-shiro/30' : 'bg-sumi/20',
                  )}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsGridBlock
