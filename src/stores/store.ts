import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// 创建Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    // 这里可以添加其他reducer
  },
  // 启用开发工具
  devTools: process.env.NODE_ENV !== 'production',
  // 添加中间件配置
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略特定action的序列化检查
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 创建自定义hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 