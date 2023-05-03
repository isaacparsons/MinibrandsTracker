import { CollectedMinibrand } from '__generated__/graphql';
import { useMemo } from 'react';

export type CollectedMinibrandMap = Record<number, CollectedMinibrand>;

const useCollectedMinibrandsMap = (
  collected: CollectedMinibrand[] | undefined | null
): CollectedMinibrandMap => {
  const collectedMinibrandsMap = useMemo(() => {
    const map: CollectedMinibrandMap = {};
    if (!collected) {
      return map;
    }
    for (let collectedMinibrand of collected) {
      if (
        collectedMinibrand.minibrandId &&
        !map[collectedMinibrand.minibrandId]
      ) {
        map[collectedMinibrand.minibrandId] = collectedMinibrand;
      }
    }
    return map;
  }, [collected]);
  return collectedMinibrandsMap;
};

export default useCollectedMinibrandsMap;
