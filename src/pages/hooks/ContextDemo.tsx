import React, { createContext, useContext, useState } from 'react';
import { Button, Card, Space, Typography, Switch } from 'antd';

const { Title, Text } = Typography;

// 定义主题接口
interface Theme {
  background: string;
  color: string;
  isDark: boolean;
}

// 创建主题上下文
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: { background: '#ffffff', color: '#000000', isDark: false },
  toggleTheme: () => {}
});

// 子组件：主题消费者
const ThemedButton = () => {
  // 使用useContext获取主题上下文
  const { theme } = useContext(ThemeContext);
  
  return (
    <Button
      style={{
        background: theme.background,
        color: theme.color,
        borderColor: theme.color
      }}
    >
      主题按钮
    </Button>
  );
};

// 子组件：主题切换器
const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <Space>
      <Text>切换主题</Text>
      <Switch 
        checked={theme.isDark}
        onChange={toggleTheme}
        checkedChildren="暗色"
        unCheckedChildren="亮色"
      />
    </Space>
  );
};

// 主组件
const ContextDemo = () => {
  // 定义主题状态
  const [theme, setTheme] = useState<Theme>({
    background: '#ffffff',
    color: '#000000',
    isDark: false
  });

  // 切换主题函数
  const toggleTheme = () => {
    setTheme(prevTheme => ({
      background: prevTheme.isDark ? '#ffffff' : '#1f1f1f',
      color: prevTheme.isDark ? '#000000' : '#ffffff',
      isDark: !prevTheme.isDark
    }));
  };

  return (
    <div>
      <Title level={3}>useContext Hook 示例</Title>
      
      {/* 使用Context.Provider包装子组件 */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="主题切换示例">
            <Space direction="vertical">
              <ThemeToggler />
              <ThemedButton />
              <Text>
                通过Context共享主题状态，避免属性透传
              </Text>
            </Space>
          </Card>

          <Card title="当前主题状态">
            <pre>
              {JSON.stringify(theme, null, 2)}
            </pre>
          </Card>
        </Space>
      </ThemeContext.Provider>
    </div>
  );
};

export default ContextDemo; 