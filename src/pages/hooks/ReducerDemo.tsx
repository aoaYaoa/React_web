import React, { useReducer } from 'react';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Text } = Typography;

interface State {
  count: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

const ReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <Title level={3}>useReducer Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="计数器示例">
          <Space direction="vertical">
            <Text>当前计数: {state.count}</Text>
            <Space>
              <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
              <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
              <Button onClick={() => dispatch({ type: 'reset' })}>重置</Button>
            </Space>
          </Space>
        </Card>

        <Card title="useReducer 说明">
          <Space direction="vertical">
            <Text>- 适用于复杂的状态逻辑</Text>
            <Text>- 类似于 Redux 的简化版</Text>
            <Text>- 使用 action 描述状态变更</Text>
            <Text>- 使用 reducer 处理状态更新</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ReducerDemo; 