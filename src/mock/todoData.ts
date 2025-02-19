import Mock from 'mockjs'

export interface TodoItem {
  id: number
  title: string
  isDone: boolean
}
export interface CrudItem {
  id: number
  name: string
  age: number
  address: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  status: boolean
  [key: string]: string | number | boolean
}
export const mockTodoList = Mock.mock({
  'list|5-10': [{
    'id|+1': 1,
    'title': '@ctitle(3, 10)',
    'isDone|1': true
  }]
}).list as TodoItem[] 
export const mockCrudList = Mock.mock({
  'list|5-10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1,
    'address': '@city',
    'email': '@email',
    'phone': '@phone',
    'createdAt': '@datetime',
    'updatedAt': '@datetime',
    'status': '@boolean'
  }]
}).list as CrudItem[] 