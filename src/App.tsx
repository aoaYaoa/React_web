import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { store, persistor } from './reduxTookit/store';
import { useTheme } from '@/hooks/useTheme';
import zhCN from 'antd/locale/zh_CN';
import './styles/global.scss';

function App() {
  const { isDark, token, components } = useTheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;