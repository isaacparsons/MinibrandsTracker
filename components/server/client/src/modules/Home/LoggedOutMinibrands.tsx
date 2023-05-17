import FilterInput from './components/Filter/FilterInput/FilterInput';
import { Filter } from 'modules/Home/hooks/useFilterMap';
import useSelectAll from 'modules/Home/hooks/useSelectAll';
import { Box } from '@mui/material';
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

function LoggedOutMinibrands(props: Props) {
  const {
    filterOpen,
    toggleFilter,
    filters,
    minibrands,
    searchText,
    updateSearchText,
    clearSearch
  } = props;

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
            {filters.map((filter) => {
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
        loading={false}
        minibrands={minibrands}
        collectedMinibrandsMap={{}}
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

export default LoggedOutMinibrands;
