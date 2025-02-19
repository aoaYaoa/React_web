import React from 'react'
import { Layout, Space } from 'antd'
import { 
  GithubOutlined, 
  TwitterOutlined,
  LinkedinOutlined 
} from '@ant-design/icons'
import styles from './Footer.module.scss'

const { Footer: AntFooter } = Layout

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <AntFooter className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} React Admin. All rights reserved.
          </div>
          <div className={styles.links}>
            <a href="/about">关于我们</a>
            <a href="/privacy">隐私政策</a>
            <a href="/terms">服务条款</a>
          </div>
        </div>

        <div className={styles.right}>
          <Space size={16}>
            <a href="https://github.com/aoaYaoa/React_web" target="_blank" rel="noopener noreferrer">
              <GithubOutlined />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined />
            </a>
          </Space>
        </div>
      </div>
    </AntFooter>
  )
} 