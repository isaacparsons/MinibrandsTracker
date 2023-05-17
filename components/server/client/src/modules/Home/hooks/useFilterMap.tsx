import _ from 'lodash';
import { useState, useEffect, useRef, useCallback } from 'react';

interface FilterTypeValue {
  id?: number;
  value: string;
}

export interface Filter {
  type: string;
  filterMap: FilterMap;
  updateFilterMap: (property: string, value: boolean) => void;
  selectAll: () => void;
  unSelectAll: () => void;
  allSelected: boolean;
}

export type FilterMap = Record<string, boolean>;

function deepCompareEquals(a: any, b: any) {
  return _.isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

const setAllValues = (filterMap: FilterMap, value: boolean) => {
  const newFilterMap = { ...filterMap };
  for (let property in newFilterMap) {
    newFilterMap[property] = value;
  }
  return newFilterMap;
};

const useFilterMap = (type: string, values: FilterTypeValue[]): Filter => {
  const [filterMap, setFilterMap] = useState<FilterMap>({});
  const [allSelected, setAllSelected] = useState(true);

  useEffect(() => {
    setFilterMap((prevFilterMap) => {
      const newFilterMap = { ...prevFilterMap };
      for (let property of values) {
        if (!Object.hasOwn(newFilterMap, property.value)) {
          newFilterMap[property.value] = true;
        }
      }
      return newFilterMap;
    });
  }, [values].map(useDeepCompareMemoize));

  useEffect(() => {
    const isAllTrue = Object.keys(filterMap).every((key) => filterMap[key]);
    if (isAllTrue && !allSelected) {
      setAllSelected(true);
    }
    if (!isAllTrue && allSelected) {
      setAllSelected(false);
    }
  }, [filterMap, allSelected]);

  const updateFilterMap = useCallback(
    (property: string, value: boolean) => {
      setFilterMap((prevFilterMap) => {
        const newFilterMap = { ...prevFilterMap };
        newFilterMap[property] = value;
        return newFilterMap;
      });
    },
    [setFilterMap]
  );

  const selectAll = useCallback(() => {
    const newFilterMap = setAllValues(filterMap, true);
    setFilterMap(newFilterMap);
    setAllSelected(true);
  }, [filterMap]);

  const unSelectAll = useCallback(() => {
    const newFilterMap = setAllValues(filterMap, false);
    setFilterMap(newFilterMap);
    setAllSelected(false);
  }, [filterMap]);

  return {
    type,
    filterMap,
    updateFilterMap,
    selectAll,
    unSelectAll,
    allSelected
  };
};

export default useFilterMap;
