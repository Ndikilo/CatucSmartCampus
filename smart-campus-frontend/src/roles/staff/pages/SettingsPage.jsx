import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Divider,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Badge,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsletter: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC+01:00',
    twoFactorAuth: false,
    showOnlineStatus: true,
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const connectedAccounts = [
    { id: 1, name: 'Google', email: 'john.doe@gmail.com', connected: true },
    { id: 2, name: 'Microsoft', email: 'john.doe@outlook.com', connected: true },
    { id: 3, name: 'GitHub', email: null, connected: false },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
  };

  const handleSelectChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.value,
    });
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Handle password change
    console.log('Changing password...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Security" {...a11yProps(1)} />
          <Tab label="Notifications" {...a11yProps(2)} />
          <Tab label="Connected Accounts" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <Paper elevation={3}>
        {/* General Settings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={settings.language}
                  label="Language"
                  onChange={handleSelectChange('language')}
                  startAdornment={
                    <LanguageIcon color="action" sx={{ mr: 1 }} />
                  }
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="timezone-label">Time Zone</InputLabel>
                <Select
                  labelId="timezone-label"
                  value={settings.timezone}
                  label="Time Zone"
                  onChange={handleSelectChange('timezone')}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="UTC+01:00">UTC+01:00 (London, Dublin)</MenuItem>
                  <MenuItem value="UTC+02:00">UTC+02:00 (Paris, Berlin)</MenuItem>
                  <MenuItem value="UTC-05:00">UTC-05:00 (New York)</MenuItem>
                  <MenuItem value="UTC-08:00">UTC-08:00 (Los Angeles)</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.darkMode} 
                    onChange={handleSettingChange('darkMode')} 
                  />
                }
                label="Dark Mode"
                sx={{ mt: 2, display: 'block' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Display Preferences</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.showOnlineStatus} 
                    onChange={handleSettingChange('showOnlineStatus')} 
                  />
                }
                label="Show online status"
                sx={{ display: 'block', mb: 1 }}
              />
              <Typography variant="body2" color="textSecondary" paragraph>
                When enabled, other users will be able to see when you're online.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Change Password</Typography>
              <form onSubmit={handleChangePassword}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Current Password"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  InputProps={{
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
                <TextField
                  fullWidth
                  margin="normal"
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  startIcon={<LockIcon />}
                  sx={{ mt: 2 }}
                >
                  Update Password
                </Button>
              </form>

              <Divider sx={{ my: 4 }} />
              
              <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon color="action" sx={{ mr: 1 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>Status: 
                    {settings.twoFactorAuth ? (
                      <Chip label="Enabled" color="success" size="small" sx={{ ml: 1 }} />
                    ) : (
                      <Chip label="Disabled" variant="outlined" size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                >
                  {settings.twoFactorAuth ? 'Disable' : 'Enable'} 2FA
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Two-factor authentication adds an extra layer of security to your account.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Active Sessions</Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <LockIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Current Session</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Chrome on Windows 10
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last active: Just now
                    </Typography>
                  </Box>
                  <Chip label="This device" size="small" color="primary" />
                </Box>
              </Paper>
              
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Other active sessions
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'grey.400', mr: 2 }}>
                    <LockIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Mobile App</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last active: 2 hours ago
                    </Typography>
                  </Box>
                  <Button size="small" color="error">Sign out</Button>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'grey.400', mr: 2 }}>
                    <LockIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Safari on Mac</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last active: 1 day ago
                    </Typography>
                  </Box>
                  <Button size="small" color="error">Sign out</Button>
                </Box>
              </Paper>
              
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />}
                fullWidth
                sx={{ mt: 1 }}
              >
                Sign out from all other devices
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Email Notifications</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.emailNotifications} 
                    onChange={handleSettingChange('emailNotifications')} 
                  />
                }
                label="Email notifications"
                sx={{ display: 'block', mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.newsletter} 
                    onChange={handleSettingChange('newsletter')} 
                  />
                }
                label="Newsletter"
                sx={{ display: 'block', mb: 2 }}
              />
              <Typography variant="body2" color="textSecondary" paragraph>
                Receive updates, tips, and offers via email.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Push Notifications</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.pushNotifications} 
                    onChange={handleSettingChange('pushNotifications')} 
                  />
                }
                label="Push notifications"
                sx={{ display: 'block', mb: 2 }}
              />
              <Typography variant="body2" color="textSecondary" paragraph>
                Receive push notifications on your device.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Connected Accounts Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="body1" paragraph>
            Manage connected accounts and services.
          </Typography>
          
          <List>
            {connectedAccounts.map((account) => (
              <React.Fragment key={account.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: account.connected ? 'primary.main' : 'grey.400' }}>
                      {account.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={account.name} 
                    secondary={account.email || 'Not connected'} 
                  />
                  <ListItemSecondaryAction>
                    {account.connected ? (
                      <Button 
                        variant="outlined" 
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                        startIcon={<AddIcon />}
                      >
                        Connect
                      </Button>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Add another account
          </Button>
        </TabPanel>
      </Paper>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          size="large"
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;