import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { Book as BookIcon, Computer as ComputerIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSectionWrapper = styled('section')(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
  color: 'white',
  padding: theme.spacing(18, 0, 12),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12, 0, 8),
  },
}));

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
});

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(3),
  fontSize: '3.75rem',
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  opacity: 0.9,
  fontWeight: 300,
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '1.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
    padding: theme.spacing(0, 2),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '50px',
  fontWeight: 500,
  margin: theme.spacing(0, 1),
  '&.primary': {
    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    },
  },
  '&.secondary': {
    borderWidth: '2px',
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      borderWidth: '2px',
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
}));

const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [institution, setInstitution] = useState('');

  useEffect(() => {
    // Get institution from location state or default to empty string
    const state = window.history.state?.usr?.state;
    if (state?.institution) {
      // Map of institution IDs to their abbreviations
      const institutionAbbreviations = {
        'catuc': 'CATUC',
        'uba': 'UBa',
        'npuib': 'NPUIB',
        'smu': 'SMU',
        'ict': 'ICTU',
        'guest': ''
      };
      setInstitution(institutionAbbreviations[state.institution] || '');
    }
  }, []);

  return (
    <HeroSectionWrapper>
      <Container maxWidth="lg">
        <HeroContent>
          <AnimateFadeIn>
            <HeroTitle variant="h1" component="h1">
              {institution ? `Welcome to ${institution} SmartCampus` : 'Welcome to SmartCampus'}
            </HeroTitle>
            
            <HeroSubtitle variant="h5" component="h2">
              Your Gateway to a Seamless University Experience
            </HeroSubtitle>



            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              '& > *': {
                width: isMobile ? '100%' : 'auto',
              }
            }}>
              <ActionButton
                variant="contained"
                size="large"
                onClick={() => navigate('/library')}
                className="primary"
                startIcon={<BookIcon />}
              >
                Explore Library
              </ActionButton>
              
              <ActionButton
                variant="outlined"
                size="large"
                onClick={() => navigate('/cyber-cafe')}
                className="secondary"
                startIcon={<ComputerIcon />}
              >
                Visit Cyber Café
              </ActionButton>
            </Box>
          </AnimateFadeIn>
        </HeroContent>
      </Container>
    </HeroSectionWrapper>
  );
};

const AnimateFadeIn = ({ children }) => (
  <Box sx={{ animation: `${fadeIn} 0.8s ease-out` }}>
    {children}
  </Box>
);

export default HeroSection;
