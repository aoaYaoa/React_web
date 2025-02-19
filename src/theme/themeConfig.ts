import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    fontSize: 14,
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f0f2f5',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
  },
  components: {
    Card: {
      borderRadiusLG: 8,
      boxShadowTertiary: '0 1px 2px rgba(0, 0, 0, 0.03)',
    },
    Table: {
      borderRadiusLG: 8,
      headerBg: '#fafafa',
      headerColor: 'rgba(0, 0, 0, 0.85)',
      headerSplitColor: '#f0f0f0',
    },
    Button: {
      borderRadiusLG: 4,
      controlHeight: 32,
    },
    Menu: {
      itemHeight: 40,
      itemMarginInline: 8,
      itemSelectedBg: 'rgba(24, 144, 255, 0.1)',
    }
  }
}

export default theme 