import { Card } from 'antd';
import { ThemeSettings } from '@/components/ThemeConfig/ThemeSettings';

export default function ThemePage() {
  return (
    <Card title="主题配置" className="page-card">
      <ThemeSettings />
    </Card>
  );
} 