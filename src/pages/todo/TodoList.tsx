import { useState, useEffect } from 'react'
import { TodoItem as TodoItemType } from '../../mock/todoData'
import { todoApi } from '../../api/todo'
import { TodoItem } from '../../components/TodoItem'
import { TodoInput } from '../../components/TodoInput'
import { TodoFilter } from '../../components/TodoFilter'
import { Card, Statistic, Row, Col, Spin, message } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { PermissionGuard } from '../../components/Permission/PermissionGuard'
import { usePermission } from '../../hooks/usePermission'
import styles from './TodoList.module.scss'

export default function TodoList() {
  const [listData, setListData] = useState<TodoItemType[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'done' | 'todo'>('all')
  const [loading, setLoading] = useState(false)
  const { hasPermission } = usePermission()

  async function fetchList() {
    try {
      setLoading(true)
      const data = await todoApi.getList()
      setListData(data.reverse())
    } catch (error) {
      console.error('获取列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredData = listData
    .filter(item => {
      if (filterType === 'all') return true
      if (filterType === 'done') return item.isDone
      return !item.isDone
    })

  async function handleAdd() {
    if (inputValue.trim()) {
      try {
        const newTodo = await todoApi.add({
          title: inputValue,
          isDone: false
        })
        setListData(prev => [newTodo, ...prev])
        setInputValue('')
        message.success('添加成功')
      } catch (error) {
        console.error('添加失败:', error)
        message.error('添加失败，请重试')
      }
    }
  }

  async function handleToggle(id: number) {
    const todo = listData.find(item => item.id === id)
    if (todo) {
      try {
        const updatedTodo = await todoApi.update({
          ...todo,
          isDone: !todo.isDone
        })
        setListData(listData.map(item => 
          item.id === id ? updatedTodo : item
        ))
      } catch (error) {
        console.error('更新失败:', error)
      }
    }
  }

  async function handleDelete(id: number) {
    try {
      await todoApi.delete(id)
      setListData(listData.filter(item => item.id !== id))
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const stats = {
    total: listData.length,
    completed: listData.filter(item => item.isDone).length,
    pending: listData.filter(item => !item.isDone).length
  }

  return (
    <div className={styles.container}>
      <Card title="任务管理">
        {/* <PermissionGuard permission="stats:view"> */}
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="总任务数"
                  value={stats.total}
                  prefix={<UnorderedListOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="已完成"
                  value={stats.completed}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="待完成"
                  value={stats.pending}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>
        {/* </PermissionGuard> */}

        <Card title="待办事项列表">
          {/* <PermissionGuard permission="todo:add"> */}
            <TodoInput 
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              onAdd={handleAdd}
            />
          {/* </PermissionGuard> */}

          <div style={{ marginTop: '16px' }}>
            {loading ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '300px' 
              }}>
                <Spin size="large" tip="加载中..." />
              </div>
            ) : (
              <ul style={{ 
                borderTop: '1px solid #f0f0f0',
                borderBottom: '1px solid #f0f0f0'
              }}>
                {filteredData.map(item => (
                  <TodoItem 
                    key={item.id}
                    {...item}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    showActions={hasPermission('todo:edit')}
                  />
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <TodoFilter 
              currentFilter={filterType}
              onFilterChange={setFilterType}
            />
          </div>
        </Card>
      </Card>
    </div>
  )
} 