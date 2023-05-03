import React, { useState, useMemo } from 'react';
import {
  Menu,
  MenuItem,
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

const api = new Api();

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
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

  const session = useSessionContext();

  const handleLogout = async () => {
    try {
      await api.logout();
      session.logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box
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
            <AccountItem handleClose={handleClose} />
            <Admin>
              <AdminModeItem />
              <SettingsItem handleClose={handleClose} />
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
