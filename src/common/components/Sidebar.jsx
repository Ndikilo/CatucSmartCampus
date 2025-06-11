// src/common/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Divider, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 220;

const roleLinks = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard' },
    { label: 'Courses', path: '/student/courses' },
  ],
  staff: [
    { label: 'Dashboard', path: '/staff/dashboard' },
    { label: 'Class Schedule', path: '/staff/schedule' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Manage Users', path: '/admin/users' },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const links = roleLinks[user?.role] || [];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Toolbar />
      <List>
        {links.map(({ label, path }) => (
          <ListItemButton key={label} onClick={() => navigate(path)}>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
