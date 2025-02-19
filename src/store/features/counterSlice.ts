import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  title: string;
}

const initialState: CounterState = {
  value: 0,
  title: 'Redux Counter'
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