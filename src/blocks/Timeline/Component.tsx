'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimatedSection } from '@/components/AnimatedSection'
import RichText from '@/components/RichText'
import type { TimelineBlock as TimelineBlockType } from '@/payload-types'

type Props = TimelineBlockType & {
  className?: string
}

export const TimelineBlock: React.FC<Props> = ({
  items,
  className,
}) => {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('max-w-[1200px] mx-auto px-8', className)}>
      <div className="max-w-[800px] mx-auto">
        {/* Timeline - matching static HTML */}
        <div
          className="relative"
          style={{ paddingLeft: 0 }}
        >
          {/* Vertical line - centered on desktop, left on mobile */}
          <div
            className="absolute top-0 bottom-0 hidden md:block"
            style={{
              left: '50%',
              width: '1px',
              background: '#E5E2DB',
              transform: 'translateX(-50%)',
            }}
          />
          <div
            className="absolute top-0 bottom-0 md:hidden"
            style={{
              left: '20px',
              width: '1px',
              background: '#E5E2DB',
            }}
          />

          {/* Timeline Items */}
          <div>
            {items.map((item, index) => {
              // 交替動畫：偶數從右，奇數從左
              const animation = index % 2 === 0 ? 'fade-right' : 'fade-left'

              return (
                <AnimatedSection
                  key={index}
                  animation={animation}
                  delay={index * 0.15}
                >
                  <div
                    className="timeline-item"
                    style={{ marginBottom: '4rem' }}
                  >
                    {/* Desktop: 3-column grid */}
                    <div
                      className="hidden md:grid items-center"
                      style={{
                        gridTemplateColumns: '1fr auto 1fr',
                        gap: '2rem',
                      }}
                    >
                      {/* Year - left side, right aligned */}
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
                          fontSize: '1.25rem',
                          color: '#E8380D',
                          textAlign: 'right',
                        }}
                      >
                        {item.year}
                      </div>

                      {/* Dot - center */}
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: '#FAFAF8',
                          border: '2px solid #E8380D',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />

                      {/* Content - right side */}
                      <div style={{ paddingLeft: '1rem' }}>
                        <h4
                          style={{
                            fontFamily: "'Noto Sans JP', 'Noto Sans TC', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 500,
                            marginBottom: '0.25rem',
                            color: '#3D3D3D',
                          }}
                        >
                          {item.title}
                        </h4>
                        {item.description && (
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: '#6B6B6B',
                              marginBottom: 0,
                            }}
                          >
                            <RichText data={item.description} enableGutter={false} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile: 2-column grid */}
                    <div
                      className="md:hidden grid"
                      style={{
                        gridTemplateColumns: 'auto 1fr',
                        gap: '1rem',
                      }}
                    >
                      {/* Dot - spans 2 rows */}
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: '#FAFAF8',
                          border: '2px solid #E8380D',
                          position: 'relative',
                          zIndex: 1,
                          gridRow: '1 / 3',
                          gridColumn: 1,
                          marginLeft: '14px',
                          marginTop: '4px',
                        }}
                      />

                      {/* Year */}
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
                          fontSize: '1rem',
                          color: '#E8380D',
                          gridRow: 1,
                          gridColumn: 2,
                        }}
                      >
                        {item.year}
                      </div>

                      {/* Content */}
                      <div style={{ gridColumn: 2 }}>
                        <h4
                          style={{
                            fontFamily: "'Noto Sans JP', 'Noto Sans TC', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 500,
                            marginBottom: '0.25rem',
                            color: '#3D3D3D',
                          }}
                        >
                          {item.title}
                        </h4>
                        {item.description && (
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: '#6B6B6B',
                              marginBottom: 0,
                            }}
                          >
                            <RichText data={item.description} enableGutter={false} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineBlock
