/**
 * Todo 列表状态管理
 * 使用 Zustand 实现，包含持久化功能
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Todo 项类型定义
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Store 状态和方法定义
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

// 创建 store
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      // 添加新 todo
      addTodo: (text) => 
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }]
        })),
      // 切换 todo 完成状态
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        })),
      // 删除 todo
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }))
    }),
    {
      name: 'todo-storage' // localStorage 存储键名
    }
  )
); 