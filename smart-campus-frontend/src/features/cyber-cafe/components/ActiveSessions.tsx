import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { Booking } from '../types';

interface ActiveSessionsProps {
  activeBookings: Booking[];
  onEndSession: (bookingId: number) => void;
}

export const ActiveSessions: React.FC<ActiveSessionsProps> = ({
  activeBookings,
  onEndSession,
}) => {
  if (activeBookings.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Active Sessions
      </Typography>
      <Box>
        {activeBookings.map((booking) => (
          <Box
            key={booking.id}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {booking.computerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {booking.userName} • {booking.duration} hour{booking.duration > 1 ? 's' : ''}
                </Typography>
                <Typography variant="body2" color="primary" fontWeight="medium">
                  {booking.totalCost} FCFA
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onEndSession(booking.id)}
                sx={{ borderRadius: '20px' }}
              >
                End Session
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
