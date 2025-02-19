import React, { useMemo } from 'react';
import { Table, Form, Row, Col, Button, Space, Card, Skeleton } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { SearchTableProps } from './types';
import styles from './index.module.scss';

export function SearchTable<T extends Record<string, any>>({
  columns,
  dataSource,
  searchFields = [],
  formProps,
  showSearch = true,
  showToolbar = true,
  toolbarActions = [],
  onSearch,
  onReset,
  virtualScroll,
  rowHeight = 54,
  loading,
  ...tableProps
}: SearchTableProps<T>) {
  const [form] = Form.useForm();

  const renderSearch = () => {
    if (!showSearch || searchFields.length === 0) return null;

    return (
      <Card className={styles.search} bordered={false}>
        <Form 
          form={form} 
          onFinish={onSearch}
          layout="horizontal"
          {...formProps}
        >
          <Row gutter={24}>
            {searchFields.map(field => (
              <Col key={field.name} span={field.span || 6}>
                <Form.Item 
                  name={field.name} 
                  label={field.label}
                  rules={field.rules}
                >
                  {field.component}
                </Form.Item>
              </Col>
            ))}
            <Col span={6}>
              <Form.Item label=" " colon={false}>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SearchOutlined />}
                  >
                    搜索
                  </Button>
                  <Button
                    onClick={() => {
                      form.resetFields();
                      onReset?.();
                    }}
                    icon={<ReloadOutlined />}
                  >
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };

  const renderToolbar = () => {
    if (!showToolbar) return null;

    return (
      <div className={styles.toolbar} style={{ justifyContent: 'right' }}>
        <Space>
          {toolbarActions}
        </Space>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          {renderSearch()}
          {renderToolbar()}
          <Card bordered={false}>
            <Table 
              columns={columns}
              dataSource={dataSource}
              rowKey="id"
              scroll={{ x: 'max-content' }}
              pagination={{
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
                ...tableProps.pagination
              }}
              {...tableProps}
            />
          </Card>
        </>
      )}
    </div>
  );
} 