import { useMemo } from 'react';
import { FilterMap } from './useFilterMap';
import { MiniBrand } from '__generated__/graphql';

const useFilterByMinibrandTags = (
  minibrands: MiniBrand[] | undefined,
  tags: FilterMap,
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
      return minibrand?.tags?.find((tag) => tags[tag.value]);
    });
  }, [minibrands, tags, allSelected]);
};

export default useFilterByMinibrandTags;
