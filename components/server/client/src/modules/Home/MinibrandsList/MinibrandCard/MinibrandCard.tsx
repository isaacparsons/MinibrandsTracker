import { Paper, Box, Typography } from '@mui/material';
import { MiniBrand } from '__generated__/graphql';
import Tags from '../../../../common/components/Tags';
import MinibrandDialog from '../MinibrandDialog/MinibrandDialog';
import { useState } from 'react';

interface Props {
  minibrand: MiniBrand;
}

const MinibrandCard = (props: Props) => {
  const { minibrand } = props;

  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Paper key={`${minibrand.name}-card`} elevation={3} sx={styles.container}>
      <Box component="div" onClick={handleDialogOpen}>
        <Box component="img" sx={styles.img} src={minibrand.imgUrl} />
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
    overflow: 'auto'
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: 250,
    height: '70%'
  }
};

export default MinibrandCard;
