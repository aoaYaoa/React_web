import React, { useState } from 'react';
import { Button, Card, Space, Typography, Input, List, Checkbox, Divider } from 'antd';
import { useTodoStore } from '@/store/zustand/todoStore';

const { Title, Text, Paragraph } = Typography;

const ZustandDemo = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <Title level={3}>Zustand 示例</Title>
      <Paragraph>
        Zustand 是一个小型、快速且可扩展的状态管理解决方案。使用简单的 API，不需要 Provider，支持 React Hooks，并且具有很好的开发者体验。
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="核心特点">
          <Space direction="vertical">
            <Title level={5}>1. 简单性</Title>
            <Text>使用 hooks 的方式管理状态，API 简洁直观。</Text>
            
            <Title level={5}>2. 无 Provider</Title>
            <Text>不需要在应用外层包裹 Provider，减少了样板代码。</Text>
            
            <Title level={5}>3. 中间件支持</Title>
            <Text>支持 Redux 开发工具、数据持久化等中间件。</Text>
          </Space>
        </Card>

        <Card title="Todo List 示例">
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
          </Space>
        </Card>

        <Card title="代码示例">
          <Space direction="vertical">
            <Text code>
              {`// 创建 store
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
}));`}
            </Text>
            <Divider />
            <Text code>
              {`// 在组件中使用
const { todos, addTodo, toggleTodo } = useTodoStore();
addTodo('新任务');`}
            </Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ZustandDemo; 