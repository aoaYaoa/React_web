/**
 * 顶部导航栏组件
 * 包含菜单折叠、用户信息、主题切换等功能
 */
import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Badge, Button, theme, Popover, List, Typography, Space, Select, Tooltip } from 'antd'
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BellOutlined,
  TranslationOutlined,
  GithubOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useFullscreen } from '../../hooks/useFullscreen'
import { Message, useMessages } from '../../hooks/useMessages'
import { useLocale } from '../../hooks/useLocale'
import { SUPPORTED_LOCALES } from '../../locales'
import { ThemeSwitch } from './ThemeSwitch'
import { UserDropdown } from './UserDropdown'
import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@/reduxTookit/store'

const { Header: AntHeader } = Layout
const { Text } = Typography

interface HeaderProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Header({ collapsed, onCollapse }: HeaderProps) {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const { messages: notifications, markAsRead, markAllAsRead } = useMessages()
  const { locale, changeLocale, messages } = useLocale()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const username = userInfo?.username
  
  const unreadCount = notifications.filter(msg => !msg.read).length

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: messages.header.profile
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: messages.header.settings
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: messages.header.logout,
      onClick: handleLogout
    }
  ]

  const notificationContent = (
    <div style={{ width: 300 }}>
      <div className={styles.notificationHeader}>
        <Text strong>通知</Text>
        <Button type="link" size="small" onClick={markAllAsRead}>
          全部已读
        </Button>
      </div>
      <List
        dataSource={notifications}
        renderItem={message => (
          <List.Item
            className={message.read ? styles.readMessage : ''}
            onClick={() => markAsRead(message.id)}
          >
            <List.Item.Meta
              title={message.title}
              description={
                <div>
                  <Text type="secondary">{message.content}</Text>
                  <br />
                  <Text type="secondary" className={styles.messageTime}>
                    {message.time}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
        style={{ maxHeight: 400, overflow: 'auto' }}
      />
    </div>
  )

  return (
    <AntHeader className={`${styles.header} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.left}>
        <Tooltip title={collapsed ? "展开菜单" : "收起菜单"}>
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined className={styles.icon} /> : <MenuFoldOutlined className={styles.icon} />}
            onClick={() => onCollapse(!collapsed)}
          />
        </Tooltip>
        <h1 className={styles.title}>React Admin</h1>
      </div>

      <div className={styles.right}>
        <Space size={4}>
          <Select
            value={locale}
            onChange={changeLocale}
            options={SUPPORTED_LOCALES}
            bordered={false}
            suffixIcon={<TranslationOutlined className={styles.icon} />}
            style={{ width: 100 }}
          />

          <div className={styles.divider} />

          <Tooltip title="通知">
            <Popover 
              content={notificationContent}
              trigger="click"
              placement="bottomRight"
              arrow={false}
            >
              <Badge count={unreadCount} size="small">
                <Button type="text" icon={<BellOutlined className={styles.icon} />} />
              </Badge>
            </Popover>
          </Tooltip>

          <Tooltip title={isFullscreen ? "退出全屏" : "全屏"}>
            <Button
              type="text"
              icon={isFullscreen ? 
                <FullscreenExitOutlined className={styles.icon} /> : 
                <FullscreenOutlined className={styles.icon} />
              }
              onClick={toggleFullscreen}
            />
          </Tooltip>

          <Tooltip title="源码">
            <a 
              href="https://github.com/yourusername/project" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button type="text" icon={<GithubOutlined className={styles.icon} />} />
            </a>
          </Tooltip>

          <div className={styles.divider} />
          
          <ThemeSwitch />
          <span className={styles.username}>{username}</span>
          <UserDropdown />
        </Space>
      </div>
    </AntHeader>
  )
} 