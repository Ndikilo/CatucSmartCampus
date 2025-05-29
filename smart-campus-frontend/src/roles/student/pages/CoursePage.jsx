// src/roles/student/pages/CoursePage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();
  return (
    <Box p={4}>
      <Typography variant="h4">Course Details</Typography>
      <Typography>Details for course ID: {id}</Typography>
    </Box>
  );
};

export default CoursePage;