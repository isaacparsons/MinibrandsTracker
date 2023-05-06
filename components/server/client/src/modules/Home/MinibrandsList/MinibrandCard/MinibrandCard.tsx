import { Paper, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CollectedMinibrand, MiniBrand } from '__generated__/graphql';
import MinibrandDialog from '../MinibrandDialog/MinibrandDialog';
import { useState } from 'react';
import MinibrandBasicInfo from '../MinibrandBasicInfo';

interface Props {
  minibrand: MiniBrand;
  collectedMinibrand?: CollectedMinibrand;
}

const MinibrandCard = (props: Props) => {
  const { minibrand, collectedMinibrand } = props;

  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Paper key={`${minibrand.name}-card`} elevation={3} sx={styles.container}>
      {collectedMinibrand ? (
        <CheckCircleIcon sx={styles.collectedIcon} />
      ) : null}
      <Box
        component="div"
        onClick={handleDialogOpen}
        sx={styles.contentContainer}
      >
        <Box component="img" sx={styles.img} src={minibrand.imgUrl ?? ''} />
        <MinibrandBasicInfo minibrand={minibrand} />
      </Box>
      <MinibrandDialog
        collectedMinibrand={collectedMinibrand}
        minibrand={minibrand}
        open={open}
        handleClose={handleDialogClose}
      />
    </Paper>
  );
};

const styles = {
  container: {
    height: '100%',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  img: {
    display: 'flex',
    padding: 1,
    objectFit: 'contain',
    width: '100%',
    height: 150
    // height: '70%'
  },
  collectedIcon: {
    position: 'absolute',
    color: 'green',
    top: -15,
    left: -15,
    fontSize: 40,
    backgroundColor: 'white',
    borderRadius: 20
  }
};

export default MinibrandCard;
