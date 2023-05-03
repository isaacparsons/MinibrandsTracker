import {
  ListItem,
  Switch,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material';
import { useAdminModeContext } from 'context/AdminModeContext';

interface Props {}

const AdminModeItem = (props: Props) => {
  const { adminMode, toggleAdminMode } = useAdminModeContext();
  const handleToggleAdminMode = () => {
    toggleAdminMode();
  };
  return (
    <MenuItem>
      <ListItem disablePadding>
        <ListItemText
          primary={'Admin mode'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <Switch
            checked={adminMode}
            onChange={handleToggleAdminMode}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default AdminModeItem;
