import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  defaultState: T
): [T, (item: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return defaultState;
  });

  const putItemInLocalStorage = (item: T) => {
    setState(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [state, putItemInLocalStorage];
};

export default useLocalStorage;
