'use client'

import React, { createContext, useCallback, use, useState } from 'react'

export interface ContextType {
  headerTheme?: 'light' | null
  setHeaderTheme: (theme: 'light' | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<'light' | undefined | null>('light')

  const setHeaderTheme = useCallback((themeToSet: 'light' | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
