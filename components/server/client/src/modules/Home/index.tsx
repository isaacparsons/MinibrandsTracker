import { Container, Box, useTheme, IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import useMiniBrands from './hooks/useMiniBrands';
import MinibrandsList from './MinibrandsList/MinibrandsList';
import Search from './Filter/Search/Search';
import FilterInput from './Filter/FilterInput/FilterInput';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import { useMemo, useState } from 'react';
import useFilterMap from './hooks/useFilterMap';
import FilterList from './Filter/FilterInput/FilterList';
import useFilterMinibrandsByType from './hooks/useFilterMinibrandsByType';
import useFilterByMinibrandsSeries from './hooks/useFilterByMinibrandsSeries';
import useFilterByMinibrandTags from './hooks/useFilterByMinibrandTags';
import useFilterBySearch from './hooks/useFilterBySearch';

function Home() {
  const theme = useTheme();
  const { data, loading } = useMiniBrands();
  const { data: minibrandsMetadata } = useMinibrandsMetadata();
  const [filterOpen, setFilterOpen] = useState(true);
  const [searchText, setSearchText] = useState('');

  // add collected vs not collected
  const {
    filterMap: seriesFilterMap,
    updateFilterMap: updateSeriesFilterMap,
    selectAll: selectAllSeries,
    allSelected: allSeriesSelected,
    unSelectAll: unSelectAllSeries
  } = useFilterMap('series', minibrandsMetadata?.series ?? []);

  const {
    filterMap: typesFilterMap,
    updateFilterMap: updateTypesFilterMap,
    selectAll: selectAllTypes,
    allSelected: allTypesSelected,
    unSelectAll: unSelectAllTypes
  } = useFilterMap('types', minibrandsMetadata?.types ?? []);

  const {
    filterMap: tagsFilterMap,
    updateFilterMap: updateTagsFilterMap,
    selectAll: selectAllTags,
    allSelected: allTagsSelected,
    unSelectAll: unSelectAllTags
  } = useFilterMap('tags', minibrandsMetadata?.tags ?? []);

  const filteredByType = useFilterMinibrandsByType(
    data,
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

  return (
    <Container maxWidth="lg" sx={{ padding: 10 }}>
      <Box sx={styles.container}>
        <Box sx={styles.topBar}>
          <Search value={searchText} onValueChange={setSearchText} />
          <IconButton onClick={toggleFilter}>
            <TuneIcon
              fontSize="large"
              sx={{ paddingLeft: 2, color: theme.palette.grey[700] }}
            />
          </IconButton>
        </Box>
        <FilterInput
          open={filterOpen}
          selectAll={handleSelectAll}
          unSelectAll={handleUnSelectAll}
          allSelected={allSelected}
        >
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
      <MinibrandsList minibrands={filteredMiniBrands} />
    </Container>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Home;
