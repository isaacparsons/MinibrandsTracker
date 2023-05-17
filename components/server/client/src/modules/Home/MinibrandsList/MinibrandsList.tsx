import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MiniBrand } from '__generated__/graphql';
import MinibrandCard from '../components/MinibrandCard/MinibrandCard';
import { CollectedMinibrandMap } from '../hooks/useCollectedMinibrandsMap';
import MinibrandsListSkeleton from '../components/MinibrandsListSkeleton';
import MinibrandDialog from '../components/MinibrandDialog/MinibrandDialog';
import { useState } from 'react';

interface Props {
  minibrands: MiniBrand[];
  collectedMinibrandsMap: CollectedMinibrandMap;
  loading: boolean;
}

const MinibrandsList = (props: Props) => {
  const { minibrands, collectedMinibrandsMap, loading } = props;

  const [openMinibrand, setOpenMinibrand] = useState<null | MiniBrand>(null);

  const handleDialogClose = () => {
    setOpenMinibrand(null);
  };

  const handleDialogOpen = (minibrand: MiniBrand) => {
    setOpenMinibrand(minibrand);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {minibrands.length === 0 ? (
        <Typography variant="h5">No results</Typography>
      ) : (
        <Grid container spacing={3}>
          {loading ? (
            <MinibrandsListSkeleton />
          ) : (
            minibrands.map((minibrand) => {
              return (
                <Grid
                  key={`minibrand-${minibrand.id}`}
                  marginBottom={2}
                  xs={6}
                  sm={4}
                  md={3}
                >
                  <MinibrandCard
                    minibrand={minibrand}
                    onCardClick={handleDialogOpen}
                    isCollected={Boolean(collectedMinibrandsMap[minibrand.id])}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      )}
      {openMinibrand && (
        <MinibrandDialog
          collectedMinibrand={collectedMinibrandsMap[openMinibrand.id]}
          minibrand={openMinibrand}
          open={Boolean(openMinibrand)}
          handleClose={handleDialogClose}
        />
      )}
    </Box>
  );
};

export default MinibrandsList;
