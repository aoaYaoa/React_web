import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

export function UserDropdown() {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
      onClick: () => navigate('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout();
        navigate('/login');
      }
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
} 