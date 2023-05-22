import { Box, CircularProgress, Container } from '@mui/material';
import useMiniBrands from './hooks/useMiniBrands';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSessionContext } from 'context/SessionContext';
import LoggedInMinibrands from './LoggedInMinibrands';
import LoggedOutMinibrands from './LoggedOutMinibrands';
import InfinityScroll from 'common/components/InfinityScroll';
import SelectedMinibrandProvider from 'context/SelectedMinibrandContext';
import useFilterMinibrands from './hooks/useFilterMinibrands';
import Filter from './components/Filter/Filter';

function Home() {
  const { data: minibrandsMetadata, loading: loadingMinibrandsMetadata } =
    useMinibrandsMetadata();

  const session = useSessionContext();

  const [searchText, setSearchText] = useState('');
  const [prevCursor, setPrevCursor] = useState<number | null | undefined>();

  const { apiFilter, filters } = useFilterMinibrands(
    searchText,
    minibrandsMetadata
  );

  const { data, cursor, loading, fetchMore, refetch } = useMiniBrands({});

  useEffect(() => {
    refetch({ filter: apiFilter });
  }, [apiFilter, refetch]);

  const hasMore = useMemo(() => {
    if (!cursor) return false;
    return prevCursor !== cursor;
  }, [prevCursor, cursor]);

  const fetchNextPage = useCallback(async () => {
    setPrevCursor(cursor);
    fetchMore({
      variables: {
        cursor,
        filter: apiFilter
      }
    });
  }, [fetchMore, apiFilter, cursor]);

  const onSearchPress = (value: string) => {
    setSearchText(value);
  };

  if (loading || loadingMinibrandsMetadata || !data || !minibrandsMetadata) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SelectedMinibrandProvider>
      <Container sx={styles.container}>
        <Filter filters={filters} onSearchPress={onSearchPress} />
        <InfinityScroll
          hasMore={hasMore}
          fetchMore={fetchNextPage}
          dataLength={data?.length ?? 0}
        >
          {session.authenticated ? (
            <LoggedInMinibrands minibrands={data} />
          ) : (
            <LoggedOutMinibrands minibrands={data} />
          )}
        </InfinityScroll>
      </Container>
    </SelectedMinibrandProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 5
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Home;
