import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../components/Layout/MainLayout'
import { NotFound } from '../components/ErrorPages/404'
import { Forbidden } from '../components/ErrorPages/403'
import { ServerError } from '../components/ErrorPages/500'
import { Login } from '@/pages/login/Login'
import { AuthGuard } from '../components/AuthGuard'
import { Dashboard } from '@/pages/dashboard/Dashboard'
import TodoList from '@/pages/todo/TodoList'
import { Settings } from '@/pages/settings/Settings'
import { RoleList } from '@/pages/system/roles/RoleList'
import ThemePage from '@/pages/system/theme/ThemePage'
import { FileUploadPage } from '@/pages/system/files/FileUploadPage'
import { HomePage } from '@/pages/home'
import { HooksLayout } from '@/pages/hooks/HooksLayout'
import StateDemo from '@/pages/hooks/StateDemo'
import EffectDemo from '@/pages/hooks/EffectDemo'
import ContextDemo from '@/pages/hooks/ContextDemo'
import RefDemo from '@/pages/hooks/RefDemo'
import MemoDemo from '@/pages/hooks/MemoDemo'
import CallbackDemo from '@/pages/hooks/CallbackDemo'
import ReducerDemo from '@/pages/hooks/ReducerDemo'
import CustomHooksDemo from '@/pages/hooks/CustomHooksDemo'
import { ReactLayout } from '@/pages/react/ReactLayout'
import { StateManagementLayout } from '@/pages/state-management/StateManagementLayout'
import LifecycleDemo from '@/pages/react/LifecycleDemo'
import CommunicationDemo from '@/pages/react/CommunicationDemo'
import ReduxDemo from '@/pages/state-management/ReduxDemo'
import ZustandDemo from '@/pages/state-management/ZustandDemo'
import { ImageList } from '@/pages/system/images/ImageList'
import BasicList from '@/pages/virtual-list/BasicList'
import InfiniteList from '@/pages/virtual-list/InfiniteList'
import { lazy, Suspense } from 'react'
import { Loading } from '@/components/Loading'
import UserList from '@/pages/system/users/UserList'
import StateManagementDemo from '@/pages/hooks/StateManagementDemo'
import ProductPage from '@/pages/product/product'
import CartPage from '@/pages/cart/CartPage'

// 懒加载路由组件
const CrudPage = lazy(() => import('@/pages/Crud'))

// 包装懒加载组件
const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard><MainLayout /></AuthGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: <HomePage />,
        handle: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      },
      {
        path: 'todo/list',
        element: <TodoList />
      },
      {
        path: 'todo/stats',
        element: <TodoList />
      },
      {
        path: 'completed',
        element: <TodoList />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: '403',
        element: <Forbidden />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: 'system',
        children: [
          {
            path: 'users',
            element: <UserList />,
            handle: { title: '用户管理' }
          },
          {
            path: 'roles',
            element: <RoleList />,
            handle: { title: '角色管理' }
          },
          {
            path: 'images',
            element: <ImageList />,
            handle: { title: '图片懒加载' }
          },
          {
            path: 'files',
            element: <FileUploadPage />,
            handle: { title: '文件上传' }
          },
          {
            path: 'theme',
            element: <ThemePage />,
            handle: { title: '主题设置' }
          }
        ]
      },
      {
        path: 'hooks',
        element: <HooksLayout />,
        children: [
          {
            path: 'state',
            element: <StateDemo />
          },
          {
            path: 'effect',
            element: <EffectDemo />
          },
          {
            path: 'context',
            element: <ContextDemo />
          },
          {
            path: 'reducer',
            element: <ReducerDemo />
          },
          {
            path: 'memo',
            element: <MemoDemo />
          },
          {
            path: 'callback',
            element: <CallbackDemo />
          },
          {
            path: 'ref',
            element: <RefDemo />
          },
          {
            path: 'custom',
            element: <CustomHooksDemo />
          },
          {
            path: 'state-management',
            element: <StateManagementLayout />,
            children: [
              {
                path: 'redux',
                element: <ReduxDemo />
              },
              {
                path: 'zustand',
                element: <ZustandDemo />
              }
            ]
          }
        ]
      },
      {
        path: 'react',
        element: <ReactLayout />,
        children: [
          {
            path: 'lifecycle',
            element: <LifecycleDemo />,
            handle: { title: '生命周期' }
          },
          {
            path: 'communication',
            element: <CommunicationDemo />,
            handle: { title: '组件通信' }
          }
        ]
      },
      {
        path: 'state-management',
        element: <StateManagementLayout />,
        children: [
          {
            path: 'redux',
            element: <ReduxDemo />,
            handle: { title: 'Redux' }
          },
          {
            path: 'zustand',
            element: <ZustandDemo />,
            handle: { title: 'Zustand' }
          }
        ]
      },
      {
        path: 'virtual-list',
        children: [
          {
            path: 'basic',
            element: <BasicList />,
            handle: { title: '基础列表' }
          },
          {
            path: 'infinite',
            element: <InfiniteList />,
            handle: { title: '无限滚动' }
          }
        ]
      },
      {
        path: 'crud',
        children: [
          {
            path: 'list',
            element: lazyLoad(CrudPage),
            handle: { title: '数据列表' }
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: 'list',
            element: <ProductPage />
          }
        ]
      },
      {
        path: 'cart',
        element: <CartPage />,
        handle: {
          title: '购物车',
          requiresAuth: true
        }
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

// 菜单配置
export const menuConfig = [
  {
    key: '/home',
    label: '首页',
    icon: 'HomeOutlined'
  },
  {
    key: '/hooks',
    label: 'Hooks',
    icon: 'ExperimentOutlined',
    children: [
      { key: '/hooks/state', label: 'useState' },
      { key: '/hooks/effect', label: 'useEffect' },
      { key: '/hooks/context', label: 'useContext' },
      { key: '/hooks/ref', label: 'useRef' },
      { key: '/hooks/memo', label: 'useMemo' },
      { key: '/hooks/callback', label: 'useCallback' },
      { key: '/hooks/reducer', label: 'useReducer' },
      { key: '/hooks/custom', label: '自定义Hooks' },
      { key: '/hooks/state-management', label: '状态管理' }
    ]
  },
  {
    key: '/react',
    label: 'React基础',
    icon: 'CodeOutlined',
    children: [
      { key: '/react/lifecycle', label: '生命周期' },
      { key: '/react/communication', label: '组件通信' }
    ]
  },
  {
    key: '/state-management',
    label: '状态管理',
    icon: 'ClusterOutlined',
    children: [
      { key: '/state-management/redux', label: 'Redux' },
      { key: '/state-management/zustand', label: 'Zustand' }
    ]
  }
  // 其他菜单项...
] 