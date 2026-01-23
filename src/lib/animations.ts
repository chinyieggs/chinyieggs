import { Variants } from 'framer-motion'

/**
 * Framer Motion 動畫變體庫
 * 提供常用的滾動觸發動畫效果
 */

// 從下往上淡入
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// 從右往左淡入
export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

// 從左往右淡入
export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

// 純淡入（無位移）
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// 縮放淡入
export const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

// 默認過渡配置（使用 ease-out 曲線，更自然）
export const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // cubic-bezier easing
}

// Stagger 容器變體（用於父元素，子元素會延遲動畫）
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}
