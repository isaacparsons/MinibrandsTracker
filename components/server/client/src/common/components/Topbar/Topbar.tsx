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
  MINIBRANDS_METADATA_PATH
} from 'App';
import { useNavigate } from 'react-router-dom';
import client from '../../../graphql/client';
import FriendsItem from './FriendsIcon';

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

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box
            onClick={handleLogoClick}
            component="img"
            sx={styles.img}
            src={require('../../../assets/logo.png')}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Minibrands Tracker
          </Typography>
          <IconButton
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
            <AccountItem handleClose={handleAccountClick} />
            <FriendsItem handleClose={handleFriendsClick} />
            <Admin>
              <AdminModeItem />
              <SettingsItem handleClose={handleSettingsClick} />
              <UploadItem handleClose={handleUploadClick} />
            </Admin>
            <LogoutItem handleClick={handleLogout} />
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
