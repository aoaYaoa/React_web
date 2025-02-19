import React, { useState, useEffect } from 'react';
import { Button, Card, Space, Typography, Input, List } from 'antd';

const { Title, Text } = Typography;

interface Post {
  id: number;
  title: string;
}

const EffectDemo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // 模拟API调用
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPosts = [
          { id: 1, title: 'React Hooks 简介' },
          { id: 2, title: 'useEffect 使用指南' },
          { id: 3, title: 'React 性能优化' },
          { id: 4, title: 'TypeScript 最佳实践' }
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // 清理函数示例
    return () => {
      console.log('组件卸载，执行清理');
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  // 搜索过滤效果
  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, search]); // 依赖posts和search，当它们变化时执行

  // 定时器效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(timer); // 清理定时器
  }, []); // 空依赖数组，只在组件挂载时设置定时器

  return (
    <div>
      <Title level={3}>useEffect Hook 示例</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="数据获取示例">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="搜索文章"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {loading ? (
              <Text>加载中...</Text>
            ) : (
              <List
                size="small"
                bordered
                dataSource={filteredPosts}
                renderItem={post => (
                  <List.Item>
                    {post.title}
                  </List.Item>
                )}
              />
            )}
          </Space>
        </Card>

        <Card title="定时器示例">
          <Space direction="vertical">
            <Text>计数器: {count}</Text>
            <Text type="secondary">每秒自动加1</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default EffectDemo; 