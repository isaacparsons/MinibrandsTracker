import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
  handleClick: () => void;
}

const LogoutItem = (props: Props) => {
  const { handleClick } = props;
  return (
    <MenuItem onClick={handleClick}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Logout'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <LogoutIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default LogoutItem;
