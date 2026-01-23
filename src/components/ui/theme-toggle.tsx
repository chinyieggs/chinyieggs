'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/Theme'
import { motion } from 'framer-motion'

/**
 * ThemeToggle - 深淺色主題切換按鈕
 *
 * 設計特點：
 * - 太陽/月亮圖標切換
 * - 圖標旋轉動畫（180度）
 * - 淡入淡出過渡效果
 */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10"
      aria-label={`切換到${isDark ? '淺色' : '深色'}模式`}
    >
      {/* 太陽圖標（淺色模式） */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.5 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5" />
      </motion.div>

      {/* 月亮圖標（深色模式） */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </Button>
  )
}
