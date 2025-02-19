import React, { useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';

const { Title, Text } = Typography;

const StateDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <Title level={3}>useState Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="计数器示例">
          <Space>
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <Text>{count}</Text>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </Space>
        </Card>

        <Card title="表单输入示例">
          <Space direction="vertical">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入文本"
            />
            <Text>输入的内容: {text}</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default StateDemo; 