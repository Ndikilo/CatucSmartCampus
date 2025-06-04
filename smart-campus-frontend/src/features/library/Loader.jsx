// 📄 src/features/library/Loader.jsx

import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loader = () => (
  <Box textAlign="center" mt={4}>
    <CircularProgress />
    <Typography variant="body1" mt={2}>
      Loading books...
    </Typography>
  </Box>
);

export default Loader;
