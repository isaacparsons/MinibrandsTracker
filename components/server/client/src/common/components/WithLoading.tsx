import { CircularProgress, Box } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

function WithLoading(props: Props) {
  const { children, loading } = props;

  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      {loading ? <CircularProgress /> : children}
    </Box>
  );
}

export default WithLoading;
