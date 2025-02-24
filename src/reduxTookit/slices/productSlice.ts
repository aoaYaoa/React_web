import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// 定义类型但不导出，避免重复导出
interface ProductState {
  id: string;
  name: string;
  price: number;
  state: number;
}

const initialState: ProductState[] = [
  { id: '1', name: 'iPhone 15', price: 5999, state: 1 },
  { id: '2', name: 'MacBook Pro', price: 12999, state: 1 },
  { id: '3', name: 'iPad Air', price: 4799, state: 0 }
];

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductState>) => {
      state.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductState>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
    searchProducts: (state, action: PayloadAction<Partial<ProductState>>) => {
      const searchParams = action.payload;
      if (Object.keys(searchParams).length === 0) {
        return [...initialState];
      }
      return state.filter(item =>
        Object.entries(searchParams).every(([key, value]) =>
          String(item[key as keyof ProductState]).includes(String(value))
        )
      );
    }
  }
});

export const { addProduct, updateProduct, deleteProduct, searchProducts } = productSlice.actions;

// 修改选择器以匹配新的状态路径
export const selectProducts = (state: RootState) => state.product || initialState;

// 导出类型和 reducer
export type { ProductState };
export default productSlice.reducer; 