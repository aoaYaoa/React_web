const messages = {
  menu: {
    home: '首页',
    todo: '待办事项',
    todoList: '待办列表',
    todoStats: '统计分析',
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
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    title: '主题设置'
  },
  languages: {
    zh: '中文',
    en: '英文'
  }
} as const;

export default messages; 