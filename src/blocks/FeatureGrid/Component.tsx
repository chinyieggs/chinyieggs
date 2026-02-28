'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { FeatureGridBlock as FeatureGridBlockType, Media as MediaType } from '@/payload-types'

type Props = FeatureGridBlockType & {
  className?: string
}

export const FeatureGridBlock: React.FC<Props> = ({
  items,
  className,
}) => {
  if (!items || items.length === 0) return null

  return (
    // Match static HTML: container > content-narrow > feature-grid
    <div className={cn('max-w-[1200px] mx-auto px-8', className)} style={{ marginBottom: '4rem' }}>
      <div className="max-w-[800px] mx-auto">
        {/* feature-grid: auto-fit columns min 250px, gap 2rem */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {items.map((item, index) => {
            const image = item.image as MediaType | undefined
            const imageUrl = image?.url || item.imageUrl

            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.06}>
                <div className="feature-card-item">
                  {/* feature-icon: 160px height */}
                  {imageUrl && (
                    <div className="feature-icon-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={item.title || ''}
                        className="feature-icon-img"
                      />
                    </div>
                  )}
                  {/* feature-title: serif, 1.125rem, padding 2rem 2rem 0 */}
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
                      fontSize: '1.125rem',
                      marginBottom: '1rem',
                      padding: '2rem 2rem 0',
                      color: '#3D3D3D',
                    }}
                  >
                    {item.title}
                  </h4>
                  {/* feature-text: 0.875rem, hai, padding 0 2rem 2rem */}
                  {item.description && (
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#6B6B6B',
                        lineHeight: 1.7,
                        padding: '0 2rem 2rem',
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .feature-card-item {
          padding: 0;
          background: #FFFFFF;
          border: none;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
          overflow: hidden;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
        }
        .feature-icon-wrapper {
          width: 100%;
          height: 160px;
          overflow: hidden;
          margin-bottom: 0;
        }
        .feature-icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .feature-card-item:hover .feature-icon-img {
          transform: scale(1.05);
        }
      ` }} />
    </div>
  )
}

export default FeatureGridBlock
