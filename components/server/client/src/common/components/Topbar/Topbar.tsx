import React, { useState, useMemo } from 'react';
import {
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminModeItem from './AdminModeItem';
import AccountItem from './AccountItem';
import SettingsItem from './SettingsItem';
import UploadDialog from 'modules/Upload/UploadDialog';
import UploadItem from './UploadItem';
import Admin from '../Admin';
import { useSessionContext } from 'context/SessionContext';
import LogoutItem from './LogoutItem';
import Api from 'api';
import {
  ACCOUNT_PATH,
  FRIENDS_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MINIBRANDS_METADATA_PATH
} from 'App';
import { useNavigate } from 'react-router-dom';
import client from '../../../graphql/client';
import FriendsItem from './FriendsIcon';
import LoginItem from './LoginItem';

const api = new Api();

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const navigate = useNavigate();
  const session = useSessionContext();

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = () => {
    handleClose();
    setUploadDialogOpen(true);
  };

  const handleSettingsClick = () => {
    handleClose();
    navigate(MINIBRANDS_METADATA_PATH);
  };
  const handleLogoClick = () => {
    navigate(HOME_PATH);
  };

  const handleAccountClick = () => {
    handleClose();
    navigate(ACCOUNT_PATH);
  };

  const handleFriendsClick = () => {
    handleClose();
    navigate(FRIENDS_PATH);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      session.logout();
      client.clearStore();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClick = async () => {
    handleClose();
    navigate(LOGIN_PATH);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box
            key="topbar-logo"
            onClick={handleLogoClick}
            component="img"
            sx={styles.img}
            src={require('../../../assets/logo.png')}
          />
          <Typography
            key="topbar-title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'white' }}
          >
            Minibrands Tracker
          </Typography>
          <IconButton
            key="topbar-menu"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            {session.authenticated ? (
              [
                <AccountItem
                  key="account-menu-item"
                  handleClose={handleAccountClick}
                />,
                <FriendsItem
                  key="friends-menu-item"
                  handleClose={handleFriendsClick}
                />,
                <Admin key="topbar-menu-item-admin">
                  <AdminModeItem key="admin-mode-menu-item" />
                  <SettingsItem
                    key="settings-menu-item"
                    handleClose={handleSettingsClick}
                  />
                  <UploadItem
                    key="upload-menu-item"
                    handleClose={handleUploadClick}
                  />
                </Admin>,
                <LogoutItem key="logout-menu-item" handleClick={handleLogout} />
              ]
            ) : (
              <LoginItem handleClick={handleLoginClick} />
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <UploadDialog
        open={uploadDialogOpen}
        handleClose={() => setUploadDialogOpen(false)}
      />
    </Box>
  );
}

const styles = {
  img: {
    objectFit: 'contain',
    maxHeight: 100
  }
};
