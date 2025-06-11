import React, { useState, useEffect } from 'react';
import { Box, useScrollTrigger, Fab, Zoom, useTheme, useMediaQuery } from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Scroll to top button component
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const Welcome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div id="back-to-top-anchor" />
      
      {/* Navigation Bar */}
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Announcements Section */}
      <AnnouncementsSection />
      
      {/* Call to Action Section */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollTop>
        <Fab 
          color="primary" 
          size="small" 
          aria-label="scroll back to top" 
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default Welcome;
