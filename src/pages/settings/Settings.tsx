import React from 'react'
import { Card, Form, Switch, Input, Button, Space } from 'antd'
import { ThemeSettings } from '../../components/ThemeConfig/ThemeSettings'

export function Settings() {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('设置已更新:', values)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ThemeSettings />
      <Card title="系统设置">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            notifications: true,
            emailNotifications: true,
            username: 'admin'
          }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="系统通知"
            name="notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="邮件通知"
            name="emailNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
} 