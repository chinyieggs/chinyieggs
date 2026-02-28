'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { CheckListBlock as CheckListBlockType } from '@/payload-types'

type Props = CheckListBlockType & {
  className?: string
}

const iconMap = {
  check: '✓',
  bullet: '•',
  star: '★',
}

export const CheckListBlock: React.FC<Props> = ({
  title,
  items,
  icon = 'check',
  columns = '1',
  className,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('bg-kinari py-12 md:py-section-sm', className)}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-[800px] mx-auto">
          {title && (
            <AnimatedSection animation="fade-up">
              <h3
                className="text-sumi mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif",
                  fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
                  fontWeight: 600,
                }}
              >
                {title}
                <span
                  style={{
                    display: 'block',
                    width: '40px',
                    height: '1px',
                    background: '#E8380D',
                    marginTop: '1rem',
                  }}
                />
              </h3>
            </AnimatedSection>
          )}

          <ul
            className={cn(
              'space-y-4',
              columns === '2' && 'md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-4 md:space-y-0',
            )}
          >
            {items.map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.06}>
                <li className="checklist-card flex items-start gap-4 px-6 py-5">
                  <span
                    className="flex-shrink-0 flex items-center justify-center text-white rounded-lg"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: '#E8380D',
                      fontSize: icon === 'bullet' ? '1.25rem' : '0.95rem',
                      fontFamily:
                        icon === 'number'
                          ? "'Cormorant Garamond', 'Noto Serif', serif"
                          : 'inherit',
                      fontWeight: icon === 'number' ? 700 : 500,
                      lineHeight: 1,
                    }}
                  >
                    {icon === 'number' ? index + 1 : iconMap[icon as keyof typeof iconMap]}
                  </span>
                  <span className="text-sumi leading-relaxed pt-2">{item.text}</span>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .checklist-card {
          background: #FFFFFF;
          border: none;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .checklist-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
        }
      `,
        }}
      />
    </section>
  )
}

export default CheckListBlock
