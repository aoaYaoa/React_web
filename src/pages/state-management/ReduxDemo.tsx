import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space, Typography, Input } from 'antd';
import type { RootState } from '@/reduxTookit/store';
import { increment, decrement, setTitle } from '@/reduxTookit/slices/counterSlice';

const { Title, Text } = Typography;

const ReduxDemo = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const title = useSelector((state: RootState) => state.counter.title);
  const dispatch = useDispatch();

  return (
    <div>
      <Title level={3}>Redux Toolkit 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="计数器示例">
          <Space direction="vertical">
            <Input
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              placeholder="修改标题"
            />
            <Text>当前计数: {count}</Text>
            <Space>
              <Button onClick={() => dispatch(decrement())}>减少</Button>
              <Button onClick={() => dispatch(increment())}>增加</Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ReduxDemo;


