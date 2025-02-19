import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { usePermission } from '../../hooks/usePermission'
import { filterMenuByPermission } from '../../config/menuConfig'
import '../../styles/global.css'
import { useLocale } from '@/hooks/useLocale'
import type { MenuProps } from 'antd'
import styles from './MainLayout.module.scss'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeSwitch } from './ThemeSwitch'
import { UserDropdown } from './UserDropdown'
import { Footer } from './Footer'
import { Header } from './Header'
import { useMenuItems } from '../../config/menuConfig'
const {  Sider, Content } = Layout

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { hasPermission } = usePermission()
  const { messages } = useLocale()
  const menuItems = useMenuItems()

  const filteredMenuItems = filterMenuByPermission(menuItems, hasPermission)

  const selectedKeys = [location.pathname]

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout className={styles.layout}>
      <Sider 
        className={styles.sider}
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={220}
      >
        <div className={styles.logo}>
          {!collapsed && 'React Admin Pro'}
        </div>
        <div className={styles.menuContainer}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            items={filteredMenuItems}
            onClick={handleMenuClick}
          />
        </div>
      </Sider>
      <Layout>
        <Header 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
        />
        <Content className={`${styles.content} ${collapsed ? styles.collapsed : ''}`}>
          <Breadcrumb className={styles.breadcrumb}>
            {/* 面包屑内容 */}
          </Breadcrumb>
          <Outlet />
        
        </Content>
        <Footer className={`${styles.footer} ${collapsed ? styles.collapsed : ''}`} />
      </Layout>
    </Layout>
  )
} 