import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { Booking } from '../types';

interface RecentBookingsProps {
  pastBookings: Booking[];
}

export const RecentBookings: React.FC<RecentBookingsProps> = ({ pastBookings }) => {
  if (pastBookings.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Bookings
      </Typography>
      <Box>
        {pastBookings.map((booking, index) => (
          <Box key={booking.id}>
            <Box sx={{ py: 1.5 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="medium">
                  {booking.computerName}
                </Typography>
                <Typography variant="body2" color="primary">
                  {booking.totalCost} FCFA
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {new Date(booking.startTime).toLocaleString()} • {booking.userName} •{' '}
                {booking.duration} hour{booking.duration > 1 ? 's' : ''}
              </Typography>
            </Box>
            {index < pastBookings.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
