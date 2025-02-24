import React, { useEffect } from 'react';
import { Table, Form, Row, Col, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { SearchTableProps } from './types';

export function SearchTable<T extends Record<string, any>>({
  columns,
  dataSource = [],
  searchFields = [],
  onSearch,
  onReset,
  rowKey = 'id',
  variant = 'bordered',
  ...props
}: SearchTableProps<T>) {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('SearchTable dataSource:', dataSource);
  }, [dataSource]);

  const renderSearchForm = () => {
    if (!searchFields?.length) return null;

    return (
      <Form form={form} onFinish={(values) => onSearch?.(values)}>
        <Row gutter={24} style={{ marginBottom: 24 }}>
          {searchFields.map(field => (
            <Col key={field.name} span={6}>
              <Form.Item
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                {field.component}
              </Form.Item>
            </Col>
          ))}
          <Col span={6}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  搜索
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    form.resetFields();
                    onReset?.();
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <div style={{ background: '#fff', padding: 24 }}>
      {renderSearchForm()}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          ...props.pagination
        }}
        loading={!dataSource || dataSource.length === 0}
        locale={{
          emptyText: '暂无数据'
        }}
        {...props}
      />
    </div>
  );
} 