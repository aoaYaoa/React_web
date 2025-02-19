import React from 'react'
import type { PermissionCode } from '@/types/permission'
import { usePermission } from '../../hooks/usePermission'

interface PermissionGuardProps {
  permission: PermissionCode | PermissionCode[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

const hasPermission = (code: PermissionCode): boolean => {
  // 这里可以实现实际的权限检查逻辑
  const userPermissions = ['todo:view', 'system:view'] // 模拟用户权限
  return userPermissions.includes(code)
}

/**
 * 权限控制组件
 * @param permission - 所需权限码，可以是单个权限或权限数组
 * @param children - 需要权限控制的内容
 * @param fallback - 无权限时显示的内容
 */
export function PermissionGuard({ permission, children, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = usePermission()
  
  const permissions = Array.isArray(permission) ? permission : [permission]
  const allowed = permissions.every(p => hasPermission(p as PermissionCode))

  return allowed ? <>{children}</> : <>{fallback}</>
} 