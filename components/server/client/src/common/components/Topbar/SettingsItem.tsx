import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  handleClose: () => void;
}

const SettingsItem = (props: Props) => {
  const { handleClose } = props;
  return (
    <MenuItem onClick={handleClose}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Settings'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <SettingsIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default SettingsItem;
