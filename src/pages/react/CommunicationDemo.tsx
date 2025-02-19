import React, { createContext, useContext, useState, useEffect } from 'react';
import { Button, Card, Space, Typography, Input, Divider } from 'antd';

const { Title, Text } = Typography;

// 1. Context 通信
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
});

// 2. 事件总线
class EventBus {
  private events: Record<string, Function[]> = {};

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

const eventBus = new EventBus();

// 子组件A：Props通信示例
interface ChildAProps {
  message: string;
  onMessageChange: (message: string) => void;
}

const ChildA = ({ message, onMessageChange }: ChildAProps) => (
  <Space direction="vertical">
    <Text>Props通信示例</Text>
    <Input 
      value={message}
      onChange={e => onMessageChange(e.target.value)}
      placeholder="输入消息"
    />
  </Space>
);

// 子组件B：Context通信示例
const ChildB = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <Space direction="vertical">
      <Text>Context通信示例</Text>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题：{theme}
      </Button>
    </Space>
  );
};

// 子组件C：事件总线示例（发送方）
const ChildC = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    eventBus.emit('newMessage', message);
    setMessage('');
  };

  return (
    <Space direction="vertical">
      <Text>EventBus发送方</Text>
      <Space>
        <Input 
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="输入广播消息"
        />
        <Button onClick={sendMessage}>发送</Button>
      </Space>
    </Space>
  );
};

// 子组件D：事件总线示例（接收方）
const ChildD = () => {
  const [messages, setMessages] = useState<string[]>([]);

  React.useEffect(() => {
    const handler = (message: string) => {
      setMessages(prev => [...prev, message]);
    };

    eventBus.on('newMessage', handler);
    return () => eventBus.off('newMessage', handler);
  }, []);

  return (
    <Space direction="vertical">
      <Text>EventBus接收方</Text>
      <Card size="small" style={{ maxHeight: 100, overflow: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Card>
    </Space>
  );
};

// 子组件E：子传父通信示例
interface ChildEProps {
  onDataChange: (data: string) => void;
}

const ChildE = ({ onDataChange }: ChildEProps) => (
  <Button onClick={() => onDataChange('来自子组件的数据')}>
    发送数据给父组件
  </Button>
);

// 子组件F：父传子通信示例
interface ChildFProps {
  parentData: string;
}

const ChildF = ({ parentData }: ChildFProps) => (
  <Text>接收到父组件数据: {parentData}</Text>
);

// 子组件G和H：兄弟组件通信示例
const ChildG = () => {
  const sendToSibling = () => {
    eventBus.emit('siblingMessage', '来自G组件的消息');
  };

  return (
    <Button onClick={sendToSibling}>
      发送消息给兄弟组件
    </Button>
  );
};

const ChildH = () => {
  const [siblingMessage, setSiblingMessage] = useState('');

  useEffect(() => {
    const handler = (message: string) => {
      setSiblingMessage(message);
    };

    eventBus.on('siblingMessage', handler);
    return () => eventBus.off('siblingMessage', handler);
  }, []);

  return <Text>收到兄弟组件消息: {siblingMessage}</Text>;
};

// 组件I和J：通过共同父组件通信
interface SharedState {
  data: string;
  setData: (data: string) => void;
}

const ChildI = ({ data, setData }: SharedState) => (
  <Button onClick={() => setData('来自I组件的数据')}>
    通过父组件发送
  </Button>
);

const ChildJ = ({ data }: Pick<SharedState, 'data'>) => (
  <Text>通过父组件接收: {data}</Text>
);

// 主组件
const CommunicationDemo = () => {
  // Props通信状态
  const [message, setMessage] = useState('Hello');
  
  // Context通信状态
  const [theme, setTheme] = useState('light');

  const [parentData, setParentData] = useState('父组件的数据');
  const [sharedData, setSharedData] = useState('');

  const handleChildData = (data: string) => {
    console.log('收到子组件数据:', data);
  };

  return (
    <div>
      <Title level={3}>组件通信示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="1. Props 父子通信">
          <ChildA 
            message={message}
            onMessageChange={setMessage}
          />
          <Divider />
          <Text>父组件接收到的消息: {message}</Text>
        </Card>

        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Card title="2. Context 跨层级通信">
            <ChildB />
            <Divider />
            <Text>当前主题: {theme}</Text>
          </Card>
        </ThemeContext.Provider>

        <Card title="3. EventBus 事件总线通信">
          <Space direction="vertical" style={{ width: '100%' }}>
            <ChildC />
            <Divider />
            <ChildD />
          </Space>
        </Card>

        <Card title="4. 子传父通信">
          <Space direction="vertical">
            <ChildE onDataChange={handleChildData} />
            <Text type="secondary">查看控制台输出</Text>
          </Space>
        </Card>

        <Card title="5. 父传子通信">
          <Space direction="vertical">
            <Input 
              value={parentData}
              onChange={e => setParentData(e.target.value)}
              placeholder="输入要传递给子组件的数据"
            />
            <ChildF parentData={parentData} />
          </Space>
        </Card>

        <Card title="6. 兄弟组件通信">
          <Space direction="vertical">
            <ChildG />
            <ChildH />
            <Text type="secondary">通过EventBus实现</Text>
          </Space>
        </Card>

        <Card title="7. 共同父组件通信">
          <Space direction="vertical">
            <ChildI data={sharedData} setData={setSharedData} />
            <ChildJ data={sharedData} />
            <Text type="secondary">通过状态提升实现</Text>
          </Space>
        </Card>

        <Card title="通信方式说明">
          <Space direction="vertical">
            <Text strong>1. Props 通信:</Text>
            <Text>- 适用于父子组件通信</Text>
            <Text>- 通过属性传递数据和回调函数</Text>
            
            <Text strong>2. Context 通信:</Text>
            <Text>- 适用于跨多层级组件通信</Text>
            <Text>- 避免 Props 层层传递（Props Drilling）</Text>
            
            <Text strong>3. EventBus 通信:</Text>
            <Text>- 适用于任意组件间通信</Text>
            <Text>- 基于发布订阅模式</Text>
            <Text>- 需要注意内存泄漏问题</Text>
            
            <Text strong>4. 子传父通信:</Text>
            <Text>- 通过回调函数实现</Text>
            <Text>- 父组件定义函数并传递给子组件</Text>
            
            <Text strong>5. 父传子通信:</Text>
            <Text>- 最基本的Props传递</Text>
            <Text>- 单向数据流</Text>
            
            <Text strong>6. 兄弟组件通信:</Text>
            <Text>- 可通过EventBus实现</Text>
            <Text>- 也可通过共同父组件实现</Text>
            
            <Text strong>7. 状态提升:</Text>
            <Text>- 将共享状态提升到最近的共同父组件</Text>
            <Text>- React推荐的组件通信方式之一</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default CommunicationDemo; 