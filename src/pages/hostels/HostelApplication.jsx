import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const HostelApplication = ({ open, onClose, hostel, roomType }) => {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

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

  const validateForm = () => {
    const newErrors = {};
    
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to submit the application
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful submission
      setSubmitStatus({
        success: true,
        message: 'Application submitted successfully! We will contact you shortly.'
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        onClose();
        // Reset form and status after closing
        setTimeout(() => {
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
          setSubmitStatus({ success: false, message: '' });
        }, 500);
      }, 2000);
      
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={!isSubmitting ? onClose : null}
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
            {hostel ? `Apply for ${hostel.name}` : 'Hostel Application'}
          </Typography>
          {!isSubmitting && (
            <IconButton onClick={onClose} disabled={isSubmitting}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        {hostel && roomType && (
          <Typography variant="subtitle1" color="text.secondary">
            {roomType} Room - {roomType === 'Single' ? '350,000' : roomType === 'Double' ? '300,000' : '250,000'} FCFA/year
          </Typography>
        )}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {submitStatus.message && (
            <Alert severity={submitStatus.success ? 'success' : 'error'} sx={{ mb: 3 }}>
              {submitStatus.message}
            </Alert>
          )}
          
          {!submitStatus.success && (
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.faculty} disabled={isSubmitting}>
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
                <FormControl fullWidth error={!!errors.level} disabled={isSubmitting}>
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
                <FormControl fullWidth error={!!errors.gender} disabled={isSubmitting}>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors['emergencyContact.relationship']} disabled={isSubmitting}>
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
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" align="center">
                  By submitting this form, you agree to our terms and conditions. 
                  A non-refundable application fee of 10,000 FCFA will be required 
                  if your application is approved.
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        {!submitStatus.success && (
          <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
            <Button 
              onClick={onClose} 
              disabled={isSubmitting}
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default HostelApplication;
