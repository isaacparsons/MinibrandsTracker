import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  handleClick: () => void;
}

const SupportItem = (props: Props) => {
  const { handleClick } = props;
  return (
    <MenuItem onClick={handleClick}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Support'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <InfoIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default SupportItem;
