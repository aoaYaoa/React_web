export const SUPPORTED_LOCALES = [
  { label: '简体中文', value: 'zh_CN' },
  { label: 'English', value: 'en_US' }
]

export type LocaleType = typeof SUPPORTED_LOCALES[number]['value']

export const messages = {
  zh_CN: {
    menu: {
      home: '首页',
      todo: '待办事项',
      todoList: '任务列表',
      todoStats: '任务统计',
      system: '系统管理',
      users: '用户管理',
      roles: '角色管理',
      theme: '主题设置',
      'system/files': '文件管理'
    },
    header: {
      profile: '个人中心',
      settings: '系统设置',
      logout: '退出登录'
    },
    theme: {
      title: '主题设置',
      colors: '颜色设置',
      primaryColor: '主题色',
      successColor: '成功色',
      warningColor: '警告色',
      errorColor: '错误色',
      components: '组件设置',
      fontSize: '字体大小',
      borderRadius: '圆角大小',
      tableDensity: '表格密度',
      compact: '紧凑',
      default: '中等',
      relaxed: '宽松',
      layout: '布局设置',
      compactMode: '紧凑布局'
    }
  },
  en_US: {
    menu: {
      home: 'Home',
      todo: 'Todo',
      todoList: 'Task List',
      todoStats: 'Statistics',
      system: 'System',
      users: 'Users',
      roles: 'Roles',
      theme: 'Theme',
      'system/files': 'Files'
    },
    header: {
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout'
    },
    theme: {
      title: 'Theme Settings',
      colors: 'Colors',
      primaryColor: 'Primary Color',
      successColor: 'Success Color',
      warningColor: 'Warning Color',
      errorColor: 'Error Color',
      components: 'Components',
      fontSize: 'Font Size',
      borderRadius: 'Border Radius',
      tableDensity: 'Table Density',
      compact: 'Compact',
      default: 'Default',
      relaxed: 'Relaxed',
      layout: 'Layout',
      compactMode: 'Compact Mode'
    }
  }
} 