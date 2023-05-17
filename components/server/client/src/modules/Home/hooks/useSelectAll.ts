import { useMemo } from 'react';
import { Filter } from './useFilterMap';

const useSelectAll = (filters: Filter[]) => {
  const handleSelectAll = () => {
    filters.forEach((filter) => {
      filter.selectAll();
    });
  };
  const handleUnSelectAll = () => {
    filters.forEach((filter) => {
      filter.unSelectAll();
    });
  };

  const allSelected = useMemo(() => {
    return filters.every((filter) => filter.allSelected);
  }, [filters]);

  return {
    handleSelectAll,
    handleUnSelectAll,
    allSelected
  };
};

export default useSelectAll;
