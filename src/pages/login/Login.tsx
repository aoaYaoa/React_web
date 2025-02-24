import { useEffect, useState } from 'react';
import { getRandomPhoto } from '@/services/pexels';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxTookit/store';
import { login } from '@/reduxTookit/slices/userSlice';
import styles from './Login.module.scss';

export function Login() {
  const [bgImage, setBgImage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBackgroundImage() {
      try {
        const photo = await getRandomPhoto('technology,minimal,clean,modern,workspace');
        setBgImage(photo.src.large2x);
      } catch (error) {
        console.error('Failed to fetch background image:', error);
        setBgImage('');
      }
    }
    fetchBackgroundImage();
  }, []);

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await dispatch(login(values));
      navigate('/home', { replace: true });
    } catch (error) {
      message.error('登录失败：' + (error as Error).message);
    }
  };

  return (
    <div 
      className={styles.container} 
      style={{ 
        backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(120deg, #2980b9, #8e44ad)'
      }}
    >
      <div className={styles.loginCard}>
        <h1>React Admin Pro</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          className={styles.loginForm}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
} 