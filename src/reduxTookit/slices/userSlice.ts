/**
 * 用户状态管理
 * 处理用户登录、权限等状态
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role?: string;
  permissions: string[];  // 用户权限列表
}

// 用户状态接口
export interface UserState {
  userInfo: UserInfo | null;  // 用户信息
  token: string | null;       // JWT token
  isLoggedIn: boolean;       // 登录状态
}

// 模拟用户数据 - 开发环境使用
const mockUserInfo: UserInfo = {
  id: '1',
  username: 'admin',
  avatar: 'https://avatars.githubusercontent.com/u/1',
  email: 'admin@example.com',
  role: 'admin',
  permissions: [
    'user:view', 'user:add', 'user:edit', 'user:delete',
    'role:view', 'role:add', 'role:edit', 'role:delete',
    'menu:view', 'menu:add', 'menu:edit', 'menu:delete'
  ]
};

// 初始状态
const initialState: UserState = {
  userInfo: null,
  token: null,
  isLoggedIn: false
};

/**
 * 登录异步 action
 * 模拟后端登录接口
 */
export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }) => {
    if (!username || !password) {
      throw new Error('用户名和密码不能为空');
    }
    
    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      userInfo: { ...mockUserInfo, username },
      token: 'mock_token_' + Date.now(),
      isLoggedIn: true
    };
  }
);

// 用户状态切片
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
    logout: () => {
      message.success('已退出登录');
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        message.success('登录成功');
        return { ...state, ...action.payload };
      })
      .addCase(login.rejected, (_, action) => {
        message.error('登录失败：' + action.error.message);
      });
  }
});

// 导出 actions
export const { setUser, updateUser, logout } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;

// 选择器
export const selectUser = (state: { user: UserState }) => state.user;
export const selectUserInfo = (state: { user: UserState }) => state.user.userInfo;
export const selectIsLoggedIn = (state: { user: UserState }) => state.user.isLoggedIn;
export const selectUserPermissions = (state: { user: UserState }) => state.user.userInfo?.permissions || [];