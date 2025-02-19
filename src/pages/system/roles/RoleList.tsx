import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Tree, message } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { PermissionGuard } from '../../../components/Permission/PermissionGuard'
import { usePermission } from '../../../hooks/usePermission'
import { PermissionCode } from '../../../types/permission'

interface RoleType {
  id: number
  name: string
  description: string
  permissions: PermissionCode[]
}

// 权限树形结构
const permissionTree = [
  {
    title: '仪表盘',
    key: 'dashboard:view'
  },
  {
    title: '待办事项',
    key: 'todo',
    children: [
      { title: '查看', key: 'todo:view' },
      { title: '添加', key: 'todo:add' },
      { title: '编辑', key: 'todo:edit' },
      { title: '删除', key: 'todo:delete' }
    ]
  },
  {
    title: '系统管理',
    key: 'system',
    children: [
      {
        title: '用户管理',
        key: 'user',
        children: [
          { title: '查看', key: 'user:view' },
          { title: '添加', key: 'user:add' },
          { title: '编辑', key: 'user:edit' },
          { title: '删除', key: 'user:delete' }
        ]
      },
      {
        title: '角色管理',
        key: 'role',
        children: [
          { title: '查看', key: 'role:view' },
          { title: '添加', key: 'role:add' },
          { title: '编辑', key: 'role:edit' },
          { title: '删除', key: 'role:delete' }
        ]
      }
    ]
  }
]

export function RoleList() {
  const [roles, setRoles] = useState<RoleType[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState<number | null>(null)
  const { hasPermission } = usePermission()

  const columns: TableProps<RoleType>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          {hasPermission('role:edit') && (
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
          )}
          {hasPermission('role:delete') && (
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

  const handleEdit = (role: RoleType) => {
    form.setFieldsValue({
      ...role,
      permissions: role.permissions
    })
    setEditingId(role.id)
    setModalVisible(true)
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      onOk: () => {
        setRoles(roles.filter(role => role.id !== id))
        message.success('删除成功')
      }
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingId) {
        setRoles(roles.map(role => 
          role.id === editingId ? { ...values, id: editingId } : role
        ))
        message.success('更新成功')
      } else {
        setRoles([...roles, { ...values, id: Date.now() }])
        message.success('添加成功')
      }
      setModalVisible(false)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <Card title="角色管理">
      <PermissionGuard permission="role:add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          添加角色
        </Button>
      </PermissionGuard>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingId ? '编辑角色' : '添加角色'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限配置"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Tree
              checkable
              treeData={permissionTree}
              defaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
} 