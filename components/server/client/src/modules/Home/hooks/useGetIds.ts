import { useMemo } from 'react';
import { FilterMap } from './useFilterMap';
import { IdMap } from './useMetadataIdMap';

const useGetIds = (filterMap: FilterMap, idMap: IdMap) => {
  return useMemo(() => {
    const ids = [];
    for (let type in filterMap) {
      if (filterMap[type] && idMap[type] >= 0) {
        ids.push(idMap[type]);
      }
    }
    return ids;
  }, [filterMap, idMap]);
};

export default useGetIds;
