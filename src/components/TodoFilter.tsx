import { Radio } from 'antd'

type FilterType = 'all' | 'done' | 'todo'

interface TodoFilterProps {
  currentFilter: FilterType
  onFilterChange: (type: FilterType) => void
}

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  return (
    <Radio.Group 
      value={currentFilter}
      onChange={e => onFilterChange(e.target.value)}
      buttonStyle="solid"
    >
      <Radio.Button value="all">全部</Radio.Button>
      <Radio.Button value="done">已办</Radio.Button>
      <Radio.Button value="todo">待办</Radio.Button>
    </Radio.Group>
  )
} 