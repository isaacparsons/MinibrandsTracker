import { useMemo } from 'react';
import FilterInput from './components/Filter/FilterInput/FilterInput';
import useFilterMap, { Filter } from 'modules/Home/hooks/useFilterMap';
import useSelectAll from 'modules/Home/hooks/useSelectAll';
import useMe from 'common/hooks/useMe';
import useCollectedMinibrandsMap from 'modules/Home/hooks/useCollectedMinibrandsMap';
import useMinibrandsMap, {
  MinibrandMap
} from 'modules/Home/hooks/useMinibrandsMap';
import useNotCollectedMinibrandsMap from 'modules/Home/hooks/useNotCollectedMinibrandsMap';
import useFilterByCollected from 'modules/Home/hooks/useFilterByCollected';
import { Box, CircularProgress } from '@mui/material';
import FilterBar from './components/Filter/FilterBar/FilterBar';
import MinibrandsList from './MinibrandsList/MinibrandsList';
import { MiniBrand } from '__generated__/graphql';
import FilterList from './components/Filter/FilterInput/FilterList';

interface Props {
  filterOpen: boolean;
  filters: Filter[];
  minibrands: MiniBrand[];
  searchText: string;
  updateSearchText: (value: string) => void;
  toggleFilter: () => void;
  clearSearch: () => void;
}

function LoggedInMinibrands(props: Props) {
  const {
    filterOpen,
    toggleFilter,
    filters,
    minibrands,
    searchText,
    updateSearchText,
    clearSearch
  } = props;
  const { data: me, loading: loadingMe } = useMe();
  const collectedMinibrandsMap = useCollectedMinibrandsMap(me?.collected);
  const notCollectedMinibrandsMap = useNotCollectedMinibrandsMap(
    minibrands,
    collectedMinibrandsMap
  );

  const collectedStatusFilter = useFilterMap(
    'collected status',
    [{ value: 'collected' }, { value: 'not-collected' }] ?? []
  );

  const filteredByCollectionStatus = useFilterByCollected(
    minibrands,
    collectedMinibrandsMap,
    notCollectedMinibrandsMap,
    collectedStatusFilter.filterMap
  );

  const filtersWithCollected = useMemo(() => {
    return [collectedStatusFilter, ...filters];
  }, [collectedStatusFilter, filters]);

  const { handleSelectAll, handleUnSelectAll, allSelected } =
    useSelectAll(filters);

  return (
    <>
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
          <>
            {filtersWithCollected.map((filter) => {
              return (
                <FilterList
                  type={filter.type}
                  filterMap={filter.filterMap}
                  updateFilterMap={filter.updateFilterMap}
                  selectAll={filter.selectAll}
                  unSelectAll={filter.unSelectAll}
                  allSelected={filter.allSelected}
                />
              );
            })}
          </>
        </FilterInput>
      </Box>
      <MinibrandsList
        loading={loadingMe}
        minibrands={filteredByCollectionStatus}
        collectedMinibrandsMap={collectedMinibrandsMap}
      />
    </>
  );
}

const styles = {
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

export default LoggedInMinibrands;
