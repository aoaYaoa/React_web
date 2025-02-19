import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space, Typography, Input, Divider } from 'antd';
import type { RootState } from '@/store';
import { increment, decrement, setTitle } from '@/store/features/counterSlice';

const { Title, Text, Paragraph } = Typography;

const ReduxDemo = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const title = useSelector((state: RootState) => state.counter.title);
  const dispatch = useDispatch();

  return (
    <div>
      <Title level={3}>Redux Toolkit 示例</Title>
      <Paragraph>
        Redux 是一个使用"单向数据流"架构的 JavaScript 应用程序的状态容器。Redux 可以用在任何视图层，但最常见的是与 React 一起使用。
      </Paragraph>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="核心概念">
          <Space direction="vertical">
            <Title level={5}>1. Store</Title>
            <Text>存储应用程序的状态树，每个应用只能有一个 store。</Text>
            
            <Title level={5}>2. Action</Title>
            <Text>描述发生了什么的普通 JavaScript 对象，必须有 type 字段。</Text>
            
            <Title level={5}>3. Reducer</Title>
            <Text>指定应用状态如何响应不同动作的纯函数，接收旧状态和动作，返回新状态。</Text>
            
            <Title level={5}>4. Dispatch</Title>
            <Text>发送 action 到 reducer 的方法，是改变状态的唯一方式。</Text>
          </Space>
        </Card>

        <Card title="计数器示例">
          <Space direction="vertical">
            <Input
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              placeholder="修改标题"
            />
            <Text>标题: {title}</Text>
            <Text>计数: {count}</Text>
            <Space>
              <Button onClick={() => dispatch(decrement())}>减少</Button>
              <Button onClick={() => dispatch(increment())}>增加</Button>
            </Space>
          </Space>
        </Card>

        <Card title="代码示例">
          <Space direction="vertical">
            <Text code>
              {`// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, title: '' },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    setTitle: (state, action) => { state.title = action.payload }
  }
});`}
            </Text>
            <Divider />
            <Text code>
              {`// 在组件中使用
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(increment());`}
            </Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ReduxDemo; 