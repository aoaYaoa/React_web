import React from 'react'
import type { MenuProps } from 'antd'
import * as Icons from '@ant-design/icons'
import type { PermissionCode } from '@/types/permission'
import {
  HomeOutlined,
  UnorderedListOutlined,
  ExperimentOutlined,
  CodeOutlined,
  ClusterOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  PictureOutlined,
  FileOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  MessageOutlined
} from '@ant-design/icons'
import { useLocale } from '@/hooks/useLocale'

type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  permission?: PermissionCode;
};

export function useMenuItems(): MenuItem[] {
  const { messages } = useLocale()

  const menuItems: MenuItem[] = [
    {
      key: '/home',
      label: messages.menu.home,
      icon: React.createElement(HomeOutlined)
    },
    {
      key: '/todo',
      label: messages.menu.todo,
      icon: React.createElement(UnorderedListOutlined),
      permission: 'todo:view',
      children: [
        {
          key: '/todo/list',
          label: messages.menu.todoList,
          permission: 'todo:view'
        },
        {
          key: '/todo/stats',
          label: messages.menu.todoStats,
          permission: 'stats:view'
        }
      ]
    },
    {
      key: '/hooks',
      label: 'Hooks示例',
      icon: React.createElement(ExperimentOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/hooks/state',
          label: 'useState',
          permission: 'system:view'
        },
        {
          key: '/hooks/effect',
          label: 'useEffect',
          permission: 'system:view'
        },
        {
          key: '/hooks/context',
          label: 'useContext',
          permission: 'system:view'
        },
        {
          key: '/hooks/ref',
          label: 'useRef',
          permission: 'system:view'
        },
        {
          key: '/hooks/memo',
          label: 'useMemo',
          permission: 'system:view'
        },
        {
          key: '/hooks/callback',
          label: 'useCallback',
          permission: 'system:view'
        },
        {
          key: '/hooks/reducer',
          label: 'useReducer',
          permission: 'system:view'
        },
        {
          key: '/hooks/custom',
          label: '自定义Hooks',
          permission: 'system:view'
        },
      ]
    },
    {
      key: '/react',
      label: 'React基础',
      icon: React.createElement(CodeOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/react/lifecycle',
          label: '生命周期',
          permission: 'system:view'
        },
        {
          key: '/react/communication',
          label: '组件通信',
          permission: 'system:view'
        }
      ]
    },
    {
      key: '/state-management',
      label: '状态管理',
      icon: React.createElement(ClusterOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/state-management/redux',
          label: 'Redux',
          permission: 'system:view'
        },
        {
          key: '/state-management/zustand',
          label: 'Zustand',
          permission: 'system:view'
        }
      ]
    },
    {
      key: '/system',
      label: messages.menu.system,
      icon: React.createElement(SettingOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/system/users',
          label: messages.menu.users,
          icon: React.createElement(UserOutlined),
          permission: 'user:view'
        },
        {
          key: '/system/roles',
          label: messages.menu.roles,
          icon: React.createElement(TeamOutlined),
          permission: 'role:view'
        },
        {
          key: '/system/images',
          label: '图片懒加载',
          icon: React.createElement(PictureOutlined)
        },
        {
          key: '/system/files',
          label: '文件上传',
          icon: React.createElement(FileOutlined)
        },
        {
          key: '/system/theme',
          label: '主题设置',
          icon: React.createElement(BgColorsOutlined)
        }
      ]
    },
    {
      key: '/virtual-list',
      label: '虚拟列表',
      icon: React.createElement(AppstoreOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/virtual-list/basic',
          label: '基础列表',
          permission: 'system:view'
        },
        {
          key: '/virtual-list/infinite',
          label: '无限滚动',
          permission: 'system:view'
        }
      ]
    },
    {
      key: '/crud',
      label: 'CRUD管理',
      icon: React.createElement(TeamOutlined),
      permission: 'system:view',
      children: [
        {
          key: '/crud/list',
          label: '数据列表',
          permission: 'system:view'
        },
       
      ]
    }
  ]

  return menuItems
}

/**
 * 根据权限过滤菜单
 * @param items - 菜单项
 * @param hasPermission - 用户权限检查函数
 */
export function filterMenuByPermission(
  menuItems: MenuItem[] | undefined,
  hasPermission: (code: PermissionCode) => boolean
): MenuItem[] {
  if (!menuItems) return [];
  return menuItems.filter(item => {
    if (item.permission && !hasPermission(item.permission)) return false;
    if (item.children) {
      const filteredChildren = filterMenuByPermission(item.children, hasPermission);
      item.children = filteredChildren;
      return filteredChildren.length > 0;
    }
    return true;
  });
} 