import { Box, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MiniBrand } from '__generated__/graphql';
import MinibrandCard from './MinibrandCard/MinibrandCard';
import { CollectedMinibrandMap } from '../hooks/useCollectedMinibrandsMap';
import MinibrandsListSkeleton from './MinibrandsListSkeleton';

interface Props {
  minibrands: MiniBrand[];
  collectedMinibrandsMap: CollectedMinibrandMap;
  loading: boolean;
}

const MinibrandsList = (props: Props) => {
  const { minibrands, collectedMinibrandsMap, loading } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      {minibrands.length === 0 ? (
        <Typography variant="h5">No results</Typography>
      ) : (
        <Grid container spacing={5}>
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
                >
                  <MinibrandCard
                    minibrand={minibrand}
                    collectedMinibrand={collectedMinibrandsMap[minibrand.id]}
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
