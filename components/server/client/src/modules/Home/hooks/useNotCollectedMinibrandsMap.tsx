import { MiniBrand } from '__generated__/graphql';
import { useMemo } from 'react';
import { CollectedMinibrandMap } from './useCollectedMinibrandsMap';

export type NotCollectedMinibrandMap = Record<number, MiniBrand>;

const useNotCollectedMinibrandsMap = (
  minibrands: MiniBrand[] | undefined | null,
  collectedMap: CollectedMinibrandMap
): NotCollectedMinibrandMap => {
  const notCollectedMap = useMemo(() => {
    const map: NotCollectedMinibrandMap = {};
    if (minibrands) {
      for (let minibrand of minibrands) {
        if (!collectedMap[minibrand.id]) {
          map[minibrand.id] = minibrand;
        }
      }
    }
    return map;
  }, [minibrands, collectedMap]);

  return notCollectedMap;
};

export default useNotCollectedMinibrandsMap;
