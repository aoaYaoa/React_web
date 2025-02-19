import axios, { AxiosError, AxiosResponse } from 'axios'
import { message } from 'antd'
import { ApiResponse, ResponseCode } from '../types/response'
import { handleError } from './errorHandler'

/**
 * 创建 axios 实例，设置基础配置
 */
const request = axios.create({
  baseURL: '/api',  // API 基础路径
  timeout: 5000     // 请求超时时间
})

/**
 * 请求拦截器
 * 在请求发送前对请求配置做一些处理
 */
request.interceptors.request.use(
  config => {
    // 获取 token
    const token = localStorage.getItem('token')
    
    // 如果有 token 则添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 在接收到响应后对数据做一些处理
 */
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    const { code, data, message: msg } = response.data

    if (code === ResponseCode.SUCCESS) {
      return Promise.resolve(data)  // 直接返回数据部分
    }

    handleError(code, msg)
    return Promise.reject(new Error(msg))
  },
  (error: AxiosError<ApiResponse<any>>) => {
    // 处理 HTTP 错误
    if (error.response) {
      const { code, message } = error.response.data
      handleError(code, message)
    } else {
      // 网络错误等
      message.error('网络错误，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default request 