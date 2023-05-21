import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MiniBrand } from '__generated__/graphql';
import MinibrandCard from '../MinibrandCard/MinibrandCard';
import { CollectedMinibrandMap } from '../../hooks/useCollectedMinibrandsMap';
import MinibrandsListSkeleton from '../MinibrandsListSkeleton';
import MinibrandDialog from '../MinibrandDialog/MinibrandDialog';
import { useState } from 'react';
import NoResultsCard from 'common/components/NoResultsCard';
import { useSelectedMinibrandContext } from 'context/SelectedMinibrandContext';

interface Props {
  minibrands: MiniBrand[];
  collectedMinibrandsMap: CollectedMinibrandMap;
  loading: boolean;
}

const MinibrandsList = (props: Props) => {
  const { minibrands, collectedMinibrandsMap, loading } = props;

  const { handleSelectMinibrand } = useSelectedMinibrandContext();

  const [openMinibrand, setOpenMinibrand] = useState<null | MiniBrand>(null);

  const handleDialogClose = () => {
    setOpenMinibrand(null);
  };

  const handleDialogOpen = (minibrand: MiniBrand) => {
    handleSelectMinibrand(minibrand, collectedMinibrandsMap[minibrand.id]);
    // setOpenMinibrand(minibrand);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {minibrands.length === 0 ? (
        <NoResultsCard />
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
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
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
    </Box>
  );
};

export default MinibrandsList;
