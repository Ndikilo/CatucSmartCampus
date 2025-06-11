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
import { Box } from "@mui/material";
import StudentSidebar from "./StudentSidebar";
import StudentTopNav from "./StudentTopNav";

const StudentLayout = ({ children, toggleColorMode }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <StudentSidebar />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        overflow: 'hidden',
        ml: { sm: '260px' }, // Match sidebar width
        width: { sm: `calc(100% - 260px)` } // Adjust width to account for sidebar
      }}>
        <StudentTopNav toggleColorMode={toggleColorMode} />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 3, 
            bgcolor: 'background.default',
            mt: '64px' // Height of the top navigation
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentLayout;
