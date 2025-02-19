import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { store } from './store';
import { useTheme } from '@/hooks/useTheme';
import zhCN from 'antd/locale/zh_CN';
import './styles/global.scss';

function App() {
  const { isDark, token, components } = useTheme();

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token,
          components,
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
        locale={zhCN}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;