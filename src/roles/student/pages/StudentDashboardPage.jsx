import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeBanner from '../../../common/components/WelcomeBanner';
import OnboardingTour from '../../../common/components/OnboardingTour';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container, 
  Avatar, 
  useTheme, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  Divider, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  CardActionArea
} from '@mui/material';

// Icons
import {
  MenuBook as MenuBookIcon,
  Grade as GradeIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  EventNote as EventNoteIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarTodayIcon,
  CalendarMonth as CalendarMonthIcon,
  RocketLaunch as RocketLaunchIcon,
  SupportAgent as SupportAgentIcon,
  LibraryBooks as LibraryBooksIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Email as EmailIcon,
  ContactSupport as ContactSupportIcon,
  Description as DescriptionIcon,
  AssignmentInd as AssignmentIndIcon,
  Forum as ForumIcon,
  ArrowForward as ArrowForwardIcon,
  Event as EventIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip,
  PieChart, Pie, Cell, Legend, BarChart, Bar, CartesianGrid
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/context/AuthContext';
import StudentLayout from '../components/StudentLayout';

// Color scheme
const COLORS = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0'];

// University Academic Data
const academicCalendar = [
  {
    id: 1,
    title: 'Final Exams',
    date: '2025-06-15T09:00:00',
    description: 'Final examinations for all courses',
    type: 'exam',
    course: 'CSC 401 - Advanced Algorithms',
    instructor: 'Dr. Smith',
    location: 'Science Building, Room 205',
    duration: '3 hours',
    priority: 'high',
    credits: 3
  },
  {
    id: 2,
    title: 'Capstone Project Submission',
    date: '2025-06-10T23:59:59',
    description: 'Final project submission deadline',
    type: 'assignment',
    course: 'SWE 410 - Software Engineering',
    instructor: 'Prof. Johnson',
    priority: 'high',
    submission: 'LMS/Assignments',
    weight: '30%',
    group: 'Team A'
  },
  {
    id: 3,
    title: 'Career Fair',
    date: '2025-06-20T10:00:00',
    description: 'Annual University Career Fair - Bring your resume!',
    type: 'event',
    location: 'Student Union Building',
    organizer: 'Career Services',
    priority: 'medium',
    registration: 'Required',
    link: '/career-fair-2025'
  },
  {
    id: 4,
    title: 'Midterm Examination',
    date: '2025-07-05T09:00:00',
    description: 'Midterm examination - Chapters 1-6',
    type: 'exam',
    course: 'MTH 301 - Linear Algebra',
    instructor: 'Dr. Williams',
    location: 'Math Building, Room 101',
    duration: '2 hours',
    priority: 'high',
    materials: 'Formula sheet allowed',
    credits: 4
  },
];

// Today's Schedule
const todaysSchedule = [
  {
    id: 1,
    time: '09:00 - 10:30',
    course: 'CSC 401 - Advanced Algorithms',
    type: 'Lecture',
    room: 'SCI 205',
    instructor: 'Dr. Smith'
  },
  {
    id: 2,
    time: '11:00 - 12:30',
    course: 'SWE 410 - Software Engineering',
    type: 'Lab',
    room: 'ENG 312',
    instructor: 'Prof. Johnson',
    group: 'Section A'
  },
  {
    id: 3,
    time: '14:00 - 15:30',
    course: 'MTH 301 - Linear Algebra',
    type: 'Tutorial',
    room: 'MATH 101',
    instructor: 'Dr. Williams',
    ta: 'John D.'
  }
];

// Academic Overview Statistics
const gpaData = [
  { name: 'Sem 1', gpa: 3.5 },
  { name: 'Sem 2', gpa: 3.7 },
  { name: 'Sem 3', gpa: 3.8 },
  { name: 'Sem 4', gpa: 3.9 },
];

const gradeData = [
  { name: 'A', value: 8, color: '#4caf50' },
  { name: 'B', value: 5, color: '#2196f3' },
  { name: 'C', value: 2, color: '#ff9800' },
  { name: 'D', value: 1, color: '#f44336' },
];

const upcomingDeadlines = [
  { id: 1, course: 'CS101', assignment: 'Final Project', dueDate: '2023-12-15', priority: 'high' },
  { id: 2, course: 'MATH201', assignment: 'Chapter 5 Quiz', dueDate: '2023-12-18', priority: 'medium' },
  { id: 3, course: 'PHYS101', assignment: 'Lab Report 3', dueDate: '2023-12-20', priority: 'high' },
];

const recentResults = [
  { id: 1, course: 'CS101', assignment: 'Midterm Exam', score: '92%', grade: 'A' },
  { id: 2, course: 'MATH201', assignment: 'Chapter 4 Quiz', score: '85%', grade: 'B+' },
  { id: 3, course: 'PHYS101', assignment: 'Lab Report 2', score: '94%', grade: 'A' },
];

const supportTickets = [
  { id: 1, subject: 'Grade Dispute', status: 'In Review', date: '2023-12-01', priority: 'High' },
  { id: 2, subject: 'Course Registration', status: 'Resolved', date: '2023-11-25', priority: 'Medium' },
];

const sidebarSections = [
  {
    title: 'Academics',
    items: [
      { label: 'Courses', icon: <MenuBookIcon fontSize="large" />, link: 'courses' },
      { label: 'Timetable', icon: <ScheduleIcon fontSize="large" />, link: 'timetable' },
      { label: 'Results', icon: <GradeIcon fontSize="large" />, link: 'results' },
      { label: 'Assignments', icon: <AssignmentIcon fontSize="large" />, link: 'assignments' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Library', icon: <SchoolIcon fontSize="large" />, link: 'library' },
      { label: 'IT Lab', icon: <MenuBookIcon fontSize="large" />, link: 'it-lab' },
      { label: 'Canteen', icon: <EventIcon fontSize="large" />, link: 'canteen' },
      { label: 'Health Complex', icon: <HelpIcon fontSize="large" />, link: 'health-complex' },
      { label: 'Sports Complex', icon: <EventIcon fontSize="large" />, link: 'sports-complex' },
    ],
  },
];

const assignmentData = [
  { name: 'Done', value: 8 },
  { name: 'Pending', value: 2 }
];

const StudentDashboardPage = ({ toggleColorMode }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State for onboarding and welcome banner
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    localStorage.getItem('hasCompletedOnboarding') === 'true' || false
  );

  // Mock data for upcoming events
  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Midterm Exams',
      date: '2025-06-15T09:00:00',
      description: 'All courses midterm examination week',
      type: 'exam',
      course: 'All Courses'
    },
    {
      id: 2,
      title: 'Career Fair',
      date: '2025-06-20T10:00:00',
      description: 'Annual university career fair',
      type: 'event',
      location: 'University Main Hall'
    },
    {
      id: 3,
      title: 'Project Submission',
      date: '2025-06-25T23:59:00',
      description: 'Final project submission deadline',
      type: 'assignment',
      course: 'Computer Science 401'
    }
  ]);

  // Stats data
  const stats = [
    { 
      id: 1, 
      title: 'My Courses', 
      value: '5', 
      icon: <BookIcon />,
      change: { type: 'increase', value: 25 }
    },
    { 
      id: 2, 
      title: 'Assignments Due', 
      value: '3',
      icon: <AssignmentIcon />,
      change: { type: 'decrease', value: 10 }
    },
    { 
      id: 3, 
      title: 'Current GPA', 
      value: '3.75',
      icon: <GradeIcon />,
      change: { type: 'increase', value: 5 }
    },
    { 
      id: 4, 
      title: 'Upcoming Events', 
      value: upcomingEvents.length.toString(),
      icon: <EventAvailableIcon />
    }
  ];

  // Check if it's the first visit
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    if (isFirstVisit) {
      localStorage.setItem('hasVisitedBefore', 'true');
      setShowWelcomeBanner(true);
    }
  }, []);

  const handleStartTour = () => {
    setShowWelcomeBanner(false);
    setShowOnboarding(true);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  const handleDismissWelcome = () => {
    setShowWelcomeBanner(false);
  };

  const handleEventClick = (event) => {
    // Navigate to event details or show a dialog
    console.log('Event clicked:', event);
    // Example: navigate(`/student/events/${event.id}`);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([
    { id: 1, text: 'New grade posted for CSC201', time: '2h ago', read: false },
    { id: 2, text: 'Assignment due tomorrow', time: '5h ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewAllResults = () => {
    navigate('/student/results');
  };

  const handleViewAllComplaints = () => {
    navigate('/student/support');
  };

  const handleViewAllDeadlines = () => {
    navigate('/student/planner');
  };

  return (
    <StudentLayout toggleColorMode={toggleColorMode}>
      <Container maxWidth="xl" sx={{ py: 3, overflowX: 'hidden' }} id="welcome-tour">
        {/* Welcome Banner */}
        <AnimatePresence>
          {showWelcomeBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeBanner 
                firstName={user?.displayName?.split(' ')[0] || 'Student'}
                onDismiss={handleDismissWelcome}
                onStartTour={handleStartTour}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Onboarding Tour */}
        <OnboardingTour 
          open={showOnboarding} 
          onClose={() => setShowOnboarding(false)}
          onComplete={handleCompleteOnboarding}
        />
        {/* Stats Section */}
        <Box id="stats-tour" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Overview
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Box 
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: theme.palette.primary.light + '20',
                            color: theme.palette.primary.main,
                            mr: 2,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight={700}>
                            {stat.value}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {stat.title}
                          </Typography>
                        </Box>
                      </Box>
                      {stat.change && (
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            mt: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 4,
                            bgcolor: stat.change.type === 'increase' 
                              ? theme.palette.success.light + '30' 
                              : theme.palette.error.light + '30',
                            color: stat.change.type === 'increase' 
                              ? theme.palette.success.dark 
                              : theme.palette.error.dark,
                          }}
                        >
                          {stat.change.type === 'increase' ? (
                            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                          ) : (
                            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                          )}
                          <Typography variant="caption" fontWeight={500}>
                            {stat.change.value}% {stat.change.type === 'increase' ? 'increase' : 'decrease'} from last week
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back, {user?.displayName || user?.username || 'Student'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar
                src={user?.photoURL}
                sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
              >
                {user?.displayName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'S'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => { navigate('/student/profile'); handleMenuClose(); }}>
                <ListItemIcon>
                  <SchoolIcon fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <EventNoteIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { /* handle sign out */ }}>
                <ListItemIcon>
                  <MoreVertIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Enhanced Summary Cards with Progress and Trends */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.id}>
              <motion.div 
                whileHover={{ 
                  y: -5,
                  boxShadow: theme.shadows[8],
                  transition: { duration: 0.2 }
                }}
                style={{ height: '100%' }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    boxShadow: 3,
                    background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                    border: `1px solid ${stat.color}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 20px ${stat.color}20`
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="flex-start" mb={1}>
                      <Box
                        sx={{
                          backgroundColor: `${stat.color}20`,
                          borderRadius: '12px',
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: stat.color,
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {React.cloneElement(stat.icon, { 
                          fontSize: 'medium',
                          sx: { 
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                            transition: 'all 0.3s ease'
                          } 
                        })}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box display="flex" alignItems="flex-end" mb={0.5}>
                          <Typography 
                            variant="h4" 
                            fontWeight={800} 
                            sx={{ 
                              lineHeight: 1,
                              background: `linear-gradient(45deg, ${stat.color}, ${stat.color}cc)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mr: 1
                            }}
                          >
                            {stat.value}
                          </Typography>
                          {stat.trend && (
                            <Box 
                              component="span" 
                              sx={{ 
                                display: 'inline-flex', 
                                alignItems: 'center',
                                ml: 'auto',
                                color: stat.trend === 'up' ? 'success.main' : 'error.main',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                bgcolor: stat.trend === 'up' ? 'success.light' : 'error.light',
                                px: 1,
                                py: 0.25,
                                borderRadius: 4
                              }}
                            >
                              {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                            </Box>
                          )}
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          color="text.secondary"
                          sx={{ 
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            fontSize: '0.75rem',
                            opacity: 0.8
                          }}
                        >
                          {stat.title}
                        </Typography>
                        
                        {stat.progress && (
                          <Box sx={{ mt: 2 }}>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                              <Typography variant="caption" color="text.secondary">
                                Progress
                              </Typography>
                              <Typography variant="caption" fontWeight={600}>
                                {stat.progress}%
                              </Typography>
                            </Box>
                            <Box 
                              sx={{
                                height: 6,
                                bgcolor: 'divider',
                                borderRadius: 3,
                                overflow: 'hidden'
                              }}
                            >
                              <Box 
                                sx={{
                                  width: `${stat.progress}%`,
                                  height: '100%',
                                  bgcolor: stat.color,
                                  borderRadius: 3,
                                  transition: 'all 0.6s ease',
                                  boxShadow: `0 0 10px ${stat.color}80`
                                }}
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    {stat.status === 'warning' && (
                      <Box 
                        sx={{
                          mt: 1.5,
                          px: 1.5,
                          py: 1,
                          bgcolor: 'warning.light',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { mr: 1, color: 'warning.dark' }
                        }}
                      >
                        <ErrorIcon fontSize="small" />
                        <Typography variant="caption" color="warning.contrastText">
                          Needs attention
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} mb={4}>
          {/* GPA Trend */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                GPA Trend
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gpaData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[0, 4]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="gpa"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="GPA"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          {/* Grade Distribution */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Grade Distribution
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {gradeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Deadlines and Recent Results */}
        <Grid container spacing={3} mb={4} sx={{ '& > *': { minWidth: 0 } }}>
          {/* Upcoming Deadlines */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Deadlines
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleViewAllDeadlines}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              <Box>
                {upcomingDeadlines.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: item.priority === 'high' ? 'error.light' : 'warning.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        color: 'common.white',
                      }}
                    >
                      <AssignmentIcon fontSize="small" />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" fontWeight={500}>
                        {item.title}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={0.5}>
                        <ScheduleIcon color="action" fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="caption" color="text.secondary">
                          Due: {new Date(item.due).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={item.course}
                      size="small"
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Recent Results */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Results
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleViewAllResults}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Grade</TableCell>
                      <TableCell align="right">Credits</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentResults.map((result, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {result.code}
                        </TableCell>
                        <TableCell>{result.title}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={result.grade}
                            size="small"
                            color={
                              result.grade.startsWith('A')
                                ? 'success'
                                : result.grade.startsWith('B')
                                ? 'primary'
                                : result.grade.startsWith('C')
                                ? 'warning'
                                : 'error'
                            }
                            sx={{ minWidth: 50, fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="right">{result.credits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/student/support/new')}
                  startIcon={<HelpIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  New Ticket
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Support Tickets */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 4, overflow: 'hidden' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={600}>
              Support & Complaints
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/student/support/new')}
              startIcon={<AddIcon />}
              sx={{ textTransform: 'none' }}
            >
              New Ticket
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supportTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>#{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status}
                        size="small"
                        color={
                          ticket.status === 'Resolved'
                            ? 'success'
                            : ticket.status === 'In Review'
                            ? 'primary'
                            : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => navigate(`/student/support/${ticket.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Academic Quick Links */}
        <Grid container spacing={3}>
          {/* Today's Schedule */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 3, 
              boxShadow: 3,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              height: '100%'
            }}>
              <Typography variant="h6" fontWeight={600} mb={3} display="flex" alignItems="center">
                <ScheduleIcon color="primary" sx={{ mr: 1.5 }} />
                Today's Schedule
              </Typography>
              
              {todaysSchedule.length > 0 ? (
                <List disablePadding>
                  {todaysSchedule.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem 
                        disablePadding 
                        sx={{ 
                          mb: 2,
                          alignItems: 'flex-start',
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <Box sx={{ 
                          bgcolor: 'primary.light', 
                          color: 'primary.contrastText', 
                          borderRadius: 1,
                          p: 1,
                          minWidth: 80,
                          textAlign: 'center',
                          mr: 2,
                          flexShrink: 0
                        }}>
                          <Typography variant="caption" display="block" fontWeight={600}>
                            {item.time.split(' - ')[0]}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {item.time.split(' - ')[1]}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.course}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
                            <Chip 
                              label={item.type} 
                              size="small" 
                              variant="outlined"
                              color="primary"
                            />
                            <Chip 
                              label={`Room: ${item.room}`} 
                              size="small" 
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </ListItem>
                      {item.id !== todaysSchedule.length && <Divider sx={{ my: 1.5 }} />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box textAlign="center" py={3}>
                  <EventNoteIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                  <Typography color="text.secondary">No classes scheduled for today</Typography>
                </Box>
              )}
              
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<CalendarTodayIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/academics/schedule')}
              >
                View Weekly Schedule
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: 3, 
                height: '100%',
                background: 'linear-gradient(145deg, #f8f9ff 0%, #f0f4ff 100%)',
                border: '1px solid rgba(145, 158, 171, 0.12)'
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight={700} 
                mb={3}
                display="flex"
                alignItems="center"
              >
                <RocketLaunchIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                Quick Access
                <Box flexGrow={1} ml={2} borderBottom="1px solid" borderColor="divider" />
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { 
                    icon: <SchoolIcon sx={{ color: 'primary.main' }} />, 
                    label: 'My Course Dashboard',
                    path: '/academics/courses',
                    color: 'primary.light',
                    description: 'Access course materials, lectures, and resources'
                  },
                  { 
                    icon: <AssignmentIcon sx={{ color: 'secondary.main' }} />, 
                    label: 'Assignments & Exams',
                    path: '/academics/assignments',
                    color: 'secondary.light',
                    description: 'View deadlines and submit work'
                  },
                  { 
                    icon: <GradeIcon sx={{ color: 'success.main' }} />, 
                    label: 'Grades & Transcript',
                    path: '/academics/transcript',
                    color: 'success.light',
                    description: 'Check your academic progress'
                  },
                  { 
                    icon: <CalendarMonthIcon sx={{ color: 'warning.main' }} />, 
                    label: 'Academic Calendar',
                    path: '/academics/calendar',
                    color: 'warning.light',
                    description: 'Important dates and deadlines'
                  },
                  { 
                    icon: <LibraryBooksIcon sx={{ color: 'info.main' }} />, 
                    label: 'Library Resources',
                    path: '/library',
                    color: 'info.light',
                    description: 'Access digital and physical resources'
                  },
                  { 
                    icon: <SupportAgentIcon sx={{ color: 'error.main' }} />, 
                    label: 'Academic Support',
                    path: '/support/academic',
                    color: 'error.light',
                    description: 'Tutoring and academic assistance'
                  },
                ].map((action, index) => (
                  <Grid item xs={6} key={index}>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <CardActionArea 
                        onClick={() => navigate(action.path)}
                        sx={{
                          p: 2,
                          height: '100%',
                          borderRadius: 2,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            borderColor: action.color
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1.5,
                            background: `${action.color}20`,
                            '& svg': {
                              fontSize: '1.25rem'
                            }
                          }}
                        >
                          {action.icon}
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          {action.label}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.4
                          }}
                        >
                          {action.description}
                        </Typography>
                      </CardActionArea>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              <Button
                fullWidth
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={() => navigate('/academics/resources')}
              >
                View All Academic Resources
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Upcoming Events
              </Typography>
              <List>
                {upcomingEvents.map((event) => (
                  <React.Fragment key={event.id}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handleEventClick(event)}>
                        <ListItemIcon>
                          <EventIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={event.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {new Date(event.date).toLocaleDateString()}
                              </Typography>
                              {` — ${event.description}`}
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/student/events')}
                >
                  View All Events
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SmartCampus. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StudentLayout>
  );
};

export default StudentDashboardPage;
