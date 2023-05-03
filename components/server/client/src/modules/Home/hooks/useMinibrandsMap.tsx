import { MiniBrand } from '__generated__/graphql';
import { useMemo } from 'react';

export type MinibrandMap = Record<number, MiniBrand>;

const useMinibrandsMap = (
  minibrands: MiniBrand[] | undefined | null
): MinibrandMap => {
  const minibrandsMap = useMemo(() => {
    const map: MinibrandMap = {};
    if (minibrands) {
      for (let minibrand of minibrands) {
        map[minibrand.id] = minibrand;
      }
    }
    return map;
  }, [minibrands]);

  return minibrandsMap;
};

export default useMinibrandsMap;
