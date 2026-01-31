export type Theme = 'light'

export interface ThemeContextType {
  theme: 'light'
}

export function themeIsValid(string: null | string): string is Theme {
  return string === 'light'
}
