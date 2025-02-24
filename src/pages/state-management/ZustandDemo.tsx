import React, { useState } from 'react';
import { Button, Card, Space, Typography, Input, List } from 'antd';
import { useTodoStore } from '@/zustand/modules/todo';

const { Title } = Typography;

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
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="Todo列表">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onPressEnter={handleAdd}
              placeholder="添加新任务"
              suffix={
                <Button type="link" onClick={handleAdd}>
                  添加
                </Button>
              }
            />
            <List
              dataSource={todos}
              renderItem={(todo) => (
                <List.Item
                  actions={[
                    <Button 
                      size="small" 
                      danger
                      onClick={() => removeTodo(todo.id)}
                    >
                      删除
                    </Button>
                  ]}
                >
                  <Space>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span style={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#999' : 'inherit'
                    }}>
                      {todo.text}
                    </span>
                  </Space>
                </List.Item>
              )}
            />
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ZustandDemo;
