import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Button, Divider, TextField } from '@mui/material';
import { Person as PersonIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    department: 'Computer Science',
    position: 'Lecturer',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Profile Picture */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 150, 
                height: 150, 
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              <PersonIcon sx={{ fontSize: '4rem' }} />
            </Avatar>
            {isEditing && (
              <Button 
                variant="outlined" 
                component="label"
                size="small"
                sx={{ mt: 1 }}
              >
                Change Photo
                <input type="file" hidden accept="image/*" />
              </Button>
            )}
          </Grid>
          
          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Department"
                  fullWidth
                  name="department"
                  value={profile.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Position"
                  fullWidth
                  name="position"
                  value={profile.position}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {isEditing ? (
                <>
                  <Button 
                    variant="outlined" 
                    onClick={() => setIsEditing(false)}
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
                </>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        
        {/* Additional Sections */}
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Account Settings</Typography>
          <Button variant="outlined" color="secondary">
            Change Password
          </Button>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box>
          <Typography variant="h6" gutterBottom>Preferences</Typography>
          <Button variant="outlined" color="secondary">
            Notification Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;