'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export interface HeroProps {
  /** 主標題 */
  title: string
  /** 副標題（可選） */
  subtitle?: string
  /** 描述文字（可選） */
  description?: string
  /** CTA 按鈕列表（可選） */
  ctaButtons?: Array<{
    text: string
    href: string
    variant?: 'default' | 'secondary' | 'outline'
  }>
  /** 背景圖片（可選） */
  backgroundImage?: MediaType | string
  /** 文字對齊方式（默認居中） */
  alignment?: 'left' | 'center'
}

/**
 * Hero - 首頁主視覺區塊
 *
 * 功能特點：
 * - 標題、副標題、描述依序動畫（stagger 效果）
 * - 支援 CTA 按鈕（主按鈕紅色，次要按鈕白底）
 * - 可選背景圖片 + 漸層遮罩
 * - 響應式設計
 *
 * @example
 * ```tsx
 * <Hero
 *   title="歡迎來到我們的網站"
 *   subtitle="探索精彩內容"
 *   description="這是一個簡潔優雅的網站"
 *   ctaButtons={[
 *     { text: '查看文章', href: '/posts', variant: 'default' },
 *     { text: '了解更多', href: '/about', variant: 'secondary' },
 *   ]}
 *   alignment="center"
 * />
 * ```
 */
export const Hero = ({
  title,
  subtitle,
  description,
  ctaButtons,
  backgroundImage,
  alignment = 'center',
}: HeroProps) => {
  const isCenter = alignment === 'center'

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
      {/* 背景圖片 */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {typeof backgroundImage === 'object' && (
            <Media resource={backgroundImage} fill imgClassName="object-cover" priority />
          )}
          {/* 漸層遮罩（確保文字可讀） */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        </div>
      )}

      {/* 內容 */}
      <div
        className={`container relative z-10 ${isCenter ? 'text-center' : 'text-left'}`}
      >
        <div className={`max-w-4xl ${isCenter ? 'mx-auto' : ''}`}>
          {/* 標題 */}
          <AnimatedSection animation="fade-up" delay={0}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
          </AnimatedSection>

          {/* 副標題 */}
          {subtitle && (
            <AnimatedSection animation="fade-up" delay={0.15}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
                {subtitle}
              </p>
            </AnimatedSection>
          )}

          {/* 描述 */}
          {description && (
            <AnimatedSection animation="fade-up" delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {description}
              </p>
            </AnimatedSection>
          )}

          {/* CTA 按鈕 */}
          {ctaButtons && ctaButtons.length > 0 && (
            <AnimatedSection animation="fade-up" delay={0.4}>
              <div
                className={`flex flex-wrap gap-4 ${isCenter ? 'justify-center' : 'justify-start'}`}
              >
                {ctaButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || 'default'}
                    size="lg"
                    asChild
                  >
                    <Link href={button.href}>{button.text}</Link>
                  </Button>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  )
}
