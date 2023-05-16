import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

interface Props {
  handleClose: () => void;
}

const FriendsItem = (props: Props) => {
  const { handleClose } = props;
  return (
    <MenuItem onClick={handleClose}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Friends'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <GroupIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default FriendsItem;
