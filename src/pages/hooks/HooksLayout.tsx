import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export function HooksLayout() {
  return (
    <div className="hooks-layout">
      <Title level={2}>React Hooks 示例</Title>
      <Card>
        <Outlet />
      </Card>
    </div>
  );
} 