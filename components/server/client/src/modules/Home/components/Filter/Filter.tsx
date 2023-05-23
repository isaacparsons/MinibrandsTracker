import { Box } from '@mui/material';
import React, { useState } from 'react';
import FilterBar from './FilterBar/FilterBar';
import FilterInput from './FilterInput/FilterInput';
import useSelectAll from 'modules/Home/hooks/useSelectAll';
import { Filter as IFilter } from 'modules/Home/hooks/useFilterMap';
import FilterList from './FilterInput/FilterList';

interface Props {
  onSearchPress: (value: string) => void;
  filters: IFilter[];
  filterOpen: boolean;
  toggleFilter: () => void;
}

function Filter(props: Props) {
  const { onSearchPress, filters, filterOpen, toggleFilter } = props;

  const { handleSelectAll, handleUnSelectAll, allSelected } =
    useSelectAll(filters);
  return (
    <Box sx={styles.contentContainer}>
      <FilterBar toggleFilter={toggleFilter} onSearchPress={onSearchPress} />
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
                key={filter.type}
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
  );
}

const styles = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5
  }
};

export default React.memo(Filter);
