import { useUserStore } from '@/store/userStore';
import type { PermissionCode } from '@/types/permission';

/**
 * 权限控制 Hook
 */
export function usePermission() {
  const { permissions } = useUserStore();

  /**
   * 检查是否有指定权限
   * @param permission - 权限码
   */
  const hasPermission = (code: PermissionCode | PermissionCode[]) => {
    if (!permissions) return false;
    
    const requiredPermissions = Array.isArray(code) ? code : [code];
    return requiredPermissions.every(p => permissions.includes(p));
  };

  /**
   * 获取当前用户所有权限
   */
  const getAllPermissions = () => {
    return permissions;
  };

  return {
    hasPermission,
    getAllPermissions,
    permissions
  };
} 