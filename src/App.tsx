import { ConfigProvider } from 'antd';
import UsersPage from './pages/UsersPage';

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'black',
        colorBgContainer: 'white',
        fontFamily: 'DMSans',
        fontSize: 16
      },
    }}
  >
    <UsersPage />
  </ConfigProvider>
);

export default App;
