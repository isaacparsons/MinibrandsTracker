import { Box, CircularProgress, Container } from '@mui/material';
import useMiniBrands from './hooks/useMiniBrands';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import { useMemo, useState } from 'react';
import useFilterMap from './hooks/useFilterMap';
import useFilterMinibrandsByType from './hooks/useFilterMinibrandsByType';
import useFilterByMinibrandsSeries from './hooks/useFilterByMinibrandsSeries';
import useFilterByMinibrandTags from './hooks/useFilterByMinibrandTags';
import useFilterBySearch from './hooks/useFilterBySearch';

import { useSessionContext } from 'context/SessionContext';
import LoggedInMinibrands from './LoggedInMinibrands';
import LoggedOutMinibrands from './LoggedOutMinibrands';
import InfinityScroll from 'common/components/InfinityScroll';

function Home() {
  const { data, cursor, loading, fetchMore } = useMiniBrands();
  const { data: minibrandsMetadata, loading: loadingMinibrandsMetadata } =
    useMinibrandsMetadata();
  const session = useSessionContext();

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [prevCursor, setPrevCursor] = useState<number | null | undefined>();
  const t0 = performance.now();

  const seriesFilter = useFilterMap('series', minibrandsMetadata?.series ?? []);
  const typesFilter = useFilterMap('types', minibrandsMetadata?.types ?? []);
  const tagsFilter = useFilterMap('tags', minibrandsMetadata?.tags ?? []);

  const filters = useMemo(() => {
    return [seriesFilter, typesFilter, tagsFilter];
  }, [seriesFilter, typesFilter, tagsFilter]);

  const filteredByType = useFilterMinibrandsByType(
    data,
    typesFilter.filterMap,
    typesFilter.allSelected
  );
  const filteredBySeries = useFilterByMinibrandsSeries(
    filteredByType,
    seriesFilter.filterMap,
    seriesFilter.allSelected
  );
  const filteredByTags = useFilterByMinibrandTags(
    filteredBySeries,
    tagsFilter.filterMap,
    tagsFilter.allSelected
  );

  const filteredMiniBrands = useFilterBySearch(filteredByTags, searchText);

  const t1 = performance.now();
  console.log(`Call to filteres took ${t1 - t0} milliseconds.`);

  const toggleFilter = () => {
    setFilterOpen((prevFilterOpenVal) => {
      return !prevFilterOpenVal;
    });
  };

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const fetchNextPage = () => {
    fetchMore({ variables: { cursor } });
    setPrevCursor(cursor);
  };

  const hasMore = useMemo(() => {
    return prevCursor !== cursor;
  }, [prevCursor, cursor]);

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
            minibrands={filteredMiniBrands}
            searchText={searchText}
            updateSearchText={updateSearchText}
            clearSearch={clearSearch}
          />
        ) : (
          <LoggedOutMinibrands
            filterOpen={filterOpen}
            toggleFilter={toggleFilter}
            filters={filters}
            minibrands={filteredMiniBrands}
            searchText={searchText}
            updateSearchText={updateSearchText}
            clearSearch={clearSearch}
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
