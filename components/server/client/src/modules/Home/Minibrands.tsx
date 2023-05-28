import InfinityScroll from 'common/components/InfinityScroll';
import React, { useCallback } from 'react';
import LoggedInMinibrandsList from './LoggedInMinibrandsList';
import LoggedOutMinibrandsList from './LoggedOutMinibrandsList';
import useMiniBrands from '../../graphql/hooks/mutations/useMiniBrands';
import { MiniBrandsFilter } from '__generated__/graphql';
import { useSessionContext } from 'context/SessionContext';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  filter: MiniBrandsFilter;
}

function Minibrands(props: Props) {
  const { filter } = props;

  const session = useSessionContext();

  const { data, cursor, hasNextPage, loading, fetchMore } = useMiniBrands({
    filter
  });

  const fetchNextPage = useCallback(async () => {
    fetchMore({
      variables: {
        cursor,
        filter
      }
    });
  }, [fetchMore, filter, cursor]);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <InfinityScroll
      hasMore={Boolean(hasNextPage)}
      fetchMore={fetchNextPage}
      dataLength={data?.length ?? 0}
      loading={loading}
    >
      {session.authenticated ? (
        <LoggedInMinibrandsList minibrands={data ?? []} />
      ) : (
        <LoggedOutMinibrandsList minibrands={data ?? []} />
      )}
    </InfinityScroll>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Minibrands;
