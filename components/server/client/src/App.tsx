import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MinibrandsMetadataScreen from './modules/MinibrandsMetadata/index';
import { Box } from '@mui/material';
import Home from './modules/Home/index';
import Signup from 'modules/Auth/Signup/Signup';
import Login from 'modules/Auth/Login/Login';
import ForgotPassword from 'modules/Auth/ForgotPassword/ForgotPassword';
import Success from 'modules/Auth/Success/Success';
import ProtectedRoute from './common/components/ProtectedRoute';
import Topbar from './common/components/Topbar/Topbar';
import Authenticated from 'common/components/Authenticated';
import Account from 'modules/Account/Account';
import ChangePassword from 'modules/Auth/ForgotPassword/ChangePassword';
import Friends from 'modules/Friends/Friends';
import Profile from 'modules/Profile/Profile';
import AddFriend from 'modules/Friends/components/AddFriend/AddFriend';
import Api from 'api';
import { useCallback, useEffect } from 'react';
import { useSessionContext } from 'context/SessionContext';
import Support from 'modules/Support/Support';

export const MINIBRANDS_METADATA_PATH = '/minibrandsMetadata';
export const ACCOUNT_PATH = '/account';
export const HOME_PATH = '/home';
export const SIGNUP_PATH = '/signup';
export const LOGIN_PATH = '/login';
export const FORGOT_PASSWORD_PATH = '/forgot_password';
export const CHANGE_PASSWORD_PATH = '/change_password';
export const LOGIN_SUCCESS_PATH = '/login_success';
export const FRIENDS_PATH = '/friends';
export const ADD_FRIENDS_PATH = '/add_friend';
export const PROFILE_PATH = '/profile';
export const SUPPORT_PATH = '/support';

const api = new Api();

function App() {
  const session = useSessionContext();

  const checkSession = useCallback(async () => {
    try {
      const response = await api.isSessionAuthentic();
      if (response.status === 200) {
        session.login();
      }
    } catch (error) {
      console.log(error);
    }
  }, [session]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Box className="App" sx={styles.container}>
      <BrowserRouter>
        <Box
          display={'flex'}
          flex={1}
          flexDirection={'column'}
          sx={{ backgroundColor: 'neutral.main' }}
        >
          <Topbar />
          <Box sx={styles.contentContainer}>
            <Routes>
              <Route path={'/'} element={<Navigate to={HOME_PATH} />} />
              <Route path={LOGIN_SUCCESS_PATH} element={<Success />} />
              <Route path={SIGNUP_PATH} element={<Signup />} />
              <Route path={LOGIN_PATH} element={<Login />} />
              <Route
                path={FRIENDS_PATH}
                element={
                  <ProtectedRoute>
                    <Friends />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ADD_FRIENDS_PATH}
                element={
                  <ProtectedRoute>
                    <AddFriend />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`${PROFILE_PATH}/:userId`}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path={HOME_PATH} element={<Home />} />
              <Route
                path={ACCOUNT_PATH}
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
              <Route path={CHANGE_PASSWORD_PATH} element={<ChangePassword />} />
              <Route
                path={MINIBRANDS_METADATA_PATH}
                element={
                  <ProtectedRoute>
                    <MinibrandsMetadataScreen />
                  </ProtectedRoute>
                }
              />
              <Route path={SUPPORT_PATH} element={<Support />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  }
};

export default App;
