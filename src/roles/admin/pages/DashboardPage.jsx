// src/roles/admin/pages/DashboardPage.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  EventAvailable as EventIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  PersonAdd as PersonAddIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Layout from '../../../common/components/Layout';
import { useAuth } from '../../../common/context/AuthContext';

const StatsCard = ({ title, value, icon: Icon, color, trend, trendText }) => {
  const theme = useTheme();
  return (
    <Card elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: `${color}.light`, mr: 2, color: 'white' }}>
            <Icon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
            <Typography variant="h4" fontWeight="bold">{value}</Typography>
          </Box>
        </Box>
        {trend && (
          <Box display="flex" alignItems="center" mt={1}>
            {trend === 'up' ? (
              <TrendingUpIcon color="success" fontSize="small" />
            ) : (
              <TrendingDownIcon color="error" fontSize="small" />
            )}
            <Typography
              variant="caption"
              color={trend === 'up' ? 'success.main' : 'error.main'}
              ml={0.5}
            >
              {trendText}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const QuickAction = ({ icon: Icon, title, description, color, onClick }) => (
  <Card
    elevation={2}
    sx={{
      height: '100%',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" p={2}>
        <Avatar sx={{ bgcolor: `${color}.light`, mb: 2, width: 56, height: 56 }}>
          <Icon fontSize="large" />
        </Avatar>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const SystemStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'success';
      case 'degraded': return 'warning';
      case 'outage': return 'error';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircleIcon color="success" />;
      case 'degraded': return <WarningIcon color="warning" />;
      case 'outage': return <ErrorIcon color="error" />;
      default: return <InfoIcon color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <SettingsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">System Status</Typography>
      </Box>
      <Box>
        {Object.entries(status).map(([service, { status, message }]) => (
          <Box key={service} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography variant="subtitle2">
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </Typography>
              <Chip
                size="small"
                label={status}
                color={getStatusColor(status)}
                icon={getStatusIcon(status)}
                variant="outlined"
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={status === 'operational' ? 100 : status === 'degraded' ? 60 : 0}
              color={getStatusColor(status)}
              sx={{ height: 4, borderRadius: 2 }}
            />
            <Typography variant="caption" color="textSecondary">
              {message}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const RecentUsers = ({ users }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box display="flex" alignItems="center" mb={2}>
      <PeopleIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="h6">Recent Users</Typography>
    </Box>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar src={user.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.role}
                  color={
                    user.role === 'admin' ? 'primary' :
                    user.role === 'staff' ? 'secondary' : 'default'
                  }
                />
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.status}
                  color={
                    user.status === 'active' ? 'success' :
                    user.status === 'pending' ? 'warning' : 'default'
                  }
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();

  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 1242,
    activeUsers: 984,
    courses: 156,
    activeSessions: 87,
  };

  const quickActions = [
    {
      title: 'Add User',
      description: 'Create a new user account',
      icon: PersonAddIcon,
      color: 'primary',
      onClick: () => console.log('Add User clicked')
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: SettingsIcon,
      color: 'secondary',
      onClick: () => console.log('System Settings clicked')
    },
    {
      title: 'Manage Roles',
      description: 'Configure user roles and permissions',
      icon: SecurityIcon,
      color: 'success',
      onClick: () => console.log('Manage Roles clicked')
    },
  ];

  const systemStatus = {
    database: { status: 'operational', message: 'All systems normal' },
    api: { status: 'operational', message: 'Response time 120ms' },
    authentication: { status: 'operational', message: 'OAuth2 provider active' },
    storage: { status: 'degraded', message: 'High latency in EU region' },
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', avatar: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'staff', status: 'active', avatar: '' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'student', status: 'pending', avatar: '' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'student', status: 'active', avatar: '' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'staff', status: 'inactive', avatar: '' },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Welcome back, {user?.username}! Here's what's happening with your campus management system.
          </Typography>
        </Box>


        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={PeopleIcon}
              color="primary"
              trend="up"
              trendText="12% from last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Users"
              value={stats.activeUsers}
              icon={PeopleIcon}
              color="success"
              trend="up"
              trendText="8% from last week"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Courses"
              value={stats.courses}
              icon={BookIcon}
              color="warning"
              trend="up"
              trendText="5 new this month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Sessions"
              value={stats.activeSessions}
              icon={EventIcon}
              color="info"
              trend="down"
              trendText="3% from yesterday"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid container spacing={3} mb={4}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <QuickAction
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                onClick={action.onClick}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* System Status */}
          <Grid item xs={12} md={4}>
            <SystemStatus status={systemStatus} />
          </Grid>

          {/* Recent Users */}
          <Grid item xs={12} md={8}>
            <RecentUsers users={recentUsers} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;
