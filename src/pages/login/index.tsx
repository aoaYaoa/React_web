import { useDispatch } from 'react-redux';
import { login } from '@/reduxTookit/slices/userSlice';

// 在登录处理函数中
const dispatch = useDispatch();
const handleLogin = () => {
  dispatch(login({ username, password }));
}; 