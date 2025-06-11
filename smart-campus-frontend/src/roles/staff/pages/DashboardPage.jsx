// src/roles/staff/pages/DashboardPage.jsx
import React from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  Book as BookIcon,
  EventAvailable as EventIcon,
  Announcement as AnnouncementIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import Layout from '../../../common/components/Layout';
import { useAuth } from '../../../common/context/AuthContext';

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <Card elevation={3} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ bgcolor: `${color}.light`, mr: 2, color: 'white' }}>
          <Icon />
        </Avatar>
        <Box>
          <Typography variant="h6" color="textSecondary">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const RecentActivity = ({ activities }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box display="flex" alignItems="center" mb={2}>
      <NotificationsIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="h6">Recent Activities</Typography>
    </Box>
    <List>
      {activities.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={activity.title}
              secondary={activity.time}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
          {index < activities.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const Announcements = ({ announcements }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box display="flex" alignItems="center" mb={2}>
      <AnnouncementIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="h6">Announcements</Typography>
    </Box>
    <List>
      {announcements.map((announcement, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={announcement.title}
              secondary={announcement.description}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          {index < announcements.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const StaffDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();

  // Sample data - replace with actual API calls
  const stats = [
    { title: 'Total Students', value: '1,254', icon: PeopleIcon, color: 'primary' },
    { title: 'Available Books', value: '5,678', icon: BookIcon, color: 'secondary' },
    { title: 'Upcoming Events', value: '12', icon: EventIcon, color: 'success' },
    { title: 'Pending Tasks', value: '5', icon: AssignmentIcon, color: 'warning' },
  ];

  const recentActivities = [
    { title: 'New book added to library', time: '2 minutes ago' },
    { title: 'Library maintenance scheduled', time: '1 hour ago' },
    { title: 'New student registration', time: '3 hours ago' },
    { title: 'Book return overdue', time: '1 day ago' },
  ];

  const announcements = [
    { 
      title: 'Library Maintenance', 
      description: 'The library will be closed on Friday for maintenance work.' 
    },
    { 
      title: 'New Books Arrival', 
      description: 'New collection of books has been added to the library.' 
    },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Staff Dashboard</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Welcome back, {user?.username} ({user?.role})
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard 
                title={stat.title} 
                value={stat.value} 
                icon={stat.icon} 
                color={stat.color} 
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <RecentActivity activities={recentActivities} />
          </Grid>
          
          {/* Announcements */}
          <Grid item xs={12} md={6}>
            <Announcements announcements={announcements} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default StaffDashboard;
