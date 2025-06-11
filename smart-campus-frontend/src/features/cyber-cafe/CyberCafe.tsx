import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { Computer, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useDevices } from './hooks/useDevices';
import { useBookings } from './hooks/useBookings';
import { DeviceCard } from './components/DeviceCard';
import { BookingForm } from './components/BookingForm';
import { ActiveSessions } from './components/ActiveSessions';
import { RecentBookings } from './components/RecentBookings';
import { SnackbarNotification } from './components/SnackbarNotification';
import WelcomeBanner from './components/WelcomeBanner';
import { DeviceType, SnackbarSeverity } from './types';
import { SNACKBAR_SEVERITY } from './constants';

const CyberCafe: React.FC = () => {
  // State
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | ''>('');
  const [userName, setUserName] = useState('');
  const [duration, setDuration] = useState(1);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Hooks
  const {
    devices,
    deviceType,
    setDeviceType,
    bookDevice,
    releaseDevice,
    getDeviceById,
    getAvailableDevices,
  } = useDevices();

  const {
    createBooking,
    endBooking,
    isLoading: isBookingInProgress,
    getActiveBookings,
    getRecentBookings,
  } = useBookings();

  // Derived state
  const availableDevices = getAvailableDevices(deviceType);
  const activeBookings = getActiveBookings();
  const recentBookings = getRecentBookings(5);
  const filteredDevices = devices.filter((device) => device.type === deviceType);

  // Handlers
  const handleDeviceSelect = (deviceId: number) => {
    setSelectedDeviceId(selectedDeviceId === deviceId ? '' : deviceId);
  };

  const handleBookDevice = useCallback(async () => {
    if (selectedDeviceId === '' || !userName) return;

    try {
      const device = getDeviceById(selectedDeviceId);
      if (!device || device.status !== 'available') {
        throw new Error('Selected device is not available');
      }

      await createBooking(
        selectedDeviceId,
        device.name,
        userName,
        duration,
        device.specs
      );

      bookDevice(selectedDeviceId);
      showMessage(`Successfully booked ${device.name} for ${duration} hour(s)`, 'success');
      
      // Reset form
      setSelectedDeviceId('');
      setUserName('');
      setDuration(1);
    } catch (error) {
      showMessage(
        `Error: ${error instanceof Error ? error.message : 'An error occurred'}`,
        'error' as SnackbarSeverity
      );
    }
  }, [selectedDeviceId, userName, duration, createBooking, bookDevice, getDeviceById]);

  const handleEndSession = useCallback(
    (bookingId: number) => {
      const booking = getActiveBookings().find((b) => b.id === bookingId);
      if (!booking) return;

      endBooking(bookingId);
      releaseDevice(booking.computerId);
      showMessage(`Session for ${booking.computerName} has been ended`, 'success');
    },
    [endBooking, releaseDevice, getActiveBookings]
  );

  const showMessage = (message: string, severity: SnackbarSeverity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WelcomeBanner />
      <Box sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Computer color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.2,
                  mb: 1
                }}
              >
                CYBER CAFÉ
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
            {/* Available Devices */}
            <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / 2' } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  {deviceType === 'desktop' ? 'Desktops' : 'Laptops'} 
                  ({availableDevices.length} of {filteredDevices.length} available)
                </Typography>
                <Box>
                  <Button 
                    variant={deviceType === 'desktop' ? 'contained' : 'outlined'}
                    size="small" 
                    onClick={() => setDeviceType('desktop' as DeviceType)}
                    sx={{ 
                      mr: 1, 
                      textTransform: 'none',
                      borderRadius: '20px',
                      '&.MuiButton-contained': {
                        boxShadow: 'none',
                      },
                      '&:hover': {
                        boxShadow: 'none',
                      }
                    }}
                  >
                    Desktops
                  </Button>
                  <Button 
                    variant={deviceType === 'laptop' ? 'contained' : 'outlined'}
                    size="small" 
                    onClick={() => setDeviceType('laptop' as DeviceType)}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: '20px',
                      '&.MuiButton-contained': {
                        boxShadow: 'none',
                      },
                      '&:hover': {
                        boxShadow: 'none',
                      }
                    }}
                  >
                    Laptops
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                {filteredDevices.map((device) => (
                  <Box key={device.id}>
                    <DeviceCard
                      device={device}
                      onBook={handleDeviceSelect}
                      isSelected={selectedDeviceId === device.id}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Booking Section */}
            <Box sx={{ gridColumn: { xs: '1 / -1', md: '2 / 3' } }}>
              <BookingForm
                selectedDeviceId={selectedDeviceId}
                userName={userName}
                duration={duration}
                devices={filteredDevices}
                onDeviceSelect={setSelectedDeviceId}
                onUserNameChange={setUserName}
                onDurationChange={setDuration}
                onSubmit={handleBookDevice}
                isSubmitting={isBookingInProgress}
              />

              <ActiveSessions
                activeBookings={activeBookings}
                onEndSession={handleEndSession}
              />

              <RecentBookings pastBookings={recentBookings} />
            </Box>
          </Box>
        </Paper>

        <SnackbarNotification
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </Container>
  );
};

export default CyberCafe;
