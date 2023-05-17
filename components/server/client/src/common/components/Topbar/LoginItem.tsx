import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
  handleClick: () => void;
}

const LoginItem = (props: Props) => {
  const { handleClick } = props;
  return (
    <MenuItem onClick={handleClick}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Login'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <LoginIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default LoginItem;
