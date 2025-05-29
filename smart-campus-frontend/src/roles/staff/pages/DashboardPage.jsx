// src/roles/staff/pages/DashboardPage.jsx
import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../../../common/components/Layout';
import { useAuth } from '../../../common/context/AuthContext';

const StaffDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Staff Dashboard</Typography>
      <Typography>Welcome, {user?.username} ({user?.role})</Typography>
    </Layout>
  );
};

export default StaffDashboard;
