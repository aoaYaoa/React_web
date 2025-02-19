import React, { createContext, useState } from 'react'
import type { ThemeConfig } from 'antd'
import defaultTheme from '../theme/themeConfig'

interface ThemeContextType {
  theme: ThemeConfig
  updateTheme: (newTheme: Partial<ThemeConfig>) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme(prev => ({
      ...prev,
      ...newTheme,
      token: {
        ...prev.token,
        ...newTheme.token
      },
      components: {
        ...prev.components,
        ...newTheme.components
      }
    }))
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
} 