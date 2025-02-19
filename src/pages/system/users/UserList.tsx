import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { PermissionGuard } from '../../../components/Permission/PermissionGuard'
import { usePermission } from '../../../hooks/usePermission'

interface User {
  id: number
  username: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState<number | null>(null)

  const { hasPermission } = usePermission()

  const columns: TableProps<User>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => (
        <Select
          value={status}
          style={{ width: 100 }}
          options={[
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' }
          ]}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          {hasPermission('user:edit') && (
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
          )}
          {hasPermission('user:delete') && (
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            >
              删除
            </Button>
          )}
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    form.resetFields()
    setEditingId(null)
    setModalVisible(true)
  }

  const handleEdit = (user: User) => {
    form.setFieldsValue(user)
    setEditingId(user.id)
    setModalVisible(true)
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk: () => {
        setUsers(users.filter(user => user.id !== id))
        message.success('删除成功')
      }
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingId) {
        setUsers(users.map(user => 
          user.id === editingId ? { ...values, id: editingId } : user
        ))
        message.success('更新成功')
      } else {
        setUsers([...users, { ...values, id: Date.now() }])
        message.success('添加成功')
      }
      setModalVisible(false)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <Card title="用户管理">
      <PermissionGuard permission="user:add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          添加用户
        </Button>
      </PermissionGuard>

      <Table
        columns={columns.map(column => {
          if (column.key === 'action') {
            return {
              ...column,
              render: (_, record) => (
                <Space>
                  {hasPermission('user:edit') && (
                    <Button 
                      type="link" 
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                    >
                      编辑
                    </Button>
                  )}
                  {hasPermission('user:delete') && (
                    <Button 
                      type="link" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record.id)}
                    >
                      删除
                    </Button>
                  )}
                </Space>
              )
            }
          }
          return column
        })}
        dataSource={users}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingId ? '编辑用户' : '添加用户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: '管理员', value: 'admin' },
                { label: '普通用户', value: 'user' }
              ]}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: '启用', value: 'active' },
                { label: '禁用', value: 'inactive' }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
} 