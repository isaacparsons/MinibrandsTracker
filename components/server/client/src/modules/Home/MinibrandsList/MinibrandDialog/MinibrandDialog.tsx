import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { MiniBrand } from '../../../../__generated__/graphql';
import Tags from '../../../../common/components/Tags';
import { useState } from 'react';
import ConfirmDeleteMinibrandDialog from './ConfirmDeleteMinibrandDialog';
import useDeleteMinibrand from './hooks/useDeleteMinibrand';

interface Props {
  minibrand: MiniBrand;
  open: boolean;
  handleClose: () => void;
}

const MinibrandDialog = (props: Props) => {
  const { minibrand, open, handleClose } = props;
  const { deleteMiniBrand, loading: deletingMinibrand } = useDeleteMinibrand();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const theme = useTheme();

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteOpen(false);
  };

  const handleOpenConfirmDeleteDialog = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteMinibrand = () => {
    deleteMiniBrand({ id: minibrand.id });
    handleCloseConfirmDeleteDialog();
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ style: styles.container }}
    >
      <DialogTitle sx={styles.header}>
        <Typography variant="h5">{minibrand.name}</Typography>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={handleOpenConfirmDeleteDialog}
        >
          <DeleteIcon fontSize="inherit" color={'error'} />
        </IconButton>
      </DialogTitle>
      <Box component="img" sx={styles.img} src={minibrand.imgUrl} />
      <Box sx={{ height: '30%' }}>
        <Typography
          lineHeight={1}
          fontSize={'1rem'}
        >{`${minibrand.type?.value}`}</Typography>
        <Typography
          lineHeight={1}
          fontSize={'1rem'}
        >{`series ${minibrand.series?.value}`}</Typography>

        <Tags tags={minibrand.tags ?? []} />
      </Box>
      <EditIcon
        sx={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          padding: 2,
          borderRadius: 10,
          backgroundColor: theme.palette.grey[400]
        }}
      />
      <ConfirmDeleteMinibrandDialog
        open={confirmDeleteOpen}
        handleClose={handleCloseConfirmDeleteDialog}
        handleDeleteMinibrand={handleDeleteMinibrand}
      />
    </Dialog>
  );
};

const styles = {
  img: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: 350,
    height: '70%'
  },
  container: {
    padding: 20,
    width: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

export default MinibrandDialog;
