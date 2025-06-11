import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Device } from '../types';
import { RATES } from '../constants';

const StyledCard = styled(Card)(({ status, theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `2px solid ${status === 'available' ? theme.palette.success.main : theme.palette.grey[300]}`,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = ({ status }: { status: 'available' | 'in-use' }) => (
  <Chip
    label={status === 'available' ? 'Available' : 'In Use'}
    color={status === 'available' ? 'success' : 'default'}
    size="small"
    sx={{ position: 'absolute', top: 8, right: 8 }}
  />
);

interface DeviceCardProps {
  device: Device;
  onBook: (id: number) => void;
  isSelected?: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onBook, isSelected = false }) => {
  const isPremium = device.specs.includes('32GB');
  const rate = isPremium ? RATES.PREMIUM : RATES.STANDARD;

  return (
    <StyledCard status={device.status}>
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        <StatusChip status={device.status} />
        <Typography variant="h6" component="h2" gutterBottom>
          {device.name}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {device.specs}
        </Typography>
        <Chip 
          label={isPremium ? 'Premium' : 'Standard'} 
          color={isPremium ? 'secondary' : 'primary'} 
          size="small"
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color={isSelected ? 'secondary' : 'primary'}
          variant={isSelected ? 'outlined' : 'contained' as const}
          fullWidth
          onClick={() => onBook(device.id)}
          disabled={device.status !== 'available'}
          sx={{ borderRadius: '20px' }}
        >
          {isSelected ? 'Selected' : device.status === 'available' ? 'Book Now' : 'Not Available'}
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {rate} FCFA/hr
        </Typography>
      </CardActions>
    </StyledCard>
  );
};
