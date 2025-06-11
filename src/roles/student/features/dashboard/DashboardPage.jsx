import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  LinearProgress, 
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Event as EventIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  MenuBook as MenuBookIcon,
  AccessTime as AccessTimeIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data - Replace with API calls in a real application
const upcomingAssignments = [
  { id: 1, title: 'Math Homework', course: 'Mathematics', dueDate: '2025-06-15', progress: 75 },
  { id: 2, title: 'Science Project', course: 'Physics', dueDate: '2025-06-20', progress: 30 },
  { id: 3, title: 'Literature Essay', course: 'English', dueDate: '2025-06-25', progress: 10 },
];

const recentAnnouncements = [
  { 
    id: 1, 
    title: 'Campus Reopening Guidelines', 
    content: 'Please review the updated campus reopening guidelines for the fall semester.',
    date: '2025-06-10',
    read: false
  },
  { 
    id: 2, 
    title: 'Final Exam Schedule', 
    content: 'The final exam schedule has been posted. Please check your student portal.',
    date: '2025-06-08',
    read: true
  },
  { 
    id: 3, 
    title: 'Career Fair Registration', 
    content: 'Register now for the upcoming virtual career fair on June 30th.',
    date: '2025-06-05',
    read: true
  },
];

const quickActions = [
  { id: 1, title: 'View Schedule', icon: <EventIcon />, path: '/student/calendar' },
  { id: 2, title: 'Course Materials', icon: <MenuBookIcon />, path: '/student/courses' },
  { id: 3, title: 'Submit Assignment', icon: <AssignmentIcon />, path: '/student/assignments' },
  { id: 4, title: 'View Grades', icon: <SchoolIcon />, path: '/student/grades' },
];

const stats = [
  { id: 1, title: 'Active Courses', value: 5, icon: <SchoolIcon color="primary" />, change: '+2 from last term' },
  { id: 2, title: 'Assignments Due', value: 3, icon: <AssignmentIcon color="secondary" />, change: '2 overdue' },
  { id: 3, title: 'Upcoming Events', value: 4, icon: <EventIcon color="success" />, change: '1 tomorrow' },
  { id: 4, title: 'Current GPA', value: '3.7', icon: <TrendingUpIcon color="warning" />, change: '+0.2 from last term' },
];

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `Due in ${diffDays} days`;
  };

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {greeting}, John!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your education today.
        </Typography>
      </Box>


      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Box sx={{ color: 'primary.main' }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {stat.change}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Assignments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2">
                  Upcoming Assignments
                </Typography>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => navigate('/student/assignments')}
                >
                  View All
                </Button>
              </Box>
              <List>
                {upcomingAssignments.map((assignment, index) => (
                  <React.Fragment key={assignment.id}>
                    <ListItem 
                      button 
                      onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'action.hover',
                          borderRadius: 1,
                        } 
                      }}
                    >
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1">
                            {assignment.title}
                          </Typography>
                          <Chip 
                            label={getDaysUntilDue(assignment.dueDate)} 
                            size="small"
                            color={getDaysUntilDue(assignment.dueDate).includes('overdue') ? 'error' : 'default'}
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {assignment.course} • Due {formatDate(assignment.dueDate)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={assignment.progress} 
                              color={assignment.progress === 100 ? 'success' : 'primary'}
                            />
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            {assignment.progress}%
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < upcomingAssignments.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Announcements */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2">
                  Recent Announcements
                </Typography>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => navigate('/student/announcements')}
                >
                  View All
                </Button>
              </Box>
              <List>
                {recentAnnouncements.map((announcement, index) => (
                  <React.Fragment key={announcement.id}>
                    <ListItem 
                      button 
                      onClick={() => navigate(`/student/announcements/${announcement.id}`)}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'action.hover',
                          borderRadius: 1,
                        },
                        opacity: announcement.read ? 0.8 : 1,
                        fontWeight: announcement.read ? 'normal' : 'medium'
                      }}
                    >
                      <ListItemIcon>
                        <NotificationsIcon color={announcement.read ? 'disabled' : 'primary'} />
                      </ListItemIcon>
                      <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: announcement.read ? 'normal' : 'bold',
                              color: announcement.read ? 'text.primary' : 'primary.main'
                            }}
                          >
                            {announcement.title}
                          </Typography>
                          {!announcement.read && (
                            <Chip 
                              label="New" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="textSecondary" noWrap>
                          {announcement.content}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatDate(announcement.date)}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < recentAnnouncements.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action) => (
            <Grid item xs={6} sm={3} key={action.id}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => handleCardClick(action.path)}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      color: 'primary.contrastText'
                    }}
                  >
                    {React.cloneElement(action.icon, { fontSize: 'medium' })}
                  </Box>
                  <Typography variant="subtitle2">
                    {action.title}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity & Upcoming Events - For larger screens */}
      {!isMobile && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  {[
                    { id: 1, text: 'Submitted Math assignment', time: '2 hours ago', icon: <CheckCircleIcon color="success" /> },
                    { id: 2, text: 'Received grade for Science project', time: '1 day ago', icon: <EmojiEventsIcon color="warning" /> },
                    { id: 3, text: 'New material uploaded for History', time: '2 days ago', icon: <MenuBookIcon color="info" /> },
                  ].map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemIcon>
                        {activity.icon}
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2">
                          {activity.text}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Upcoming Events
                  </Typography>
                  <Button size="small" color="primary" onClick={() => navigate('/student/calendar')}>
                    View Calendar
                  </Button>
                </Box>
                <List>
                  {[
                    { 
                      id: 1, 
                      title: 'Math Quiz', 
                      date: '2025-06-12T10:00:00',
                      location: 'Room 205',
                      type: 'quiz'
                    },
                    { 
                      id: 2, 
                      title: 'Science Fair', 
                      date: '2025-06-15T13:00:00',
                      location: 'Main Hall',
                      type: 'event'
                    },
                    { 
                      id: 3, 
                      title: 'History Paper Due', 
                      date: '2025-06-18T23:59:59',
                      type: 'assignment'
                    },
                  ].map((event, index) => (
                    <React.Fragment key={event.id}>
                      <ListItem 
                        button 
                        onClick={() => navigate(`/student/calendar/event/${event.id}`)}
                        sx={{ '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 } }}
                      >
                        <ListItemIcon>
                          <EventIcon color={event.type === 'quiz' ? 'error' : event.type === 'event' ? 'info' : 'warning'} />
                        </ListItemIcon>
                        <Box>
                          <Typography variant="subtitle2">
                            {event.title}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5, fontSize: '1rem' }} />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(event.date).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
              })}
                            </Typography>
                            {event.location && (
                              <>
                                <Box mx={1}>•</Box>
                                <Typography variant="caption" color="textSecondary">
                                  {event.location}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </Box>
                      </ListItem>
                      {index < 2 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
