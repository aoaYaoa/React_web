import React from 'react';
import { Spin } from 'antd';

export function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      padding: '24px' 
    }}>
      <Spin size="large" />
    </div>
  );
} 