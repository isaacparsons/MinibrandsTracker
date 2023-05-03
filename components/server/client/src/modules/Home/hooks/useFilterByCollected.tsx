import { useMemo } from 'react';
import { CollectedMinibrandMap } from './useCollectedMinibrandsMap';
import { FilterMap } from './useFilterMap';
import { MinibrandMap } from './useMinibrandsMap';
import { NotCollectedMinibrandMap } from './useNotCollectedMinibrandsMap';

const useFilterByCollected = (
  minibrandsMap: MinibrandMap,
  collectedMinibrandMap: CollectedMinibrandMap,
  notCollectedMinibrandMap: NotCollectedMinibrandMap,
  collectedFilterMap: FilterMap
) => {
  return useMemo(() => {
    let filtered = [];
    if (collectedFilterMap['collected']) {
      for (let collectedMinibrandId in collectedMinibrandMap) {
        filtered.push(minibrandsMap[collectedMinibrandId]);
      }
    }
    if (collectedFilterMap['not-collected']) {
      for (let notCollectedMinibrandId in notCollectedMinibrandMap) {
        filtered.push(minibrandsMap[notCollectedMinibrandId]);
      }
    }
    return filtered;
  }, [
    minibrandsMap,
    collectedMinibrandMap,
    notCollectedMinibrandMap,
    collectedFilterMap
  ]);
};

export default useFilterByCollected;
