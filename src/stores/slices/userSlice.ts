import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 用户状态接口定义
interface UserState {
  id: string;          // 用户ID
  username: string;    // 用户名
  avatar: string;      // 头像URL
  token: string;       // JWT令牌
  isLoggedIn: boolean; // 登录状态
  role: string;        // 用户角色
  permissions: string[]; // 用户权限列表
}

// 初始状态
const initialState: UserState = {
  id: '',
  username: '',
  avatar: '',
  token: localStorage.getItem('token') || '', // 从localStorage读取token
  isLoggedIn: false,
  role: '',
  permissions: []
};

// 用户状态切片
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      const { token, ...userData } = action.payload;
      // 更新状态
      Object.assign(state, userData);
      state.token = token;
      state.isLoggedIn = true;
      // 保存token到localStorage
      localStorage.setItem('token', token);
    },
    // 更新用户信息
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    // 注销登录
    logout: (state) => {
      // 清除localStorage
      localStorage.removeItem('token');
      // 重置状态
      return initialState;
    }
  }
});

// 导出actions
export const { setUser, updateUser, logout } = userSlice.actions;

// 导出reducer
export default userSlice.reducer;

// 选择器
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsLoggedIn = (state: { user: UserState }) => state.user.isLoggedIn;
export const selectUserPermissions = (state: { user: UserState }) => state.user.permissions;