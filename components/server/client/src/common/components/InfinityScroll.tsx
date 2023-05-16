import { Box, CircularProgress } from '@mui/material';
import useIsInViewport from 'common/hooks/useIsInViewPort';
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

interface Props {
  children: ReactElement[] | ReactElement;
  hasMore: boolean;
  fetchMore: () => void;
  dataLength: number;
}

function InfinityScroll(props: Props) {
  const { children, dataLength, fetchMore, hasMore } = props;
  const loadingRef = useRef();
  const isInViewport = useIsInViewport(loadingRef);

  const [fetching, setFetching] = useState(false);
  const [prevDataLength, setPrevDataLength] = useState<number>(0);

  useEffect(() => {
    if (hasMore && isInViewport && !fetching) {
      setFetching(true);
      fetchMore();
    }
  }, [hasMore, isInViewport, fetchMore, fetching]);

  useEffect(() => {
    if (dataLength > prevDataLength) {
      setPrevDataLength(dataLength);
      setFetching(false);
    }
    if (dataLength === prevDataLength && !hasMore) {
      setFetching(false);
    }
  }, [dataLength, prevDataLength, hasMore]);

  return (
    <Box>
      {children}
      <Box ref={loadingRef}>{fetching ? <CircularProgress /> : null}</Box>
    </Box>
  );
}

export default InfinityScroll;
