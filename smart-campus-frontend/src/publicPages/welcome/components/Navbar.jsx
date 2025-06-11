import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Computer as ComputerIcon,
  Map as MapIcon,
  Help as HelpIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&.scrolled': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { text: 'Library', icon: <BookIcon />, path: '/library' },
    { text: 'Cyber Café', icon: <ComputerIcon />, path: '/cyber-cafe' },
    { text: 'Campus Map', icon: <MapIcon />, path: '/map' },
    { text: 'Hostels', icon: <HomeIcon />, path: '/hostels' },
    { text: 'Help', icon: <HelpIcon />, path: '/help' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            SmartCampus
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem 
          button 
          onClick={() => {
            navigate('/auth/login');
            setMobileOpen(false);
          }}
        >
          <ListItemIcon><LoginIcon /></ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem 
          button 
          onClick={() => {
            navigate('/auth/signup');
            setMobileOpen(false);
          }}
        >
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                SmartCampus
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.text}
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={() => navigate('/auth/login')}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/auth/signup')}
              >
                Register
              </Button>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Toolbar /> {/* This pushes content below the fixed AppBar */}
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
