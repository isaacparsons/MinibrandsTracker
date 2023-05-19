import { Box, CircularProgress, Container } from '@mui/material';
import useMiniBrands from './hooks/useMiniBrands';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useFilterMap from './hooks/useFilterMap';

import { useSessionContext } from 'context/SessionContext';
import LoggedInMinibrands from './LoggedInMinibrands';
import LoggedOutMinibrands from './LoggedOutMinibrands';
import InfinityScroll from 'common/components/InfinityScroll';
import useMetadataIdMap from './hooks/useMetadataIdMap';
import useGetIds from './hooks/useGetIds';

function Home() {
  const { data: minibrandsMetadata, loading: loadingMinibrandsMetadata } =
    useMinibrandsMetadata();

  const tagsIdMap = useMetadataIdMap(minibrandsMetadata?.tags);
  const typesIdMap = useMetadataIdMap(minibrandsMetadata?.types);
  const seriesIdMap = useMetadataIdMap(minibrandsMetadata?.series);
  const session = useSessionContext();

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [prevCursor, setPrevCursor] = useState<number | null | undefined>();

  const seriesFilter = useFilterMap('series', minibrandsMetadata?.series ?? []);
  const typesFilter = useFilterMap('types', minibrandsMetadata?.types ?? []);
  const tagsFilter = useFilterMap('tags', minibrandsMetadata?.tags ?? []);

  const typeIds = useGetIds(typesFilter.filterMap, typesIdMap);
  const tagIds = useGetIds(tagsFilter.filterMap, tagsIdMap);
  const seriesIds = useGetIds(seriesFilter.filterMap, seriesIdMap);

  const filter = useMemo(() => {
    return searchText !== ''
      ? { search: searchText, tagIds, typeIds, seriesIds }
      : { tagIds, typeIds, seriesIds };
  }, [tagIds, typeIds, seriesIds, searchText]);

  const { data, cursor, loading, fetchMore, refetch } = useMiniBrands({});

  useEffect(() => {
    refetch({ filter });
  }, [filter, refetch]);

  const filters = useMemo(() => {
    return [seriesFilter, typesFilter, tagsFilter];
  }, [seriesFilter, typesFilter, tagsFilter]);

  const toggleFilter = () => {
    setFilterOpen((prevFilterOpenVal) => {
      return !prevFilterOpenVal;
    });
  };

  const hasMore = useMemo(() => {
    if (!cursor) return false;
    return prevCursor !== cursor;
  }, [prevCursor, cursor]);

  const fetchNextPage = useCallback(async () => {
    setPrevCursor(cursor);
    fetchMore({
      variables: {
        cursor,
        filter
      }
    });
  }, [fetchMore, filter, cursor]);

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
    <Container sx={styles.container}>
      <InfinityScroll
        hasMore={hasMore}
        fetchMore={fetchNextPage}
        dataLength={data?.length ?? 0}
      >
        {session.authenticated ? (
          <LoggedInMinibrands
            filterOpen={filterOpen}
            toggleFilter={toggleFilter}
            filters={filters}
            minibrands={data}
            onSearchPress={onSearchPress}
          />
        ) : (
          <LoggedOutMinibrands
            filterOpen={filterOpen}
            toggleFilter={toggleFilter}
            filters={filters}
            minibrands={data}
            onSearchPress={onSearchPress}
          />
        )}
      </InfinityScroll>
    </Container>
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
