'use client'

import React, { createContext, use, useEffect } from 'react'

interface ThemeContextType {
  theme: 'light'
}

const initialContext: ThemeContextType = {
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return <ThemeContext value={{ theme: 'light' }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
