import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid as MuiGrid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SelectChangeEvent,
  GridProps
} from '@mui/material';

// Create a properly typed Grid component
const Grid = (props: GridProps) => <MuiGrid {...props} />;
import { Close as CloseIcon, Home as HomeIcon } from '@mui/icons-material';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  faculty: string;
  level: string;
  gender: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  specialNeeds: string;
};

interface HostelApplicationProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  hostel: any;
  roomType: string;
  loading: boolean;
}

const HostelApplication: React.FC<HostelApplicationProps> = ({
  open,
  onClose,
  onSubmit,
  hostel,
  roomType,
  loading
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    faculty: '',
    level: '',
    gender: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    specialNeeds: ''
  });
  
  // Type assertion for Grid component props
  const gridItemProps: GridProps = { item: true, xs: 12, md: 6 };
  const gridFullWidthProps: GridProps = { item: true, xs: 12 };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const faculties = [
    'Engineering and Technology',
    'Science',
    'Arts',
    'Social Sciences',
    'Business and Economics',
    'Health Sciences',
    'Education'
  ];

  const levels = ['100', '200', '300', '400', '500', 'Postgraduate'];
  const relationships = ['Parent', 'Guardian', 'Sibling', 'Spouse', 'Other'];

  useEffect(() => {
    // Reset form when opening/closing
    if (!open) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        studentId: '',
        faculty: '',
        level: '',
        gender: '',
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        },
        specialNeeds: ''
      });
      setErrors({});
      setSubmitError('');
    }
  }, [open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.faculty) newErrors.faculty = 'Faculty is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.emergencyContact.name.trim()) newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    if (!formData.emergencyContact.phone.trim()) newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
    if (!formData.emergencyContact.relationship) newErrors['emergencyContact.relationship'] = 'Relationship is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement | { name: string; value: string };
    
    if (!name) return;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof newErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit({
        ...formData,
        hostelId: hostel?.id,
        hostelName: hostel?.name,
        roomType,
        applicationDate: new Date().toISOString()
      });
    } catch (error) {
      setSubmitError('Failed to submit application. Please try again.');
    }
  };

  if (!hostel) return null;

  const room = hostel.rooms.find((r: any) => r.type === roomType) || hostel.rooms[0];
  const price = room ? room.price.toLocaleString() : 'N/A';

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Apply for {hostel.name}
          </Typography>
          {!loading && (
            <IconButton onClick={onClose} disabled={loading}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          {roomType} Room - {price} FCFA/year
        </Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || 'University email preferred'}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                error={!!errors.studentId}
                helperText={errors.studentId}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.faculty} disabled={loading}>
                <InputLabel>Faculty</InputLabel>
                <Select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  label="Faculty"
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty} value={faculty}>{faculty}</MenuItem>
                  ))}
                </Select>
                {errors.faculty && <FormHelperText>{errors.faculty}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.level} disabled={loading}>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Level"
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>Level {level}</MenuItem>
                  ))}
                </Select>
                {errors.level && <FormHelperText>{errors.level}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.gender} disabled={loading}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                </Select>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom mt={2}>Emergency Contact</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Full Name"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                error={!!errors['emergencyContact.name']}
                helperText={errors['emergencyContact.name']}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                error={!!errors['emergencyContact.phone']}
                helperText={errors['emergencyContact.phone']}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={!!errors['emergencyContact.relationship']} disabled={loading}>
                <InputLabel>Relationship</InputLabel>
                <Select
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  label="Relationship"
                >
                  {relationships.map((rel) => (
                    <MenuItem key={rel} value={rel}>{rel}</MenuItem>
                  ))}
                </Select>
                {errors['emergencyContact.relationship'] && (
                  <FormHelperText>{errors['emergencyContact.relationship']}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Special Needs/Requests"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                helperText="Please mention any special requirements or preferences"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Application Summary
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText 
                      primary={hostel.name} 
                      secondary={`${roomType} Room`} 
                    />
                    <Typography variant="body2">
                      {price} FCFA/year
                    </Typography>
                  </ListItem>
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                  By submitting this form, you agree to our terms and conditions. 
                  A non-refundable application fee of 10,000 FCFA will be required 
                  if your application is approved.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button 
            onClick={onClose} 
            disabled={loading}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default HostelApplication;
