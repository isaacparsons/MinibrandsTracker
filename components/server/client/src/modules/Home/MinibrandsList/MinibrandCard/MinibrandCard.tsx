import { Paper, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CollectedMinibrand, MiniBrand } from '__generated__/graphql';
import Tags from '../../../../common/components/Tags';
import MinibrandDialog from '../MinibrandDialog/MinibrandDialog';
import { useState } from 'react';

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
      <Box component="div" onClick={handleDialogOpen}>
        <Box component="img" sx={styles.img} src={minibrand.imgUrl ?? ''} />
        <Box sx={{ height: '30%' }}>
          <Typography fontSize={'1.1rem'}>{minibrand.name}</Typography>
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
    padding: 1,
    height: '100%',
    overflow: 'visible'
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: 250,
    height: '70%'
  },
  collectedIcon: {
    position: 'relative',
    color: 'green',
    top: -20,
    left: -20,
    fontSize: 40,
    backgroundColor: 'white',
    borderRadius: 20
  }
};

export default MinibrandCard;
