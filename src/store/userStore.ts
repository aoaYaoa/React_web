import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PermissionCode } from '@/types/permission';

interface UserState {
  username: string | null;
  permissions: PermissionCode[];
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      permissions: [],
      login: async (credentials) => {
        // 模拟登录
        if (credentials.username === 'admin' && credentials.password === '123456') {
          set({
            username: credentials.username,
            permissions: [
              'crud:view',
              'crud:edit',
              'todo:view', 
              'system:view', 
              'user:view',
              'role:view'
            ]
          });
        } else {
          throw new Error('用户名或密码错误');
        }
      },
      logout: () => {
        set({ username: null, permissions: [] });
      }
    }),
    {
      name: 'user-storage' // 持久化存储的key
    }
  )
); 