import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: any) => {
  const prevValue = useRef<T | undefined>();
  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

export default usePrevious;
