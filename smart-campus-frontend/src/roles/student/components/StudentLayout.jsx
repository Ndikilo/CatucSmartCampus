// // src/roles/student/components/StudentLayout.jsx
// import React, { useState } from 'react';
// import {
//   Box, Drawer, AppBar, Toolbar, Typography, IconButton, Divider, List,
//   ListItemButton, ListItemIcon, ListItemText, Collapse, CssBaseline, Avatar,
//   useTheme, useMediaQuery
// } from '@mui/material';

// import {
//   Menu as MenuIcon, ExpandLess, ExpandMore, Logout as LogoutIcon,
//   Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon
// } from '@mui/icons-material';

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../common/context/AuthContext';

// const drawerWidth = 240;

// const StudentLayout = ({ children, sidebarSections = [], toggleColorMode }) => {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [openDrawer, setOpenDrawer] = useState(!isMobile);
//   const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

//   const handleToggleDrawer = () => setOpenDrawer(prev => !prev);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/auth/login');
//   };

//   const toggleSection = (title) => {
//     setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleToggleDrawer} sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
//             SmartCampus - Student
//           </Typography>
//           <IconButton onClick={toggleColorMode} color="inherit">
//             {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//           <Avatar sx={{ ml: 2 }}>
//             {user?.username?.[0]?.toUpperCase() || 'S'}
//           </Avatar>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant={isMobile ? 'temporary' : 'persistent'}
//         open={openDrawer}
//         onClose={handleToggleDrawer}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box'
//           }
//         }}
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {sidebarSections.map(({ title, items }) => (
//             <Box key={title}>
//               <ListItemButton onClick={() => toggleSection(title)}>
//                 <ListItemText primary={title} />
//                 {expanded[title] ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={expanded[title]} timeout="auto" unmountOnExit>
//                 <List disablePadding>
//                   {items.map(({ label, icon, link }) => (
//                     <ListItemButton
//                       key={label}
//                       sx={{ pl: 4 }}
//                       onClick={() => navigate(link)}
//                     >
//                       <ListItemIcon>{icon}</ListItemIcon>
//                       <ListItemText primary={label} />
//                     </ListItemButton>
//                   ))}
//                 </List>
//               </Collapse>
//             </Box>
//           ))}
//         </List>
//         <Divider />
//         <ListItemButton onClick={handleLogout}>
//           <ListItemIcon><LogoutIcon /></ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default StudentLayout;



// StudentLayout.jsx

import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentTopNav from "./StudentTopNav";

const StudentLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentTopNav />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
