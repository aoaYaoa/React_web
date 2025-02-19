/** 通用响应状态码 */
export enum ResponseCode {
  SUCCESS = 200,           // 成功
  UNAUTHORIZED = 401,      // 未授权
  FORBIDDEN = 403,         // 禁止访问
  NOT_FOUND = 404,         // 资源不存在
  SERVER_ERROR = 500,      // 服务器错误
  BAD_REQUEST = 400,       // 请求参数错误
  TOKEN_EXPIRED = 10001,   // token过期
  INVALID_PARAMS = 10002   // 参数验证失败
}

/** 通用响应结构 */
export interface ApiResponse<T = any> {
  code: ResponseCode;
  data: T;
  message: string;
} 