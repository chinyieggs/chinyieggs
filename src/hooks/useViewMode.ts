'use client'

import { useState, useEffect } from 'react'

export type ViewMode = 'grid' | 'list'

const STORAGE_KEY = 'post-view-mode'

/**
 * useViewMode - 管理文章列表的視圖模式（網格/列表）
 *
 * 功能特點：
 * - 支援網格和列表兩種視圖模式
 * - 使用 localStorage 持久化用戶選擇
 * - 提供切換和設置視圖模式的方法
 *
 * @param initialView 初始視圖模式（默認為網格）
 * @returns {viewMode, setViewMode} 當前視圖模式和設置函數
 *
 * @example
 * ```tsx
 * const { viewMode, setViewMode } = useViewMode('grid')
 *
 * // 切換視圖
 * <button onClick={() => setViewMode('list')}>列表視圖</button>
 * ```
 */
export const useViewMode = (initialView: ViewMode = 'grid') => {
  const [viewMode, setViewModeState] = useState<ViewMode>(initialView)

  // 從 localStorage 讀取用戶之前的選擇
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'grid' || stored === 'list') {
      setViewModeState(stored)
    }
  }, [])

  // 設置視圖模式並持久化到 localStorage
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }

  return { viewMode, setViewMode }
}
