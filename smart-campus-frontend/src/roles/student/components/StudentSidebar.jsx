// src/roles/student/components/StudentSidebar.jsx
import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItemButton, ListItemText, Collapse, ListItemIcon, Typography, Box, Divider
} from '@mui/material';
import {
  ExpandLess, ExpandMore, School, MenuBook, Schedule, Grade, Assignment,
  LocalLibrary, Restaurant, HealthAndSafety, SportsSoccer,
  AccountBalanceWallet, Message, Store, People, Settings, ColorLens, TextFields, Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const sidebarSections = [
  {
    id: 'academics',
    title: 'Academics',
    icon: <School />,
    items: [
      { label: 'Courses', icon: <MenuBook />, path: 'courses' },
      { label: 'Timetable', icon: <Schedule />, path: 'timetable' },
      { label: 'Results', icon: <Grade />, path: 'results' },
      { label: 'Assignments', icon: <Assignment />, path: 'assignments' },
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: <LocalLibrary />,
    items: [
      { label: 'Library', icon: <LocalLibrary />, path: 'library' },
      { label: 'IT Lab', icon: <MenuBook />, path: 'it-lab' },
      { label: 'Canteen', icon: <Restaurant />, path: 'canteen' },
      { label: 'Health Complex', icon: <HealthAndSafety />, path: 'health-complex' },
      { label: 'Sports Complex', icon: <SportsSoccer />, path: 'sports-complex' },
    ]
  },
  {
    id: 'finances',
    title: 'Finances',
    icon: <AccountBalanceWallet />,
    items: [
      { label: 'Personal Accounts', icon: <AccountBalanceWallet />, path: 'accounts' },
      { label: 'Fees Payment', icon: <AccountBalanceWallet />, path: 'fees' },
    ]
  },
  {
    id: 'socials',
    title: 'Socials',
    icon: <People />,
    items: [
      { label: 'Message', icon: <Message />, path: 'messages' },
      { label: 'Market', icon: <Store />, path: 'market' },
      { label: 'Community', icon: <People />, path: 'community' },
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings />,
    items: [
      { label: 'Theme Setting', icon: <ColorLens />, path: 'theme' },
      { label: 'Font Setting', icon: <TextFields />, path: 'font' },
    ]
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: <Logout />,
    items: [] // Logout handled as direct action
  }
];

const StudentSidebar = () => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (id, hasItems) => {
    if (hasItems) {
      setOpenSection(prev => (prev === id ? null : id));
    } else if (id === 'logout') {
      console.log('Logging out...');
      // Implement logout logic here
    }
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setOpenSection(null);
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          backgroundColor: '#0D1B2A',
          color: '#FFFFFF',
          borderRight: 'none',
          overflowY: 'auto',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Student Dashboard</Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List>
        {sidebarSections.map(({ id, title, icon, items }) => {
          const isOpen = openSection === id;
          const hasItems = items.length > 0;

          return (
            <Box key={id}>
              <ListItemButton
                onClick={() => handleToggle(id, hasItems)}
                sx={{
                  bgcolor: isOpen ? '#1B263B' : 'transparent',
                  '&:hover': { bgcolor: '#1B263B' }
                }}
              >
                <ListItemIcon sx={{ color: '#FFFFFF' }}>{icon}</ListItemIcon>
                <ListItemText primary={<Typography fontWeight={500}>{title}</Typography>} />
                {hasItems && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {hasItems && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {items.map(({ label, icon, path }) => (
                      <ListItemButton
                        key={label}
                        sx={{ pl: 4, '&:hover': { bgcolor: '#1E3A5F' } }}
                        onClick={() => handleItemClick(path)}
                      >
                        <ListItemIcon sx={{ color: '#FFFFFF' }}>{icon}</ListItemIcon>
                        <ListItemText
                          primary={<Typography fontSize={14}>{label}</Typography>}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default StudentSidebar;
