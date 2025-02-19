import React, { useState, useMemo, useCallback } from 'react';
import { Button, Card, Space, Typography, Input, List } from 'antd';

const { Title, Text } = Typography;

// 子组件：展示计算结果
interface ExpensiveComponentProps {
  value: number;
  onValueChange: (value: number) => void;
}

const ExpensiveComponent = React.memo(({ value, onValueChange }: ExpensiveComponentProps) => {
  console.log('ExpensiveComponent rendered');

  // 模拟复杂计算
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result + value;
  }, [value]); // 仅在value变化时重新计算

  return (
    <div>
      <Text>复杂计算结果: {expensiveValue.toFixed(2)}</Text>
      <Button onClick={() => onValueChange(value + 1)}>
        增加基础值
      </Button>
    </div>
  );
});

const MemoDemo = () => {
  const [value, setValue] = useState(0);
  const [text, setText] = useState('');

  // 使用useCallback缓存回调函数
  const handleValueChange = useCallback((newValue: number) => {
    setValue(newValue);
  }, []); // 空依赖数组，函数引用永远不变

  // 使用useMemo缓存计算结果
  const doubledValue = useMemo(() => {
    console.log('Computing doubled value...');
    return value * 2;
  }, [value]); // 仅在value变化时重新计算

  return (
    <div>
      <Title level={3}>useMemo Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="复杂计算缓存">
          <Space direction="vertical">
            <ExpensiveComponent 
              value={value} 
              onValueChange={handleValueChange}
            />
            <Text>当前值: {value}</Text>
            <Text>双倍值: {doubledValue}</Text>
          </Space>
        </Card>

        <Card title="不影响重计算的输入">
          <Space direction="vertical">
            <Input 
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="输入不会触发重计算"
            />
            <Text>输入的文本: {text}</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default MemoDemo; 