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
  MessageOutlined,
  CheckCircleOutlined,
  ApiOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  TableOutlined
} from '@ant-design/icons'
import { useLocale } from '@/hooks/useLocale'
import { useSelector } from 'react-redux'
import type { RootState } from '@/reduxTookit/store'

type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  permission?: PermissionCode;
  path?: string;
};

export function useMenuItems(): MenuItem[] {
  const { messages } = useLocale()

  const menuItems: MenuItem[] = [
    {
      key: '/home',
      label: messages.menu.home,
      icon: React.createElement(HomeOutlined),
      path: '/home',
      permission: 'dashboard:view'
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
      key: 'hooks',
      label: 'Hooks示例',
      icon: React.createElement(ExperimentOutlined),
      children: [
        {
          key: 'hooks/state',
          label: 'useState',
          path: '/hooks/state'
        },
        {
          key: 'hooks/effect',
          label: 'useEffect',
          path: '/hooks/effect'
        },
        {
          key: 'hooks/context',
          label: 'useContext',
          path: '/hooks/context'
        },
        {
          key: 'hooks/reducer',
          label: 'useReducer',
          path: '/hooks/reducer'
        },
        {
          key: 'hooks/memo',
          label: 'useMemo',
          path: '/hooks/memo'
        },
        {
          key: 'hooks/callback',
          label: 'useCallback',
          path: '/hooks/callback'
        },
        {
          key: 'hooks/ref',
          label: 'useRef',
          path: '/hooks/ref'
        },
        {
          key: 'hooks/custom',
          label: '自定义Hooks',
          path: '/hooks/custom'
        },
        {
          key: 'hooks/state-management',
          label: '状态管理',
          children: [
            {
              key: 'hooks/state-management/redux',
              label: 'Redux示例',
              path: '/hooks/state-management/redux'
            },
            {
              key: 'hooks/state-management/zustand',
              label: 'Zustand示例',
              path: '/hooks/state-management/zustand'
            }
          ]
        }
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
      key: 'state-management',
      label: '状态管理',
      icon: React.createElement(ApiOutlined),
      children: [
        {
          key: 'state-management/redux',
          label: 'Redux示例',
          path: '/state-management/redux'
        },
        {
          key: 'state-management/zustand',
          label: 'Zustand示例',
          path: '/state-management/zustand'
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
          icon: React.createElement(FileOutlined),
          path: '/system/files',
          permission: 'upload:view'
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
    },
    {
      key: 'product',
      label: '产品管理',
      icon: React.createElement(ShoppingOutlined),
      permission: 'product:view',
      children: [
        {
          key: 'product/list',
          label: '产品列表',
          path: '/product/list'
        }
      ]
    },
    {
      key: 'cart',
      label: '购物车',
      icon: React.createElement(ShoppingOutlined),
      path: '/cart',
      permission: 'cart:view'
    }
  ]

  return menuItems
}

/**
 * 根据权限过滤菜单
 * @param items - 菜单项
 * @param hasPermission - 用户权限检查函数
 */
export const filterMenuByPermission = (
  menuItems: MenuItem[], 
  hasPermission: (code: PermissionCode) => boolean
): MenuItem[] => {
  if (!menuItems) return [];
  
  return menuItems.filter(item => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const isAdmin = userInfo?.role === 'admin';
    if (isAdmin) return true;

    if (item.permission && !hasPermission(item.permission)) return false;
    
    if (item.children) {
      item.children = filterMenuByPermission(item.children, hasPermission);
      return item.children.length > 0;
    }
    
    return true;
  });
};