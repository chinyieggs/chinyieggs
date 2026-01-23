'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import {
  fadeUpVariants,
  fadeLeftVariants,
  fadeRightVariants,
  fadeInVariants,
  zoomInVariants,
  defaultTransition,
} from '@/lib/animations'

export interface AnimatedSectionProps {
  children: ReactNode
  /** 動畫類型 */
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in'
  /** 延遲時間（秒） */
  delay?: number
  /** 動畫持續時間（秒） */
  duration?: number
  /** 自訂 className */
  className?: string
  /** 提前觸發動畫的距離（像素），負值表示元素還未進入視口就觸發 */
  margin?: string
}

/**
 * AnimatedSection - 滾動觸發動畫包裝器
 *
 * 使用方式：
 * ```tsx
 * <AnimatedSection animation="fade-up" delay={0.2}>
 *   <div>內容會在滾動到視口時淡入</div>
 * </AnimatedSection>
 * ```
 *
 * @example
 * // Stagger 效果（多個元素依序動畫）
 * {items.map((item, index) => (
 *   <AnimatedSection key={item.id} animation="fade-up" delay={index * 0.1}>
 *     <Card>{item.title}</Card>
 *   </AnimatedSection>
 * ))}
 */
export const AnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = defaultTransition.duration,
  className = '',
  margin = '-100px',
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true, // 動畫只執行一次
    margin: margin as `${number}px ${number}px ${number}px ${number}px`, // 提前觸發動畫
  })

  // 根據動畫類型選擇對應的變體
  const variantsMap = {
    'fade-up': fadeUpVariants,
    'fade-left': fadeLeftVariants,
    'fade-right': fadeRightVariants,
    'fade-in': fadeInVariants,
    'zoom-in': zoomInVariants,
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variantsMap[animation]}
      transition={{
        ...defaultTransition,
        duration,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
