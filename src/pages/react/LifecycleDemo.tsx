import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, Card, Space, Typography, Input, Alert, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;

// 子组件：演示组件挂载/卸载
const DemoComponent = () => {
  // 组件挂载
  useEffect(() => {
    console.log('DemoComponent - 组件挂载');
    
    // 组件卸载
    return () => {
      console.log('DemoComponent - 组件卸载');
    };
  }, []);

  // 每次渲染后执行
  useEffect(() => {
    console.log('DemoComponent - 组件更新');
  });

  return <Text>我是演示组件</Text>;
};

// 主组件
const LifecycleDemo = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);

  // 1. 组件挂载 (类比 componentDidMount)
  useEffect(() => {
    console.log('1. 组件挂载完成');
    setMounted(true);

    // 组件卸载 (类比 componentWillUnmount)
    return () => {
      console.log('4. 组件即将卸载');
    };
  }, []);

  // 2. 数据更新 (类比 componentDidUpdate)
  useEffect(() => {
    if (mounted) {
      console.log('2. count 更新:', count);
    }
  }, [count]); // 仅在 count 变化时执行

  // 3. DOM更新前执行 (类比 componentWillUpdate)
  useLayoutEffect(() => {
    if (mounted) {
      console.log('3. DOM更新前执行');
    }
  });

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Title level={3}>React 生命周期 Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="提示"
          description="请打开控制台查看生命周期执行顺序"
          type="info"
          showIcon
        />

        <Card title="组件挂载/卸载演示">
          <Space direction="vertical">
            <Button onClick={() => setShow(!show)}>
              {show ? '卸载组件' : '挂载组件'}
            </Button>
            {show && <DemoComponent />}
          </Space>
        </Card>

        <Card title="更新阶段演示">
          <Space direction="vertical">
            <Paragraph>
              <Text>当前计数: {count}</Text>
            </Paragraph>
            <Button onClick={() => setCount(c => c + 1)}>
              增加计数
            </Button>
            <Divider />
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="输入以触发更新"
            />
            <Text type="secondary">
              输入的值: {inputValue}
            </Text>
          </Space>
        </Card>

        <Card title="生命周期说明">
          <Space direction="vertical">
            <Text strong>useEffect ([] 依赖):</Text>
            <Text>- 组件挂载后执行（componentDidMount）</Text>
            <Text>- 返回函数在组件卸载前执行（componentWillUnmount）</Text>
            
            <Text strong>useEffect ([dep] 依赖):</Text>
            <Text>- 依赖项变化时执行（componentDidUpdate）</Text>
            
            <Text strong>useLayoutEffect:</Text>
            <Text>- DOM变更后同步执行</Text>
            <Text>- 用于需要在浏览器重绘前执行的操作</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default LifecycleDemo; 