'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export interface ScrollToTopProps {
  /** 滾動超過多少像素後顯示按鈕（默認 300px） */
  showAfter?: number
  /** 按鈕位置（默認右側） */
  position?: 'right' | 'left'
}

/**
 * ScrollToTop - 返回頂部浮動按鈕
 *
 * 功能特點：
 * - 滾動超過設定距離後淡入顯示
 * - 點擊平滑滾動到頂部
 * - 圓形紅色按鈕設計
 * - Hover 效果（陰影加深）
 */
export const ScrollToTop = ({ showAfter = 300, position = 'right' }: ScrollToTopProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > showAfter)
    }

    // 初始化檢查
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-8 ${position === 'right' ? 'right-8' : 'left-8'} z-50`}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
            aria-label="返回頂部"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
