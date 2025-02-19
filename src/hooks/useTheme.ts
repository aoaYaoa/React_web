import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeConfig } from 'antd';

interface ThemeState {
  isDark: boolean;
  config: ThemeConfig;
  toggleTheme: (newConfig?: ThemeConfig) => void;
}

const defaultConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    fontSize: 14,
    borderRadius: 6,
    sizeUnit: 8
  },
  components: {
    Table: {
      size: 'middle'
    }
  }
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      config: defaultConfig,
      toggleTheme: (newConfig?: ThemeConfig) => set((state) => ({
        isDark: newConfig ? state.isDark : !state.isDark,
        config: newConfig || state.config
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useTheme = () => {
  const { isDark, config, toggleTheme } = useThemeStore();
  
  // 确保默认配置合并
  const mergedConfig = {
    token: { ...defaultConfig.token, ...config.token },
    components: { ...defaultConfig.components, ...config.components }
  };

  return {
    isDark,
    token: mergedConfig.token,
    components: mergedConfig.components,
    toggleTheme
  };
}; 