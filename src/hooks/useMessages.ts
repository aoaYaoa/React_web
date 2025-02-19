import { useState, useCallback } from 'react'

export interface Message {
  id: number
  title: string
  content: string
  time: string
  read: boolean
}

// 模拟消息数据
const mockMessages: Message[] = [
  {
    id: 1,
    title: '系统通知',
    content: '欢迎使用待办事项管理系统',
    time: '2024-03-10 10:00',
    read: false
  },
  {
    id: 2,
    title: '任务提醒',
    content: '你有一个待办事项即将到期',
    time: '2024-03-10 09:30',
    read: false
  },
  {
    id: 3,
    title: '系统更新',
    content: '系统将在今晚进行维护更新',
    time: '2024-03-09 18:00',
    read: true
  }
]

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const markAsRead = useCallback((id: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, read: true }))
    )
  }, [])

  return {
    messages,
    markAsRead,
    markAllAsRead
  }
} 