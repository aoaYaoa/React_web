import React from 'react';
import { Card, Space, Typography, Input } from 'antd';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';

const { Title, Text } = Typography;

const CustomHooksDemo = () => {
  const [name, setName] = useLocalStorage('name', '');
  const debouncedValue = useDebounce(name, 500);

  return (
    <div>
      <Title level={3}>自定义 Hooks 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="useLocalStorage">
          <Space direction="vertical">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="输入会保存到localStorage"
            />
            <Text>存储的值: {name}</Text>
          </Space>
        </Card>

        <Card title="useDebounce">
          <Text>防抖后的值: {debouncedValue}</Text>
        </Card>
      </Space>
    </div>
  );
};

export default CustomHooksDemo; 