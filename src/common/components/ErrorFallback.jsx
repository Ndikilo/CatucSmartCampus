import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  
  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
            We apologize for the inconvenience. An error occurred while loading this page.
          </Typography>
        </Box>
        
        {error && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: 'background.default',
              textAlign: 'left',
              overflowX: 'auto',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            <Typography variant="caption" color="error">
              {error.message || 'Unknown error'}
            </Typography>
          </Paper>
        )}
        
        <Box sx={{ '& > *:not(:last-child)': { mr: 2 } }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleReset}
            sx={{ mr: 2 }}
          >
            Try Again
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ErrorFallback;
