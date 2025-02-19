import { Dropdown, Button, Tooltip } from 'antd';
import { BulbOutlined, CheckOutlined } from '@ant-design/icons';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/hooks/useLocale';
import styles from './ThemeSwitch.module.scss';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const { messages } = useLocale();

  const items = [
    {
      key: 'light',
      label: (
        <div className={styles.themeItem}>
          <span>{messages.theme.light}</span>
          {theme === 'light' && <CheckOutlined />}
        </div>
      )
    },
    {
      key: 'dark',
      label: (
        <div className={styles.themeItem}>
          <span>{messages.theme.dark}</span>
          {theme === 'dark' && <CheckOutlined />}
        </div>
      )
    },
    {
      key: 'system',
      label: (
        <div className={styles.themeItem}>
          <span>{messages.theme.system}</span>
          {theme === 'system' && <CheckOutlined />}
        </div>
      )
    }
  ];

  return (
    <Dropdown 
      menu={{ 
        items,
        onClick: ({ key }) => setTheme(key as 'light' | 'dark' | 'system')
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Tooltip title={messages.theme.title}>
        <Button type="text" icon={<BulbOutlined className={styles.icon} />} />
      </Tooltip>
    </Dropdown>
  );
} 