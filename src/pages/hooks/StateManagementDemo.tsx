import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space, Typography, Input, List, Checkbox } from 'antd';
import { RootState } from '@/store';
import { increment, decrement, setTitle } from '@/store/features/counterSlice';
import { useTodoStore } from '@/store/zustand/todoStore';

const { Title, Text } = Typography;

// Redux 计数器组件
const ReduxCounter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const title = useSelector((state: RootState) => state.counter.title);
  const dispatch = useDispatch();

  return (
    <Card title="Redux Toolkit 示例">
      <Space direction="vertical">
        <Input
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="修改标题"
        />
        <Text>标题: {title}</Text>
        <Text>计数: {count}</Text>
        <Space>
          <Button onClick={() => dispatch(decrement())}>-</Button>
          <Button onClick={() => dispatch(increment())}>+</Button>
        </Space>
        <Text type="secondary">使用Redux Toolkit管理全局状态</Text>
      </Space>
    </Card>
  );
};

// Zustand Todo组件
const ZustandTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <Card title="Zustand 示例">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onPressEnter={handleAdd}
            placeholder="添加新任务"
          />
          <Button onClick={handleAdd}>添加</Button>
        </Space>

        <List
          size="small"
          bordered
          dataSource={todos}
          renderItem={todo => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => removeTodo(todo.id)}>
                  删除
                </Button>
              ]}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              >
                <Text delete={todo.completed}>{todo.text}</Text>
              </Checkbox>
            </List.Item>
          )}
        />
        <Text type="secondary">使用Zustand管理Todo列表状态</Text>
      </Space>
    </Card>
  );
};

// 主组件
const StateManagementDemo = () => {
  return (
    <div>
      <Title level={3}>状态管理示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <ReduxCounter />
        <ZustandTodo />

        <Card title="状态管理对比">
          <Space direction="vertical">
            <Text strong>Redux Toolkit:</Text>
            <Text>- 完整的状态管理解决方案</Text>
            <Text>- 适用于大型应用</Text>
            <Text>- 内置了很多实用工具</Text>
            <Text>- 支持中间件和开发者工具</Text>
            
            <Text strong>Zustand:</Text>
            <Text>- 轻量级状态管理</Text>
            <Text>- 简单直观的API</Text>
            <Text>- 无需Provider包装</Text>
            <Text>- 适用于中小型应用</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default StateManagementDemo; 