import React, { useState } from 'react';
import {
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as MUIcon from '@mui/icons-material';

interface Props {
  color: string;
  icon?: keyof typeof MUIcon;
  component?: any;
  title: string;
  onClick?: () => void;
}

const NavListItem = (props: Props) => {
  const { color, icon, title, component, onClick } = props;
  const theme = useTheme();
  const Icon = icon && MUIcon[icon];
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        {component ? (
          component
        ) : (
          <ListItemIcon>
            {Icon && <Icon htmlColor={color} fontSize="large" />}
          </ListItemIcon>
        )}
        <ListItemText
          primary={title}
          primaryTypographyProps={{ color: color, variant: 'h6' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const styles = {
  textInput: {
    margin: 10
  }
};

export default NavListItem;
