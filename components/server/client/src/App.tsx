import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidenav from 'common/components/Sidenav';
import MinibrandsMetadataScreen from './modules/MinibrandsMetadata/index';
import { Box } from '@mui/material';
import Home from './modules/Home/index';
import Signup from 'modules/Auth/Signup/Signup';
import Login from 'modules/Auth/Login/Login';
import ForgotPassword from 'modules/Auth/ForgotPassword/ForgotPassword';
import Success from 'modules/Auth/Success/Success';
import { useSessionContext } from 'context/SessionContext';
import ProtectedRoute from './common/components/ProtectedRoute';
import Admin from './common/components/Admin';
import Topbar from './common/components/Topbar/Topbar';
import Authenticated from 'common/components/Authenticated';
import Account from 'modules/Acccount/Account';

export const MINIBRANDS_METADATA_PATH = '/minibrandsMetadata';
export const ACCOUNT_PATH = '/account';
export const HOME_PATH = '/home';
export const SIGNUP_PATH = '/signup';
export const LOGIN_PATH = '/login';
export const FORGOT_PASSWORD_PATH = '/forgot_password';
export const LOGIN_SUCCESS_PATH = '/login_success';

function App() {
  return (
    <Box
      className="App"
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <BrowserRouter>
        <Box
          display={'flex'}
          flex={1}
          flexDirection={'column'}
          sx={{ backgroundColor: 'neutral.main' }}
        >
          <Authenticated>
            <Topbar />
          </Authenticated>
          {/* <Sidenav /> */}
          <Box display={'flex'} flex={1} sx={{ justifyContent: 'center' }}>
            <Routes>
              <Route path={'/'} element={<Navigate to={LOGIN_PATH} />} />
              <Route path={LOGIN_SUCCESS_PATH} element={<Success />} />
              <Route path={SIGNUP_PATH} element={<Signup />} />
              <Route path={LOGIN_PATH} element={<Login />} />
              <Route
                path={HOME_PATH}
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ACCOUNT_PATH}
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
              <Route
                path={MINIBRANDS_METADATA_PATH}
                element={
                  <ProtectedRoute>
                    <MinibrandsMetadataScreen />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
