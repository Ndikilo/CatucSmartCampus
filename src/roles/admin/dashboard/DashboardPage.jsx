import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  InsertDriveFile as FileIcon,
  BarChart as ChartIcon,
  Notifications as NotificationIcon,
  Event as EventIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import StatCard from '../components/StatCard';
import RecentActivities from '../components/RecentActivities';
import QuickActions from '../components/QuickActions';
import SystemStatus from '../components/SystemStatus';

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    documents: 0,
    pendingApprovals: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Mock data for now
        setTimeout(() => {
          setStats({
            totalUsers: 1245,
            activeUsers: 987,
            documents: 356,
            pendingApprovals: 23,
          });
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <PeopleIcon fontSize="large" />,
      color: 'primary',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <PeopleIcon fontSize="large" />,
      color: 'success',
      trend: '+12%',
      onClick: () => navigate('/admin/users?status=active')
    },
    {
      title: 'Documents',
      value: stats.documents,
      icon: <FileIcon fontSize="large" />,
      color: 'info',
      trend: '+5%',
      onClick: () => navigate('/admin/documents')
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: <SecurityIcon fontSize="large" />,
      color: 'warning',
      onClick: () => navigate('/admin/users?status=pending')
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ p: isMobile ? 2 : 3 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Welcome back, {user?.name || 'Admin'}
          </Typography>
        </Box>


        {/* Stats Grid */}
        <Grid container spacing={3} mb={4}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={stat.onClick}
                style={{ height: '100%', cursor: 'pointer' }}
              >
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  trend={stat.trend}
                  loading={loading}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            <RecentActivities loading={loading} />
            
            <Box mt={3}>
              <SystemStatus loading={loading} />
            </Box>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            <QuickActions loading={loading} />
            
            <Box mt={3}>
              <Card>
                <CardHeader 
                  title="Quick Stats"
                  titleTypographyProps={{ variant: 'h6' }}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    System is running smoothly. No issues detected.
                  </Typography>
                  {/* Add more quick stats here */}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default DashboardPage;
