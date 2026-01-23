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

export interface AnimatedBlockProps {
  children: ReactNode
  /** 動畫類型 */
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in'
  /** 延遲時間（秒） */
  delay?: number
  /** 動畫持續時間（秒） */
  duration?: number
  /** 額外的 className */
  className?: string
}

/**
 * AnimatedBlock - 專門用於包裝區塊的滾動觸發動畫元件
 *
 * 這是一個 client component，可以安全地包裝 server component 區塊
 */
export const AnimatedBlock = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = defaultTransition.duration,
  className = '',
}: AnimatedBlockProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

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
