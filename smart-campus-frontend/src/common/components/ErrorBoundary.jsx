import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
            error={this.state.error} 
            onRetry={() => this.setState({ hasError: false, error: null })} 
          />;
    }

    return this.props.children;
  }
}

export const ErrorFallback = ({ error, onRetry }) => {
  const navigate = useNavigate();
  
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
              overflowX: 'auto'
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
            onClick={onRetry}
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

export default ErrorBoundary;
