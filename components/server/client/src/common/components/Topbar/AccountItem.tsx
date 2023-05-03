import React, { useState, useMemo } from 'react';
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
  handleClose: () => void;
}

const AccountItem = (props: Props) => {
  const { handleClose } = props;
  return (
    <MenuItem onClick={handleClose}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Account'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <AccountCircleIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default AccountItem;
