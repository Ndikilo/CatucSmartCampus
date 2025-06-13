import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Typography,
  Box,
  Divider,
  IconButton,
  Avatar,
  Button
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  People,
  School,
  Assignment,
  Analytics,
  Security,
  Settings,
  Description,
  Assessment,
  Support,
  Star,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/context/AuthContext';

const drawerWidth = 260;

const AdminSidebar = ({ user, toggleColorMode, mode }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSection = (section) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      id: 'main',
      title: 'Main',
      icon: <Dashboard />,
      items: [
        { label: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: <People />,
      items: [
        { label: 'Students', icon: <People />, path: '/admin/users/students' },
        { label: 'Staff', icon: <People />, path: '/admin/users/staff' },
        { label: 'Roles & Permissions', icon: <Security />, path: '/admin/users/roles' },
      ]
    },
    {
      id: 'academic',
      title: 'Academic',
      icon: <School />,
      items: [
        { label: 'Courses', icon: <School />, path: '/admin/academic/courses' },
        { label: 'Programs', icon: <School />, path: '/admin/academic/programs' },
        { label: 'Departments', icon: <School />, path: '/admin/academic/departments' },
      ]
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: <Description />,
      items: [
        { label: 'Templates', icon: <Description />, path: '/admin/documents/templates' },
        { label: 'Archives', icon: <Description />, path: '/admin/documents/archives' },
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: <Analytics />,
      items: [
        { label: 'Performance', icon: <Analytics />, path: '/admin/analytics/performance' },
        { label: 'Reports', icon: <Assessment />, path: '/admin/analytics/reports' },
      ]
    },
    {
      id: 'system',
      title: 'System',
      icon: <Settings />,
      items: [
        { label: 'Settings', icon: <Settings />, path: '/admin/system/settings' },
        { label: 'Support', icon: <Support />, path: '/admin/system/support' },
      ]
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          position: 'fixed',
          height: '100vh',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.displayName || 'Admin'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.email || 'admin@example.com'}
              </Typography>
            </Box>
          )}
        </Box>
        <IconButton onClick={handleToggleCollapse} size="small">
          {collapsed ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((section) => (
          <React.Fragment key={section.id}>
            <ListItemButton
              onClick={() => handleToggleSection(section.id)}
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {section.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={section.title} />}
              {!collapsed && (expanded[section.id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={!collapsed && expanded[section.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items.map((item) => (
                  <ListItemButton
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 48,
                      pl: 4,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!collapsed && (
            <Typography variant="body2" color="text.secondary">
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Typography>
          )}
        </Box>
        {!collapsed && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Star />}
            onClick={() => navigate('/admin/upgrade')}
          >
            Upgrade to Pro
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default AdminSidebar; 