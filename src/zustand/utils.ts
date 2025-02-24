import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

/**
 * 创建 store 的工具函数，自动添加 devtools 中间件
 * @param initializer - store 初始化函数
 * @param options - store 配置选项
 */
export function createStore<T>(
  initializer: StateCreator<T>,
  options: { name?: string } = {}
) {
  const store = create(
    devtools(initializer, {
      name: options.name || 'store',
      enabled: import.meta.env.DEV
    })
  );

  return store;
} 