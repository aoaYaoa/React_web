import { StateCreator } from 'zustand';
import type { CartState, CartItem } from '../types';
import { createStore } from '../utils';

interface CartActions {
  addToCart: (product: CartItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRemark: (productId: string, remark: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

export const useCartStore = createStore<CartState & CartActions>(
  (set, get) => ({
    ...initialState,

    addToCart: (product, quantity = 1) => {
      const { items } = get();
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        set({ items: updatedItems });
      } else {
        set({ items: [...items, { ...product, quantity }] });
      }
      get().calculateTotals();
    },

    removeFromCart: (productId) => {
      const { items } = get();
      set({ items: items.filter(item => item.id !== productId) });
      get().calculateTotals();
    },

    updateQuantity: (productId, quantity) => {
      const { items } = get();
      const updatedItems = items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      set({ items: updatedItems });
      get().calculateTotals();
    },

    updateRemark: (productId, remark) => {
      const { items } = get();
      const updatedItems = items.map(item =>
        item.id === productId ? { ...item, remark } : item
      );
      set({ items: updatedItems });
    },

    clearCart: () => set(initialState),

    calculateTotals: () => {
      const { items } = get();
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      set({ totalQuantity, totalAmount });
    },
  }),
  {
    name: 'cart-storage',
    partialize: (state) => ({
      items: state.items,
      totalAmount: state.totalAmount,
      totalQuantity: state.totalQuantity,
    }),
  }
);

export type { CartItem }; 