import React, { useRef, useState } from 'react';
import { Button, Card, Space, Typography, Input, InputRef } from 'antd';

const { Title, Text } = Typography;

const RefDemo = () => {
  const inputRef = useRef<InputRef>(null);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleClick = () => {
    countRef.current += 1;
    console.log('Current count:', countRef.current);
  };

  return (
    <div>
      <Title level={3}>useRef Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="DOM引用示例">
          <Space>
            <Input ref={inputRef} placeholder="点击按钮聚焦" />
            <Button onClick={focusInput}>聚焦输入框</Button>
          </Space>
        </Card>

        <Card title="引用值示例">
          <Space direction="vertical">
            <Button onClick={() => setCount(c => c + 1)}>
              State Count: {count}
            </Button>
            <Button onClick={handleClick}>
              Ref Count (查看控制台)
            </Button>
            <Text>State 会触发重渲染，而 Ref 不会</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default RefDemo; 