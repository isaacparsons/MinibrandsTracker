import { useMemo } from 'react';
import { CollectedMinibrandMap } from './useCollectedMinibrandsMap';
import { FilterMap } from './useFilterMap';
import { NotCollectedMinibrandMap } from './useNotCollectedMinibrandsMap';
import { MiniBrand } from '__generated__/graphql';

const useFilterByCollected = (
  minibrands: MiniBrand[],
  collectedMinibrandMap: CollectedMinibrandMap,
  notCollectedMinibrandMap: NotCollectedMinibrandMap,
  collectedFilterMap: FilterMap
) => {
  return useMemo(() => {
    let minibrandsMap: Record<number, MiniBrand> = {};
    minibrands.forEach((minibrand) => {
      minibrandsMap[minibrand.id] = minibrand;
    });
    let filtered = [];
    if (collectedFilterMap['collected']) {
      for (let collectedMinibrandId in collectedMinibrandMap) {
        if (minibrandsMap[collectedMinibrandId])
          filtered.push(minibrandsMap[collectedMinibrandId]);
      }
    }
    if (collectedFilterMap['not-collected']) {
      for (let notCollectedMinibrandId in notCollectedMinibrandMap) {
        if (minibrandsMap[notCollectedMinibrandId])
          filtered.push(minibrandsMap[notCollectedMinibrandId]);
      }
    }
    return filtered;
  }, [
    minibrands,
    collectedMinibrandMap,
    notCollectedMinibrandMap,
    collectedFilterMap
  ]);
};

export default useFilterByCollected;
