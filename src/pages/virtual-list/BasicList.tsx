import React, { useState, useRef, useEffect } from 'react';
import { List, Card, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';

const { Title, Paragraph } = Typography;

interface Item {
  id: number;
  title: string;
  content: string;
}

export default function BasicList() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 生成模拟数据
  useEffect(() => {
    const items = Array.from({ length: 10000 }, (_, index) => ({
      id: index,
      title: `Item ${index}`,
      content: `This is the content for item ${index}`
    }));
    setData(items);
  }, []);

  const ContainerHeight = 400;
  const ItemHeight = 80;

  return (
    <div className="page-card">
      <h2>基础虚拟列表</h2>
      <Paragraph>
        虚拟列表是一种用于优化长列表性能的技术，它只渲染可视区域内的元素，
        从而减少DOM节点数量，提高渲染性能。
      </Paragraph>

      <Card title="虚拟滚动示例">
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={ItemHeight}
            itemKey="id"
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
        </List>
      </Card>
    </div>
  );
} 