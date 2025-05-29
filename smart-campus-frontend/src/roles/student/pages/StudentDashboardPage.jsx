// src/roles/student/pages/StudentDashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List,
  ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, useTheme,
  Card, Grid, CardActionArea, Container, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GradeIcon from '@mui/icons-material/Grade';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../../common/context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, Tooltip as RechartTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const drawerWidth = 240;
const COLORS = ['#4caf50', '#f44336'];

const sidebarItems = [
  {
    section: 'Academics', items: [
      { label: 'Courses', icon: <MenuBookIcon />, link: 'courses' },
      { label: 'Timetable', icon: <ScheduleIcon />, link: 'timetable' },
      { label: 'Results', icon: <GradeIcon />, link: 'results' },
      { label: 'Assignments', icon: <AssignmentIcon />, link: 'assignments' },
    ]
  },
  {
    section: 'Resources', items: [
      { label: 'Library', icon: <SchoolIcon />, link: 'library' },
      { label: 'IT Lab', icon: <MenuBookIcon />, link: 'it-lab' },
      { label: 'Canteen', icon: <EventIcon />, link: 'canteen' },
      { label: 'Health', icon: <HelpIcon />, link: 'health-complex' },
      { label: 'Sports', icon: <EventIcon />, link: 'sports-complex' },
    ]
  }
];

const stats = [
  { title: 'Courses', value: 6, icon: <MenuBookIcon /> },
  { title: 'Assignments', value: 2, icon: <AssignmentIcon /> },
  { title: 'GPA', value: '3.7', icon: <GradeIcon /> },
  { title: 'Messages', value: 4, icon: <EventIcon /> },
];

const gpaData = [
  { semester: 'Sem 1', gpa: 3.5 },
  { semester: 'Sem 2', gpa: 3.6 },
  { semester: 'Sem 3', gpa: 3.7 },
  { semester: 'Sem 4', gpa: 3.7 },
];

const assignmentData = [
  { name: 'Done', value: 8 },
  { name: 'Pending', value: 2 }
];

const StudentDashboardPage = ({ toggleColorMode }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);

  const handleDrawerToggle = () => setOpen(!open);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Student Dashboard</Typography>
          <IconButton sx={{ ml: 'auto' }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Avatar sx={{ ml: 2 }}>{user?.username?.[0]?.toUpperCase() || 'S'}</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        <Toolbar />
        <Divider />
        {sidebarItems.map(section => (
          <Box key={section.section} sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>{section.section}</Typography>
            <List>
              {section.items.map(item => (
                <ListItemButton key={item.label} onClick={() => navigate(item.link)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
            <Divider />
          </Box>
        ))}
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          {/* Greeting */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box display="flex" alignItems="center" mb={4}>
              <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                {user?.username?.[0]?.toUpperCase() || 'S'}
              </Avatar>
              <Box>
                <Typography variant="h4">Welcome, {user?.username}</Typography>
                <Typography color="textSecondary">{new Date().toLocaleDateString()}</Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Stats */}
          <Grid container spacing={3} mb={4}>
            {stats.map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                    <Typography variant="h5" color="primary.main">{s.value}</Typography>
                    <Typography color="textSecondary">{s.title}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={4} mb={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, boxShadow: 3 }}>
                <Typography gutterBottom>Academic Progress</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={gpaData}>
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <RechartTooltip />
                    <Line dataKey="gpa" stroke={theme.palette.primary.main} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, boxShadow: 3 }}>
                <Typography gutterBottom>Assignment Status</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={assignmentData} outerRadius={60} dataKey="value">
                      {assignmentData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>

          {/* Tools */}
          <Typography variant="h5" mb={2}>Student Tools</Typography>
          <Grid container spacing={2}>
            {sidebarItems.flatMap(s => s.items).map((item, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <motion.div whileHover={{ y: -5 }}>
                  <CardActionArea
                    onClick={() => navigate(item.link)}
                    sx={{ p: 2, boxShadow: 3, textAlign: 'center', borderRadius: 2 }}
                  >
                    {item.icon}
                    <Typography mt={1}>{item.label}</Typography>
                  </CardActionArea>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default StudentDashboardPage;
