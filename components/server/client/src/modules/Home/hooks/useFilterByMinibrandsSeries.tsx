import { useMemo } from 'react';
import { FilterMap } from './useFilterMap';
import { MiniBrand } from '__generated__/graphql';

const useFilterByMinibrandsSeries = (
  minibrands: MiniBrand[] | undefined,
  series: FilterMap,
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
      return minibrand.series?.value && series[minibrand.series?.value];
    });
  }, [minibrands, series, allSelected]);
};

export default useFilterByMinibrandsSeries;
