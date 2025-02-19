import { useState } from 'react'
import { Input, Button, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface TodoInputProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
}

export function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onChange(values.title)
      onAdd()
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Input
          placeholder="请输入待办事项"
          value={value}
          onChange={e => onChange(e.target.value)}
          onPressEnter={() => value.trim() && onAdd()}
          size="large"
          style={{ flex: 1 }}
        />
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onAdd}
          size="large"
          disabled={!value.trim()}
        >
          快速添加
        </Button>
        <Button 
          type="default" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalVisible(true)}
          size="large"
        >
          高级添加
        </Button>
      </div>

      <Modal
        title="添加待办事项"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ title: '' }}
        >
          <Form.Item
            name="title"
            label="待办事项"
            rules={[
              { required: true, message: '请输入待办事项内容' },
              { max: 50, message: '内容不能超过50个字符' }
            ]}
          >
            <Input.TextArea 
              placeholder="请输入待办事项内容"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 