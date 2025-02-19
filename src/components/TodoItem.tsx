import { Button, Checkbox } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface TodoItemProps {
  id: number
  title: string
  isDone: boolean
  showActions?: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ id, title, isDone, showActions = true, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="p-4 flex items-center justify-between hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={isDone}
          onChange={() => onToggle(id)}
        />
        <span className={isDone ? "text-gray-400 line-through" : "text-gray-700"}>
          {title}
        </span>
      </div>
      <Button 
        danger
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => onDelete(id)}
      >
        删除
      </Button>
    </li>
  )
} 