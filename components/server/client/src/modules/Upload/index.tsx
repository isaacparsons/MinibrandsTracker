import React, { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';

import DragAndDropUploader from './DragAndDropUploader';

const Upload = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
    ></Box>
  );
};

const styles = {
  textInput: {
    margin: 10
  }
};

export default Upload;
