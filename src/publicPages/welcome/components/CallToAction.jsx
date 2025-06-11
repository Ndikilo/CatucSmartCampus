import React from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Login as LoginIcon, PersonAdd as PersonAddIcon, School as SchoolIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CtaSection = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `linear-gradient(rgba(25, 118, 210, 0.9), rgba(25, 118, 210, 0.9)), url('/images/cta-bg.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  textAlign: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const CtaContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const CtaTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const CtaDescription = styled(Typography)(({ theme }) => ({
  maxWidth: '700px',
  margin: '0 auto',
  marginBottom: theme.spacing(5),
  fontSize: '1.2rem',
  opacity: 0.9,
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    padding: theme.spacing(0, 2),
  },
}));

const CtaButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  textTransform: 'none',
  borderRadius: '50px',
  fontWeight: 500,
  margin: theme.spacing(0, 1),
  '&.primary': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
  },
  '&.outlined': {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'white',
    },
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
}));

const CallToAction = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CtaSection>
      <CtaContainer maxWidth="lg">
        <CtaTitle variant="h3" component="h2">
          Ready to Get Started?
        </CtaTitle>
        
        <CtaDescription variant="h6" component="p">
          Join thousands of students and staff who are already using SmartCampus to enhance their university experience.
        </CtaDescription>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          '& > *': {
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? '100%' : '200px',
          }
        }}>
          <CtaButton
            variant="contained"
            className="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/auth/signup')}
          >
            Create Account
          </CtaButton>
          
          <CtaButton
            variant="outlined"
            className="outlined"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/auth/login')}
          >
            Sign In
          </CtaButton>
        </Box>
        
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={4} display="grid">
            <FeatureItem>
              <SchoolIcon sx={{ fontSize: 48, mb: 2, color: 'white' }} />
              <Typography variant="h5" component="h3" gutterBottom>
                For Students
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 2, opacity: 0.9 }}>
                Access course materials, library resources, and campus services all in one place.
              </Typography>
              <Button 
                variant="text" 
                endIcon={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>→</Box>}
                sx={{ color: 'white', fontWeight: 500, mt: 'auto' }}
                onClick={() => navigate('/students')}
              >
                Learn more
              </Button>
            </FeatureItem>
          </Grid>
          
          <Grid item xs={12} md={4} display="grid">
            <FeatureItem>
              <SchoolIcon sx={{ fontSize: 48, mb: 2, color: 'white' }} />
              <Typography variant="h5" component="h3" gutterBottom>
                For Faculty
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 2, opacity: 0.9 }}>
                Manage courses, connect with students, and access teaching resources.
              </Typography>
              <Button 
                variant="text" 
                endIcon={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>→</Box>}
                sx={{ color: 'white', fontWeight: 500, mt: 'auto' }}
                onClick={() => navigate('/faculty')}
              >
                Learn more
              </Button>
            </FeatureItem>
          </Grid>
          
          <Grid item xs={12} md={4} display="grid">
            <FeatureItem>
              <SchoolIcon sx={{ fontSize: 48, mb: 2, color: 'white' }} />
              <Typography variant="h5" component="h3" gutterBottom>
                For Staff
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 2, opacity: 0.9 }}>
                Access administrative tools and resources to support campus operations.
              </Typography>
              <Button 
                variant="text" 
                endIcon={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>→</Box>}
                sx={{ color: 'white', fontWeight: 500, mt: 'auto' }}
                onClick={() => navigate('/staff')}
              >
                Learn more
              </Button>
            </FeatureItem>
          </Grid>
        </Grid>
      </CtaContainer>
    </CtaSection>
  );
};

export default CallToAction;
