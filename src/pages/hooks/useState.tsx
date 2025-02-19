export {}; // 添加空导出声明

import { Button, Card } from 'antd';
import { useState } from 'react';

export function UseStateDemo() {
  const [count, setCount] = useState(0);

  return (
    <Card title="useState示例" className="page-card">
      <Button onClick={() => setCount(c => c + 1)}>
        点击计数: {count}
      </Button>
    </Card>
  );
} 