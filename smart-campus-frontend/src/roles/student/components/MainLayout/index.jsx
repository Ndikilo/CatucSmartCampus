import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  useScrollTrigger,
  Slide,
  Fab,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarIcon,
  EmojiEvents as GamificationIcon,
  Analytics as AnalyticsIcon,
  SelfImprovement as WellbeingIcon,
  Description as DocumentsIcon,
  Work as CareerIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  Star as StarIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../common/context/AuthContext';
import { useTheme as useAppTheme } from '../../../../common/context/ThemeContext';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  })
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ScrollTop = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.speedDial,
}));

function ScrollToTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Slide in={trigger} direction="up">
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Slide>
  );
}

const MainLayout = ({ children }) => {
  const theme = useMuiTheme();
  const { mode, toggleColorMode } = useAppTheme ? useAppTheme() : { mode: 'light', toggleColorMode: () => {} };
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activePath, setActivePath] = useState('/student/dashboard');

  // Mock notifications
  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    const mockNotifications = [
      { id: 1, text: 'New assignment posted for CS101', time: '2h ago', read: false },
      { id: 2, text: 'Grade updated for MATH201', time: '5h ago', read: true },
      { id: 3, text: 'Upcoming event: Career Fair', time: '1d ago', read: true },
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/auth/login');
  };

  const handleToggleSection = (section) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/student/dashboard',
      section: null,
    },
    {
      text: 'Courses',
      icon: <SchoolIcon />,
      path: '/student/courses',
      section: 'academics',
      children: [
        { text: 'My Courses', path: '/student/courses' },
        { text: 'Course Materials', path: '/student/courses/materials' },
        { text: 'Assignments', path: '/student/assignments' },
        { text: 'Grades', path: '/student/grades' },
      ],
    },
    {
      text: 'Calendar',
      icon: <CalendarIcon />,
      path: '/student/calendar',
      section: 'calendar',
    },
    {
      text: 'Gamification',
      icon: <GamificationIcon />,
      path: '/student/gamification',
      section: 'gamification',
    },
    {
      text: 'Analytics',
      icon: <AnalyticsIcon />,
      path: '/student/analytics',
      section: 'analytics',
    },
    {
      text: 'Wellbeing',
      icon: <WellbeingIcon />,
      path: '/student/wellbeing',
      section: 'wellbeing',
    },
    {
      text: 'Documents',
      icon: <DocumentsIcon />,
      path: '/student/documents',
      section: 'documents',
    },
    {
      text: 'Career',
      icon: <CareerIcon />,
      path: '/student/career',
      section: 'career',
    },
  ];

  const settings = [
    { text: 'Profile', icon: <AccountCircle fontSize="small" />, action: () => navigate('/student/profile') },
    { text: 'Settings', icon: <SettingsIcon fontSize="small" />, action: () => navigate('/student/settings') },
    { text: 'Logout', icon: <LogoutIcon fontSize="small" />, action: handleLogout },
  ];

  const drawer = (
    <div>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
          <Avatar
            src={user?.photoURL || '/default-avatar.png'}
            alt={user?.displayName || 'User'}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap>
              {user?.displayName || 'Student'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email || 'student@example.com'}
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} size="small">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={activePath === item.path}
                onClick={() => {
                  if (item.children) {
                    handleToggleSection(item.text);
                  } else {
                    navigate(item.path);
                    setActivePath(item.path);
                    if (isMobile) setMobileOpen(false);
                  }
                }}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.children && (
                  expanded[item.text] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={expanded[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.text}
                      selected={activePath === child.path}
                      onClick={() => {
                        navigate(child.path);
                        setActivePath(child.path);
                        if (isMobile) setMobileOpen(false);
                      }}
                      sx={{
                        pl: 6,
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.action.selected,
                          '&:hover': {
                            backgroundColor: theme.palette.action.selected,
                          },
                        },
                      }}
                    >
                      <ListItemText primary={child.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<StarIcon />}
          onClick={() => navigate('/student/upgrade')}
          sx={{ mb: 1 }}
        >
          Upgrade to Pro
        </Button>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open} elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SmartCampus
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={unreadCount} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              sx={{ mr: 1 }}
              onClick={() => navigate('/student/notifications')}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 1 }}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <Avatar
                src={user?.photoURL || '/default-avatar.png'}
                alt={user?.displayName || 'User'}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBarStyled>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'persistent'}
          open={isMobile ? mobileOpen : open}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflowY: 'auto',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Main open={open}>
        <Toolbar id="back-to-top-anchor" />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children || <Outlet />}
          </motion.div>
        </AnimatePresence>
      </Main>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 200,
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName || 'Student'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email || 'student@example.com'}
          </Typography>
        </Box>
        <Divider />
        {settings.map((setting) => (
          <MenuItem key={setting.text} onClick={setting.action}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <ListItemText primary={setting.text} />
          </MenuItem>
        ))}
      </Menu>

      <ScrollToTop>
        <Fab
          size="small"
          aria-label="scroll back to top"
          color="primary"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </Box>
  );
};

export default MainLayout;
