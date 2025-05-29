// src/components/StudentLayout.jsx
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import StudentSidebar from './StudentSidebar';
import StudentTopNav from './StudentTopNav';

const StudentLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <StudentTopNav />
      <StudentSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default StudentLayout;
