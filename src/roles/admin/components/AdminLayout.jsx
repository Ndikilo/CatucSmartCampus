import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../../common/context/AuthContext';
import { useTheme as useAppTheme } from '../../../common/context/ThemeContext';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';

const AdminLayout = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { mode, toggleColorMode } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      
      <AdminTopNav onMenuClick={handleDrawerToggle} />
      
      <AdminSidebar 
        user={user}
        toggleColorMode={toggleColorMode}
        mode={mode}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 260px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'margin 0.3s ease',
          ml: { sm: '260px' },
          mt: '64px', // Height of the AppBar
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
