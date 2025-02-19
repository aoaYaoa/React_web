import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
} 