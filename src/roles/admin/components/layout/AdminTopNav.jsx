import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../common/context/AuthContext';

const AdminTopNav = ({ onMenuClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([
    { id: 1, text: 'New user registration', time: '2h ago', read: false },
    { id: 2, text: 'System update available', time: '5h ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    const role = user?.role;
    if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'staff') {
      navigate('/staff/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/auth/login');
    }
  };

  const settings = [
    { text: 'Profile', icon: <AccountCircle fontSize="small" />, action: () => navigate('/admin/profile') },
    { text: 'Settings', icon: <SettingsIcon fontSize="small" />, action: () => navigate('/admin/settings') },
    { text: 'Logout', icon: <LogoutIcon fontSize="small" />, action: handleLogout },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          SmartCampus Admin
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
            onClick={() => navigate('/admin/notifications')}
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
              src={user?.photoURL}
              alt={user?.displayName}
              sx={{ width: 32, height: 32 }}
            >
              {user?.displayName?.[0]?.toUpperCase() || 'A'}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

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
            {user?.displayName || 'Admin'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email || 'admin@example.com'}
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
    </AppBar>
  );
};

export default AdminTopNav; 