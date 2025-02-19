/** 权限码类型 */
export type PermissionCode = 
  | 'todo:view'
  | 'todo:edit'
  | 'system:view'
  | 'user:view'
  | 'role:view'
  | 'stats:view'
  | 'crud:view'
  | 'crud:edit';

/** 角色类型 */
export type RoleType = 'admin' | 'user' | 'guest'

/** 角色权限映射 */
export const rolePermissions: Record<RoleType, PermissionCode[]> = {
  admin: ['dashboard:view', 'todo:view', 'todo:add', 'todo:edit', 'todo:delete', 'stats:view', 'system:view', 'user:view', 'user:add', 'user:edit', 'user:delete', 'role:view', 'role:add', 'role:edit', 'role:delete', 'menu:view', 'menu:add', 'menu:edit', 'menu:delete', 'permission:view', 'permission:add', 'permission:edit', 'permission:delete'],
  user: ['todo:view', 'todo:add', 'todo:edit', 'todo:delete'],
  guest: ['todo:view']
}

export interface Role {
  id: number
  name: string
  permissions: PermissionCode[]
}

export const adminRole: Role = {
  id: 1,
  name: 'admin',
  permissions: [
    'dashboard:view',
    'todo:view',
    'todo:add',
    'todo:edit',
    'todo:delete',
    'stats:view',
    'system:view',
    'user:view',
    'user:add',
    'user:edit',
    'user:delete',
    'role:view',
    'role:add',
    'role:edit',
    'role:delete',
    'menu:view',
    'menu:add',
    'menu:edit',
    'menu:delete',
    'permission:view',
    'permission:add',
    'permission:edit',
    'permission:delete'
  ]
} 