import { StateCreator } from 'zustand';
import { createStore } from '../utils';
import { persist } from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const initialState: TodoState = {
  todos: [],
};

export const useTodoStore = createStore<TodoState & TodoActions>(
  persist(
    (set) => ({
      ...initialState,
      addTodo: (text) => 
        set((state) => ({
          todos: [...state.todos, { id: Date.now().toString(), text, completed: false }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ todos: state.todos })
    }
  )
); 