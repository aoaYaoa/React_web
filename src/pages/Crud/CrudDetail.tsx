import React from 'react';
import { Descriptions } from 'antd';
import type { CrudItem } from '@/mock/todoData';

interface Props {
  record: CrudItem;
}

export function CrudDetail({ record }: Props) {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="姓名">{record.name}</Descriptions.Item>
      <Descriptions.Item label="年龄">{record.age}</Descriptions.Item>
      <Descriptions.Item label="地址">{record.address}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{record.email}</Descriptions.Item>
      <Descriptions.Item label="电话">{record.phone}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createdAt}</Descriptions.Item>
      <Descriptions.Item label="更新时间">{record.updatedAt}</Descriptions.Item>
      <Descriptions.Item label="状态">
        {record.status ? '启用' : '禁用'}
      </Descriptions.Item>
    </Descriptions>
  );
} 