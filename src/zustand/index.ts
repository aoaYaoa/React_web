import { useCartStore } from './modules/cart';

import { useTodoStore } from './modules/todo';

export * from './modules/cart';


export * from './modules/todo';
export * from './types';

// 如果需要组合多个 store
export const useStore = () => ({
  cart: useCartStore(),
  todo: useTodoStore(),
}); 