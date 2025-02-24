/**
 * Redux store 配置
 * 包含了状态持久化、开发工具和中间件配置
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, type PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

// Reducers
import userReducer, { type UserState } from './slices/userSlice';
import productReducer, { type ProductState } from './slices/productSlice';
import counterReducer, { type CounterState } from './slices/counterSlice';

// 根状态类型
export interface RootState {
  user: UserState;
  product: ProductState[];
  counter: CounterState;
}

// 持久化配置
const userPersistConfig: PersistConfig<UserState> = {
  key: 'user',
  storage,
  whitelist: ['userInfo', 'token', 'isLoggedIn']
};

const counterPersistConfig: PersistConfig<CounterState> = {
  key: 'counter',
  storage,
  whitelist: ['value', 'title']
};

// 合并 reducer
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  counter: persistReducer(counterPersistConfig, counterReducer),
  product: productReducer
});

// 创建 store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

// 导出类型和 hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 