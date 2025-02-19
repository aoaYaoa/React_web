import React, { useState, useCallback } from 'react';
import { Button, Card, Space, Typography, List } from 'antd';

const { Title, Text } = Typography;

interface TodoListProps {
  todos: string[];
  onDelete: (index: number) => void;
}

const TodoList = React.memo(({ todos, onDelete }: TodoListProps) => {
  console.log('TodoList rendered');
  return (
    <List
      size="small"
      bordered
      dataSource={todos}
      renderItem={(item, index) => (
        <List.Item actions={[
          <Button size="small" onClick={() => onDelete(index)}>删除</Button>
        ]}>
          {item}
        </List.Item>
      )}
    />
  );
});

const CallbackDemo = () => {
  const [todos, setTodos] = useState<string[]>(['学习 React', '学习 TypeScript']);
  const [count, setCount] = useState(0);

  const handleDelete = useCallback((index: number) => {
    setTodos(todos => todos.filter((_, i) => i !== index));
  }, []); // 空依赖数组，函数引用永远不变

  return (
    <div>
      <Title level={3}>useCallback Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="回调函数优化">
          <Space direction="vertical">
            <TodoList todos={todos} onDelete={handleDelete} />
            <Button onClick={() => setCount(c => c + 1)}>
              触发重渲染 ({count})
            </Button>
            <Text>点击按钮不会重新创建删除函数</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default CallbackDemo; 