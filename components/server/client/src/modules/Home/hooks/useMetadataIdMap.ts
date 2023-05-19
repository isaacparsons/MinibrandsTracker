import { useMemo } from 'react';

interface MetadataItem {
  id: number;
  value: string;
}

export type IdMap = Record<string, number>;

const useMetadataIdMap = (items: MetadataItem[] | undefined) => {
  return useMemo(() => {
    const map: IdMap = {};
    if (!items) return map;
    for (let i of items) {
      map[i.value] = i.id;
    }
    return map;
  }, [items]);
};

export default useMetadataIdMap;
