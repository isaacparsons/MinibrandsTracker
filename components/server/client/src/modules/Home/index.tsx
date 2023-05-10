import { Box, CircularProgress, Container } from '@mui/material';
import useMiniBrands from './hooks/useMiniBrands';
import MinibrandsList from './MinibrandsList/MinibrandsList';
import FilterInput from './Filter/FilterInput/FilterInput';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import { useMemo, useState } from 'react';
import useFilterMap from './hooks/useFilterMap';
import FilterList from './Filter/FilterInput/FilterList';
import useFilterMinibrandsByType from './hooks/useFilterMinibrandsByType';
import useFilterByMinibrandsSeries from './hooks/useFilterByMinibrandsSeries';
import useFilterByMinibrandTags from './hooks/useFilterByMinibrandTags';
import useFilterBySearch from './hooks/useFilterBySearch';
import useMe from '../../common/hooks/useMe';
import useCollectedMinibrandsMap from './hooks/useCollectedMinibrandsMap';
import useNotCollectedMinibrandsMap from './hooks/useNotCollectedMinibrandsMap';
import useFilterByCollected from './hooks/useFilterByCollected';
import useMinibrandsMap from './hooks/useMinibrandsMap';
import FilterBar from './Filter/FilterBar/FilterBar';

function Home() {
  const { data: me, loading: loadingMe } = useMe();
  const { data, loading } = useMiniBrands();
  const { data: minibrandsMetadata } = useMinibrandsMetadata();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const collectedMinibrandsMap = useCollectedMinibrandsMap(me?.collected);
  const minibrandMap = useMinibrandsMap(data);
  const notCollectedMinibrandsMap = useNotCollectedMinibrandsMap(
    data,
    collectedMinibrandsMap
  );

  const {
    filterMap: seriesFilterMap,
    updateFilterMap: updateSeriesFilterMap,
    selectAll: selectAllSeries,
    allSelected: allSeriesSelected,
    unSelectAll: unSelectAllSeries
  } = useFilterMap(minibrandsMetadata?.series ?? []);

  const {
    filterMap: typesFilterMap,
    updateFilterMap: updateTypesFilterMap,
    selectAll: selectAllTypes,
    allSelected: allTypesSelected,
    unSelectAll: unSelectAllTypes
  } = useFilterMap(minibrandsMetadata?.types ?? []);

  const {
    filterMap: tagsFilterMap,
    updateFilterMap: updateTagsFilterMap,
    selectAll: selectAllTags,
    allSelected: allTagsSelected,
    unSelectAll: unSelectAllTags
  } = useFilterMap(minibrandsMetadata?.tags ?? []);

  const {
    filterMap: collectedFilterMap,
    updateFilterMap: updateCollectedFilterMap,
    selectAll: selectAllCollected,
    allSelected: allCollectedSelected,
    unSelectAll: unselectAllCollected
  } = useFilterMap([{ value: 'collected' }, { value: 'not-collected' }] ?? []);

  const filteredByCollectionStatus = useFilterByCollected(
    minibrandMap,
    collectedMinibrandsMap,
    notCollectedMinibrandsMap,
    collectedFilterMap
  );
  const filteredByType = useFilterMinibrandsByType(
    filteredByCollectionStatus,
    typesFilterMap,
    allTypesSelected
  );
  const filteredBySeries = useFilterByMinibrandsSeries(
    filteredByType,
    seriesFilterMap,
    allSeriesSelected
  );
  const filteredByTags = useFilterByMinibrandTags(
    filteredBySeries,
    tagsFilterMap,
    allTagsSelected
  );

  const filteredMiniBrands = useFilterBySearch(filteredByTags, searchText);

  const handleSelectAll = () => {
    selectAllSeries();
    selectAllTypes();
    selectAllTags();
  };
  const handleUnSelectAll = () => {
    unSelectAllSeries();
    unSelectAllTypes();
    unSelectAllTags();
  };

  const allSelected = useMemo(() => {
    return allTagsSelected && allTypesSelected && allSeriesSelected;
  }, [allTagsSelected, allTypesSelected, allSeriesSelected]);

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

  if (loading || loadingMe) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={styles.container}>
      <Box sx={styles.contentContainer}>
        <FilterBar
          searchText={searchText}
          updateSearchText={updateSearchText}
          toggleFilter={toggleFilter}
          clearSearch={clearSearch}
        />
        <FilterInput
          open={filterOpen}
          selectAll={handleSelectAll}
          unSelectAll={handleUnSelectAll}
          allSelected={allSelected}
        >
          <FilterList
            type="collected status"
            filterMap={collectedFilterMap}
            updateFilterMap={updateCollectedFilterMap}
            selectAll={selectAllCollected}
            unSelectAll={unselectAllCollected}
            allSelected={allCollectedSelected}
          />
          <FilterList
            type="series"
            filterMap={seriesFilterMap}
            updateFilterMap={updateSeriesFilterMap}
            selectAll={selectAllSeries}
            unSelectAll={unSelectAllSeries}
            allSelected={allSeriesSelected}
          />
          <FilterList
            type="types"
            filterMap={typesFilterMap}
            updateFilterMap={updateTypesFilterMap}
            selectAll={selectAllTypes}
            unSelectAll={unSelectAllTypes}
            allSelected={allTypesSelected}
          />
          <FilterList
            type="tags"
            filterMap={tagsFilterMap}
            updateFilterMap={updateTagsFilterMap}
            selectAll={selectAllTags}
            unSelectAll={unSelectAllTags}
            allSelected={allTagsSelected}
          />
        </FilterInput>
      </Box>
      <MinibrandsList
        loading={loading}
        minibrands={filteredMiniBrands}
        collectedMinibrandsMap={collectedMinibrandsMap}
      />
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
