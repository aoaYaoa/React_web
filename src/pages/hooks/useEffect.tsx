import { Button, Card } from 'antd';
import { useEffect, useState } from 'react';

export function UseEffectDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `已点击 ${count} 次`;
  }, [count]);

  return (
    <Card title="useEffect示例" className="page-card">
      <Button onClick={() => setCount(c => c + 1)}>
        更新标题计数: {count}
      </Button>
    </Card>
  );
} 