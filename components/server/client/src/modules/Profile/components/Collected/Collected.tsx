import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import InfinityScroll from 'common/components/InfinityScroll';
import MinibrandCard from 'modules/Home/MinibrandsList/MinibrandCard/MinibrandCard';
import MinibrandsListSkeleton from 'modules/Home/MinibrandsList/MinibrandsListSkeleton';
import useCollectedMinibrands from 'modules/Profile/hooks/useCollectedMinibrands';
import { useMemo, useState } from 'react';

interface Props {
  userId: number;
}

function Collected(props: Props) {
  const { userId } = props;
  const { data, cursor, fetchMore, loading } = useCollectedMinibrands({
    userId
  });

  const [prevCursor, setPrevCursor] = useState<number | null | undefined>();

  console.log(data);

  const fetchNextPage = () => {
    fetchMore({ variables: { cursor: cursor } });
    setPrevCursor(cursor);
  };

  const hasMore = useMemo(() => {
    return prevCursor !== cursor;
  }, [prevCursor, cursor]);

  return (
    <Box>
      <InfinityScroll
        hasMore={hasMore}
        fetchMore={fetchNextPage}
        dataLength={data?.length ?? 0}
      >
        <Box sx={{ flexGrow: 1 }}>
          {data?.length === 0 ? (
            <Typography variant="h5">No results</Typography>
          ) : (
            <Grid container spacing={3}>
              {loading || !data ? (
                <MinibrandsListSkeleton />
              ) : (
                data.map((collectedMinibrand) => {
                  return (
                    <Grid
                      key={`minibrand-${collectedMinibrand.id}`}
                      marginBottom={2}
                      xs={6}
                      sm={4}
                      md={3}
                    >
                      {collectedMinibrand.minibrand && (
                        <MinibrandCard
                          minibrand={collectedMinibrand.minibrand}
                          // onCardClick={handleDialogOpen}
                          isCollected={false}
                        />
                      )}
                    </Grid>
                  );
                })
              )}
            </Grid>
          )}
        </Box>
      </InfinityScroll>
    </Box>
  );
}

export default Collected;
