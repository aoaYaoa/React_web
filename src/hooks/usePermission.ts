import { useSelector } from 'react-redux';
import type { RootState } from '@/reduxTookit/store';
import type { PermissionCode } from '@/types/permission';

/**
 * 权限控制 Hook
 */
export function usePermission() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  /**
   * 检查是否有指定权限
   * @param permission - 权限码
   */
  const hasPermission = (code: PermissionCode | PermissionCode[]) => {
    // admin 用户拥有所有权限
    if (userInfo?.role === 'admin') return true;
    
    if (!userInfo?.permissions) return false;
    const requiredPermissions = Array.isArray(code) ? code : [code];
    return requiredPermissions.every(p => userInfo.permissions.includes(p));
  };

  /**
   * 获取当前用户所有权限
   */
  const getAllPermissions = () => {
    return userInfo?.permissions || [];
  };

  return {
    hasPermission,
    getAllPermissions,
    permissions: userInfo?.permissions || [],
    isAdmin: userInfo?.role === 'admin'
  };
} 