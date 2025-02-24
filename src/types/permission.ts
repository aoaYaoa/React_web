/** 权限码类型 */
export type PermissionCode = 
  | 'dashboard:view' 
  | 'todo:view' | 'todo:add' | 'todo:edit' | 'todo:delete'
  | 'stats:view' 
  | 'system:view'
  | 'user:view' | 'user:add' | 'user:edit' | 'user:delete'
  | 'role:view' | 'role:add' | 'role:edit' | 'role:delete'
  | 'menu:view' | 'menu:add' | 'menu:edit' | 'menu:delete'
  | 'permission:view' | 'permission:add' | 'permission:edit' | 'permission:delete'
  | 'product:view' | 'product:add' | 'product:edit' | 'product:delete'
  | 'cart:view'
  | 'upload:view'
  | 'state:view';

/** 角色类型 */
export type RoleType = 'admin' | 'user' | 'guest';

/** 角色权限映射 */
export const rolePermissions: Record<RoleType, PermissionCode[]> = {
  admin: [
    'dashboard:view',
    'todo:view', 'todo:add', 'todo:edit', 'todo:delete',
    'stats:view',
    'system:view',
    'user:view', 'user:add', 'user:edit', 'user:delete',
    'role:view', 'role:add', 'role:edit', 'role:delete',
    'menu:view', 'menu:add', 'menu:edit', 'menu:delete',
    'permission:view', 'permission:add', 'permission:edit', 'permission:delete',
    'product:view', 'product:add', 'product:edit', 'product:delete',
    'cart:view',
    'upload:view',
    'state:view'
  ],
  user: ['todo:view', 'todo:add', 'todo:edit', 'todo:delete', 'cart:view'],
  guest: ['todo:view']
};

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
    'permission:delete',
    'product:view',
    'product:add',
    'product:edit',
    'product:delete',
    'cart:view',
    'upload:view',
    'state:view'
  ]
}

// 默认管理员权限
export const defaultAdminPermissions: PermissionCode[] = rolePermissions.admin; 