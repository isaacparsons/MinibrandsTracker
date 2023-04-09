import React, { useState } from 'react';
import { List, Switch, useTheme } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import NavListItem from './NavListItem';
import UploadDialog from 'modules/Upload/UploadDialog';
import { useNavigate } from 'react-router-dom';
import { MINIBRANDS_METADATA_PATH } from '../../../App';

const COLLAPSED_WIDTH = 70;
const EXPANDED_WIDTH = 300;

const Sidenav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  return (
    <Collapse
      orientation="horizontal"
      in={open}
      collapsedSize={COLLAPSED_WIDTH}
    >
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          backgroundColor: theme.palette.primary.main,
          height: '100vh',
          width: EXPANDED_WIDTH,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <List>
          <NavListItem icon="AccountCircle" color="white" title="Account" />
        </List>
        <List>
          <NavListItem
            icon="Settings"
            color="white"
            title="Settings"
            onClick={() => navigate(MINIBRANDS_METADATA_PATH)}
          />
          <NavListItem
            icon="Upload"
            color="white"
            title="Upload"
            onClick={() => setUploadDialogOpen(true)}
          />
          <NavListItem
            icon="AdminPanelSettings"
            color="white"
            title="Admin Mode"
            component={
              <Switch
                checked={adminMode}
                onChange={() => setAdminMode(!adminMode)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
          <NavListItem icon="Logout" color="white" title="Logout" />
        </List>
      </div>
      <UploadDialog
        open={uploadDialogOpen}
        handleClose={() => setUploadDialogOpen(false)}
      />
    </Collapse>
  );
};

const styles = {
  textInput: {
    margin: 10
  }
};

export default Sidenav;
