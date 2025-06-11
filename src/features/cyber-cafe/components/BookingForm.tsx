import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { DURATION_OPTIONS } from '../constants';
import { Device } from '../types';

interface BookingFormProps {
  selectedDeviceId: number | '';
  userName: string;
  duration: number;
  devices: Device[];
  onDeviceSelect: (id: number | '') => void;
  onUserNameChange: (name: string) => void;
  onDurationChange: (duration: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedDeviceId,
  userName,
  duration,
  devices,
  onDeviceSelect,
  onUserNameChange,
  onDurationChange,
  onSubmit,
  isSubmitting,
}) => {
  const selectedDevice = devices.find(device => device.id === selectedDeviceId);
  const isPremium = selectedDevice?.specs.includes('32GB') || false;
  const rate = isPremium ? 150 : 100; // FCFA per hour
  const totalCost = selectedDeviceId ? rate * duration : 0;

  const availableDevices = devices.filter(device => device.status === 'available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleDeviceChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
    onDeviceSelect(value === '' ? '' : Number(value));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Book a Device
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="device-select-label">Select Device</InputLabel>
          <Select
            labelId="device-select-label"
            value={selectedDeviceId || ''}
            label="Select Device"
            onChange={handleDeviceChange}
            disabled={availableDevices.length === 0}
          >
            <MenuItem value="">
              <em>Select a device</em>
            </MenuItem>
            {availableDevices.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name} ({device.specs.includes('32GB') ? 'Premium' : 'Standard'})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Your Name"
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
          required
          disabled={availableDevices.length === 0}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="duration-label">Duration (hours)</InputLabel>
          <Select
            labelId="duration-label"
            value={duration}
            label="Duration (hours)"
            onChange={(e) => onDurationChange(Number(e.target.value))}
            disabled={!selectedDeviceId}
          >
            {DURATION_OPTIONS.map((hours) => (
              <MenuItem key={hours} value={hours}>
                {hours} hour{hours > 1 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} mb={3}>
          <Typography variant="subtitle1" color="text.primary">
            Estimated Cost: {totalCost} FCFA
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Rate: {rate} FCFA/hour • {isPremium ? 'Premium' : 'Standard'} device
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!selectedDeviceId || !userName || isSubmitting}
          startIcon={<AccessTime />}
          sx={{ borderRadius: '20px', py: 1.5 }}
        >
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </Button>
      </form>
    </Paper>
  );
};
