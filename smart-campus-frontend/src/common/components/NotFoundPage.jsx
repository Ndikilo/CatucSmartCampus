import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Paper,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';

const NotFoundPage = ({ title = 'Page Not Found', message = 'The page you are looking for does not exist or has been moved.' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 6,
            borderRadius: 2,
            maxWidth: '100%',
            width: 600,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              p: 2,
              mb: 3,
              borderRadius: '50%',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 82, 82, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: theme.palette.error.main,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 60 }} />
          </Box>

          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: isMobile ? '2rem' : '3rem',
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: isMobile ? '1.5rem' : '2rem',
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: '80%',
              mx: 'auto',
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: 1.6,
            }}
          >
            {message}
          </Typography>
          
          <Box 
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              justifyContent: 'center',
              width: '100%',
              '& > *': {
                flex: isMobile ? 'none' : 1,
                maxWidth: isMobile ? '100%' : 'auto',
              },
            }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              fullWidth={isMobile}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Go Back
            </Button>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              fullWidth={isMobile}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Go to Homepage
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="text.secondary">
              Need help?{' '}
              <Button 
                variant="text" 
                size="small" 
                sx={{ 
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    background: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Contact Support
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
