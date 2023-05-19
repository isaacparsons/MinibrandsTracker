import { Box, CircularProgress } from '@mui/material';
import useIsInViewport from 'common/hooks/useIsInViewPort';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

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
  }, [hasMore, isInViewport, fetching, fetchMore]);

  useEffect(() => {
    if (dataLength > prevDataLength) {
      setPrevDataLength(dataLength);
      setFetching(false);
    }
    if (!hasMore) {
      setFetching(false);
    }
  }, [dataLength, prevDataLength, hasMore]);

  return (
    <Box sx={styles.container}>
      {children}
      <Box sx={styles.loadingContainer} ref={loadingRef}>
        {fetching ? <CircularProgress /> : null}
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
};

export default InfinityScroll;
