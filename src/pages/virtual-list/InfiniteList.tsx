import React, { useState, useEffect, useCallback } from 'react';
import { List, Card, Typography, Spin, Space } from 'antd';
import VirtualList from 'rc-virtual-list';

const { Title, Paragraph } = Typography;

interface Item {
  id: number;
  title: string;
  content: string;
}

export default function InfiniteList() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const startIndex = data.length;
    const newItems = Array.from({ length: 100 }, (_, index) => ({
      id: startIndex + index,
      title: `Item ${startIndex + index}`,
      content: `This is the content for item ${startIndex + index}`
    }));
    
    setData(prev => [...prev, ...newItems]);
    setLoading(false);
    setInitialLoading(false);
    if (data.length >= 1000) {
      setHasMore(false);
    }
  }, [data.length, hasMore, loading]);

  // 初始加载
  useEffect(() => {
    loadMoreData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (!hasMore || loading) return;
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      loadMoreData();
    }
  };

  const ContainerHeight = 400;
  const ItemHeight = 80;

  if (initialLoading) {
    return (
      <Card style={{ width: '100%', height: ContainerHeight }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Space direction="vertical" align="center">
            <Spin size="large" />
            <span>加载中...</span>
          </Space>
        </div>
      </Card>
    );
  }

  return (
    <div className="page-card">
      <h2>无限滚动列表</h2>
      <Paragraph>
        无限滚动结合虚拟列表，实现高性能的动态加载列表。当用户滚动到底部时，
        自动加载更多数据。
      </Paragraph>

      <Card title="无限滚动示例">
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={ItemHeight}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item: Item) => (
              <List.Item key={item.id} style={{ height: ItemHeight }}>
                <List.Item.Meta
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )}
          </VirtualList>
          {(loading && !initialLoading) && (
            <div style={{ 
              padding: '12px 0', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.75)',
              position: 'sticky',
              bottom: 0
            }}>
              <Space>
                <Spin />
                <span>加载更多...</span>
              </Space>
            </div>
          )}
          {!hasMore && (
            <div style={{ 
              padding: '12px 0', 
              textAlign: 'center',
              color: '#999'
            }}>
              没有更多数据了
            </div>
          )}
        </List>
      </Card>
    </div>
  );
} 