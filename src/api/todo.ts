import request from '../utils/request'
import { TodoItem } from '../mock/todoData'
import Mock from 'mockjs'
import { ApiResponse, ResponseCode } from '../types/response'
import { pexelsKey, pexelsBaseUrl } from '@/config/apiKey'

/**
 * 配置 Mock 请求延迟
 * 模拟真实的网络请求延迟
 */
Mock.setup({
  timeout: '300-600'  // 300-600ms 的随机延迟
})

/**
 * Mock API 响应包装器
 */
const mockResponse = <T>(data: T, code = ResponseCode.SUCCESS, message = 'success'): ApiResponse<T> => ({
  code,
  data,
  message
})

/**
 * Mock API 接口定义
 */

// GET 请求：获取待办事项列表
Mock.mock('/api/todos', 'get', mockResponse(
  Mock.mock({
    'list|5-10': [{  // 生成 5-10 条随机数据
      'id|+1': 1,    // ID 自增
      'title': '@ctitle(3, 10)',  // 随机中文标题
      'isDone|1': true  // 随机完成状态
    }]
  }).list
))

// POST 请求：添加待办事项
Mock.mock('/api/todos', 'post', (options) => {
  const body = JSON.parse(options.body)
  return mockResponse({
    ...body,
    id: Mock.Random.integer(1000, 9999)  // 生成随机 ID
  })
})

// PUT 请求：更新待办事项
Mock.mock(new RegExp('/api/todos/\\d+'), 'put', (options) => {
  return mockResponse(JSON.parse(options.body))
})

// DELETE 请求：删除待办事项
Mock.mock(new RegExp('/api/todos/\\d+'), 'delete', () => {
  return mockResponse(null)
})

/**
 * Todo API 服务
 * 封装所有与待办事项相关的接口请求
 */
export const todoApi = {
  /**
   * 获取所有待办事项
   * @returns Promise<ApiResponse<TodoItem[]>>
   */
  getList() {
    return request.get<any, TodoItem[]>('/todos')
  },

  /**
   * 添加待办事项
   * @param todo - 不包含 id 的待办事项数据
   */
  add(todo: Omit<TodoItem, 'id'>) {
    return request.post<any, TodoItem>('/todos', todo)
  },

  /**
   * 更新待办事项
   * @param todo - 完整的待办事项数据
   */
  update(todo: TodoItem) {
    return request.put<any, TodoItem>(`/todos/${todo.id}`, todo)
  },

  /**
   * 删除待办事项
   * @param id - 待办事项 ID
   */
  delete(id: number) {
    return request.delete<any, void>(`/todos/${id}`)
  }
}

export async function getImages(query: string, page: number = 1) {
  try {
    const response = await fetch(
      `${pexelsBaseUrl}/search?query=${query}&page=${page}&per_page=10`,
      {
        headers: {
          Authorization: pexelsKey
        }
      }
    );
    const data = await response.json();
    // 确保每个图片有唯一的 key
    return data.photos.map((photo: any) => ({
      ...photo,
      key: `${photo.id}-${Date.now()}` // 添加时间戳确保唯一性
    }));
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return [];
  }
} 