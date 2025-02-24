import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 导出 CounterState 类型
export interface CounterState {
  value: number;
  title: string;
}

const initialState: CounterState = {
  value: 0,
  title: '计数器'
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  }
});

export const { increment, decrement, setTitle } = counterSlice.actions;
export default counterSlice.reducer; 