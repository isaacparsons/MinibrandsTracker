import {
  Button,
  Typography,
  useTheme,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { MiniBrand } from '../../../../__generated__/graphql';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDeleteMinibrand: () => void;
}

const ConfirmDeleteMinibrandDialog = (props: Props) => {
  const { handleDeleteMinibrand, open, handleClose } = props;
  const theme = useTheme();
  return (
    <Dialog onClose={handleClose} open={open} PaperProps={{}}>
      <DialogContent>
        <DialogContentText id="delete-minibrand-dialog">
          Are you sure you want to delete this minibrand?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteMinibrand} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {};

export default ConfirmDeleteMinibrandDialog;
