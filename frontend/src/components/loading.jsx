import React from 'react';
import { CircularProgress, Box, Typography, LinearProgress } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <>
      {/* Top linear progress bar */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={1301}>
        <LinearProgress />
      </Box>

    </>
  );
};

export default Loading;
