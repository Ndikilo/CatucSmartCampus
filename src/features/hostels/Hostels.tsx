import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container, Grid } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import HostelCard from './components/HostelCard';
import HostelApplication from './components/HostelApplication';
import { useHostels } from './hooks/useHostels';
import { useBookings } from './hooks/useBookings';

const Hostels: React.FC = () => {
  // State
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Hooks
  const { hostels, loading: hostelsLoading, error: hostelsError } = useHostels();
  const { createBooking, loading: bookingInProgress } = useBookings();

  // Handlers
  const handleApplyNow = useCallback((hostel, roomType) => {
    setSelectedHostel(hostel);
    setSelectedRoomType(roomType);
    setApplicationOpen(true);
  }, []);

  const handleCloseApplication = useCallback(() => {
    setApplicationOpen(false);
    setTimeout(() => {
      setSelectedHostel(null);
      setSelectedRoomType('');
    }, 300);
  }, []);

  const handleSubmitApplication = useCallback(async (formData) => {
    try {
      // In a real app, you would submit this to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Application submitted successfully! We will contact you soon.',
        severity: 'success',
      });
      
      handleCloseApplication();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit application. Please try again.',
        severity: 'error',
      });
    }
  }, [handleCloseApplication]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  // Render
  if (hostelsLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading hostels...</Typography>
      </Container>
    );
  }

  if (hostelsError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading hostels: {hostelsError}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Campus Hostels
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find your perfect home away from home
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {hostels.map((hostel) => (
          <Grid item xs={12} md={6} lg={4} key={hostel.id}>
            <HostelCard 
              hostel={hostel} 
              onApplyNow={handleApplyNow}
            />
          </Grid>
        ))}
      </Grid>

      {/* Application Dialog */}
      <HostelApplication
        open={applicationOpen}
        onClose={handleCloseApplication}
        onSubmit={handleSubmitApplication}
        hostel={selectedHostel}
        roomType={selectedRoomType}
        loading={bookingInProgress}
      />

      {/* Snackbar */}
      {snackbar.open && (
        <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1400 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              bgcolor: snackbar.severity === 'error' ? 'error.light' : 'success.light',
              color: 'white',
            }}
          >
            <Typography>{snackbar.message}</Typography>
          </Paper>
        </div>
      )}
    </Container>
  );
};

export default Hostels;
