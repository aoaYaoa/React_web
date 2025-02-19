import { message } from 'antd'
import { ResponseCode } from '../types/response'
import { router } from '../router'

/** 错误消息映射 */
const errorMessages: Record<number, string> = {
  [ResponseCode.UNAUTHORIZED]: '请先登录',
  [ResponseCode.FORBIDDEN]: '无权访问',
  [ResponseCode.NOT_FOUND]: '请求的资源不存在',
  [ResponseCode.SERVER_ERROR]: '服务器错误',
  [ResponseCode.BAD_REQUEST]: '请求参数错误',
  [ResponseCode.TOKEN_EXPIRED]: '登录已过期，请重新登录',
  [ResponseCode.INVALID_PARAMS]: '参数验证失败'
}

/**
 * 统一错误处理
 * @param code - 错误码
 * @param msg - 错误信息
 */
export function handleError(code: number, msg?: string) {
  // 获取错误信息
  const errorMsg = msg || errorMessages[code] || '未知错误'
  
  // 显示错误提示
  message.error(errorMsg)

  // 特殊错误码处理
  switch (code) {
    case ResponseCode.UNAUTHORIZED:
    case ResponseCode.TOKEN_EXPIRED:
      // 跳转到登录页
      router.navigate('/login')
      break
    case ResponseCode.FORBIDDEN:
      router.navigate('/403')
      break
    case ResponseCode.SERVER_ERROR:
      router.navigate('/500')
      break
  }
} 