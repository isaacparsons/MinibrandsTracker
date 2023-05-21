import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  CollectedMinibrand,
  MiniBrand
} from '../../../../__generated__/graphql';
import Tags from '../../../../common/components/Tags';
import { useState } from 'react';
import ConfirmDeleteMinibrandDialog from './ConfirmDeleteMinibrandDialog';
import useDeleteMinibrand from './hooks/useDeleteMinibrand';
import useCollectMinibrand from './hooks/useCollectMinibrand';
import useUpdateCollectedMinibrand from './hooks/useUpdateCollectedMinibrand';
import CollectOrUpdateMinibrand from './CollectOrUpdateMinibrand';
import useConfetti from './hooks/useConfetti';
import { useSessionContext } from 'context/SessionContext';
import EditMinibrandContent from './EditMinibrandContent';

interface Props {
  minibrand: MiniBrand;
  collectedMinibrand?: CollectedMinibrand;
  canEdit: boolean;
  open: boolean;
  handleClose: () => void;
}

const MinibrandDialog = (props: Props) => {
  const { minibrand, collectedMinibrand, open, handleClose, canEdit } = props;
  const session = useSessionContext();
  const { trigger, Confetti } = useConfetti();

  const { deleteMiniBrand, loading: deletingMinibrand } = useDeleteMinibrand();
  const { collectMinibrand, loading: collectingMinibrand } =
    useCollectMinibrand(trigger);
  const { updateCollectedMinibrand, loading: updatingMinibrand } =
    useUpdateCollectedMinibrand();
  const theme = useTheme();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    if (canEdit) {
      setEditing(true);
    }
  };

  const handleFinishEditing = () => {
    setEditing(false);
    handleClose();
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteOpen(false);
  };

  const handleOpenConfirmDeleteDialog = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteMinibrand = () => {
    if (minibrand.id) {
      deleteMiniBrand({ id: minibrand.id });
    }
    handleCloseConfirmDeleteDialog();
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ style: styles.container }}
    >
      {editing ? (
        <EditMinibrandContent
          minibrand={minibrand}
          handleFinishEditing={handleFinishEditing}
        />
      ) : (
        <>
          {Confetti}
          <DialogTitle sx={styles.header}>
            <Typography variant="h5">{minibrand.name}</Typography>
            {canEdit ? (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={handleOpenConfirmDeleteDialog}
              >
                <DeleteIcon fontSize="inherit" color={'error'} />
              </IconButton>
            ) : (
              <IconButton size="large" onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          </DialogTitle>
          <Box component="img" sx={styles.img} src={minibrand.imgUrl ?? ''} />
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
            <Box sx={styles.btnContainer}>
              {session.authenticated ? (
                <CollectOrUpdateMinibrand
                  minibrandId={minibrand.id}
                  collectedMinibrand={collectedMinibrand}
                  handleCollectMinibrand={collectMinibrand}
                  handleUpdateMinibrand={updateCollectedMinibrand}
                  loading={collectingMinibrand || updatingMinibrand}
                />
              ) : (
                <Button variant="contained" disabled={true}>
                  Login to collect minibrand
                </Button>
              )}
            </Box>
          </Box>
          {canEdit && (
            <IconButton size="large" onClick={handleEditClick}>
              <EditIcon sx={styles.editIcon(theme)} />
            </IconButton>
          )}

          <ConfirmDeleteMinibrandDialog
            open={confirmDeleteOpen}
            handleClose={handleCloseConfirmDeleteDialog}
            handleDeleteMinibrand={handleDeleteMinibrand}
          />
        </>
      )}
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
  editIcon: (theme: Theme) => {
    return {
      position: 'absolute',
      right: 20,
      bottom: 20,
      padding: 2,
      borderRadius: 10,
      backgroundColor: theme.palette.grey[400]
    };
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default MinibrandDialog;
