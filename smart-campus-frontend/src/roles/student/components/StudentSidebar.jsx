import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const menuItems = [
  {
    label: 'Academics',
    icon: <SchoolIcon />,
    subItems: [
      { label: 'Courses', route: '/student/academics/courses' },
      { label: 'Time Table', route: '/student/academics/timetable' },
      { label: 'Results', route: '/student/academics/results' },
      { label: 'Assignments', route: '/student/academics/assignments' },
    ],
  },
  {
    label: 'Resources',
    icon: <ComputerIcon />,
    subItems: [
      { label: 'IT Lab', route: '/student/resources/it-lab' },
      { label: 'Library', route: '/student/resources/library' },
      { label: 'Canteen', route: '/student/resources/canteen' },
      { label: 'Health Complex', route: '/student/resources/health-complex' },
      { label: 'Sports Complex', route: '/student/resources/sports-complex' },
    ],
  },
  {
    label: 'Finances',
    icon: <AttachMoneyIcon />,
    subItems: [
      { label: 'Personal Accounts', route: '/student/finances/personal-accounts' },
      { label: 'Fees Payment', route: '/student/finances/fees-payment' },
    ],
  },
  {
    label: 'Socials',
    icon: <PeopleIcon />,
    subItems: [
      { label: 'Message', route: '/student/socials/message' },
      { label: 'Market', route: '/student/socials/market' },
      { label: 'Community', route: '/student/socials/community' },
    ],
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    subItems: [
      { label: 'Theme Setting', route: '/student/settings/theme' },
      { label: 'Font Setting', route: '/student/settings/font' },
    ],
  },
  {
    label: 'Logout',
    icon: <ExitToAppIcon />,
    route: '/logout',
  },
];

const StudentSidebar = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = React.useState({});

  const handleToggle = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem button onClick={() => item.subItems ? handleToggle(item.label) : handleNavigation(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.subItems ? (
                openSections[item.label] ? <ExpandLess /> : <ExpandMore />
              ) : null}
            </ListItem>
            {item.subItems && (
              <Collapse in={openSections[item.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem 
                      button 
                      key={subItem.label} 
                      sx={{ pl: 4 }} 
                      onClick={() => handleNavigation(subItem.route)}>
                      <ListItemText primary={subItem.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default StudentSidebar;
