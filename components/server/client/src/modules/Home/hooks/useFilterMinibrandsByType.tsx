import { useMemo } from 'react';
import { FilterMap } from './useFilterMap';
import { MiniBrand } from '__generated__/graphql';

const useFilterMinibrandsByType = (
  minibrands: MiniBrand[] | undefined,
  type: FilterMap,
  allSelected: boolean
) => {
  return useMemo(() => {
    if (!minibrands) {
      return [];
    }
    if (allSelected) {
      return minibrands;
    }
    return minibrands.filter((minibrand) => {
      return minibrand.type?.value && type[minibrand.type?.value];
    });
  }, [minibrands, type, allSelected]);
};

export default useFilterMinibrandsByType;
