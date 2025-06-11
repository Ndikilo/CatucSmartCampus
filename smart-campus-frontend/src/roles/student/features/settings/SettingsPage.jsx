import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Save as SaveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';

// Mock user data - replace with actual data from your auth context or API
const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  phone: '+1 (555) 123-4567',
  avatar: 'https://i.pravatar.cc/150?img=1',
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  preferences: {
    theme: 'system',
    language: 'en',
    timezone: 'UTC+01:00',
  },
};

const SettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...mockUserData });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Initialize form data when user data changes
  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle nested objects for notifications
      if (name.startsWith('notifications.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [field]: checked
          }
        }));
      }
    } else {
      // Handle regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // In a real app, save to API
    // try {
    //   await updateUserSettings(formData);
    //   setUserData(formData);
    //   setIsEditing(false);
    // } catch (error) {
    //   console.error('Error updating settings:', error);
    // }
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderAccountSettings = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Account Information</Typography>
        {!isEditing ? (
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <Box display="flex" gap={1}>
            <Button 
              variant="outlined" 
              color="error"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Avatar 
              src={userData.avatar} 
              sx={{ 
                width: 120, 
                height: 120, 
                border: '3px solid', 
                borderColor: 'primary.main' 
              }}
            />
            {isEditing && (
              <IconButton
                color="primary"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.default' }
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          {isEditing && (
            <Button variant="outlined" size="small">
              Change Photo
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                margin="normal"
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                margin="normal"
                InputProps={{
                  startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderPasswordSettings = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Password & Security</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Change your password or enable two-factor authentication for added security.
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            InputProps={{
              startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />,
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ mt: 2 }}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <FormGroup>
        <FormControlLabel 
          control={
            <Switch 
              checked={formData.twoFactorEnabled || false}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                twoFactorEnabled: e.target.checked
              }))}
            />
          } 
          label="Enable Two-Factor Authentication"
        />
      </FormGroup>
    </Paper>
  );

  const renderNotificationSettings = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose how you receive notifications.
      </Typography>
      
      <FormGroup>
        <FormControlLabel 
          control={
            <Switch 
              name="notifications.email"
              checked={formData.notifications?.email || false}
              onChange={handleInputChange}
            />
          } 
          label="Email Notifications"
        />
        <FormControlLabel 
          control={
            <Switch 
              name="notifications.sms"
              checked={formData.notifications?.sms || false}
              onChange={handleInputChange}
            />
          } 
          label="SMS Notifications"
        />
        <FormControlLabel 
          control={
            <Switch 
              name="notifications.push"
              checked={formData.notifications?.push || false}
              onChange={handleInputChange}
            />
          } 
          label="Push Notifications"
        />
      </FormGroup>
    </Paper>
  );

  const renderPreferences = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Preferences</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Theme</InputLabel>
            <Select
              value={formData.preferences?.theme || 'system'}
              label="Theme"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  theme: e.target.value
                }
              }))}
              startAdornment={
                theme.palette.mode === 'dark' ? 
                  <DarkModeIcon sx={{ mr: 1 }} /> : 
                  <LightModeIcon sx={{ mr: 1 }} />
              }
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="system">System Default</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Language</InputLabel>
            <Select
              value={formData.preferences?.language || 'en'}
              label="Language"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  language: e.target.value
                }
              }))}
              startAdornment={
                <LanguageIcon sx={{ mr: 1, color: 'action.active' }} />
              }
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="de">Deutsch</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Time Zone</InputLabel>
            <Select
              value={formData.preferences?.timezone || 'UTC+01:00'}
              label="Time Zone"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  timezone: e.target.value
                }
              }))}
            >
              <MenuItem value="UTC-12:00">(UTC-12:00) International Date Line West</MenuItem>
              <MenuItem value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</MenuItem>
              <MenuItem value="UTC">(UTC) Greenwich Mean Time (Dublin, London)</MenuItem>
              <MenuItem value="UTC+01:00">(UTC+01:00) Brussels, Copenhagen, Madrid, Paris</MenuItem>
              <MenuItem value="UTC+05:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</MenuItem>
              <MenuItem value="UTC+09:00">(UTC+09:00) Osaka, Sapporo, Tokyo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Preferences
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
        >
          <Tab value="account" label="Account" />
          <Tab value="password" label="Password & Security" />
          <Tab value="notifications" label="Notifications" />
          <Tab value="preferences" label="Preferences" />
        </Tabs>
      </Box>
      
      {activeTab === 'account' && renderAccountSettings()}
      {activeTab === 'password' && renderPasswordSettings()}
      {activeTab === 'notifications' && renderNotificationSettings()}
      {activeTab === 'preferences' && renderPreferences()}
      
      <Divider sx={{ my: 4 }} />
      
      <Box>
        <Typography variant="h6" gutterBottom>Danger Zone</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          These actions are irreversible. Please proceed with caution.
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => console.log('Deactivate account')}
          >
            Deactivate Account
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => console.log('Delete account')}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
