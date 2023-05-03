import { ListItemText, ListItemIcon, ListItem, MenuItem } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

interface Props {
  handleClose: () => void;
}

const UploadItem = (props: Props) => {
  const { handleClose } = props;
  return (
    <MenuItem onClick={handleClose}>
      <ListItem disablePadding>
        <ListItemText
          primary={'Upload'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
        <ListItemIcon>
          <UploadIcon fontSize="large" />
        </ListItemIcon>
      </ListItem>
    </MenuItem>
  );
};

export default UploadItem;
