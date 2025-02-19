import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: 'Admin',  // 默认用户名
  isLoggedIn: true   // 默认登录状态
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.isLoggedIn = false;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer; 