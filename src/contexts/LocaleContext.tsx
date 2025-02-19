import React, { createContext, useState } from 'react'
import { LocaleType, messages } from '../locales'

type MessagesType = typeof messages.zh_CN
type LocaleMessages = typeof messages

interface LocaleContextType {
  locale: LocaleType
  messages: MessagesType
  changeLocale: (locale: LocaleType) => void
}

export const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<LocaleType>('zh_CN')

  const getMessages = (loc: LocaleType): MessagesType => {
    return messages[loc as keyof LocaleMessages]
  }

  return (
    <LocaleContext.Provider 
      value={{ 
        locale, 
        messages: getMessages(locale),
        changeLocale: setLocale
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
} 