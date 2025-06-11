import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  TextField,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Add as AddIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';

// Mock user data - replace with actual API calls
const mockUserData = {
  id: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: 'Computer Science student passionate about web development and AI.',
  education: [
    {
      id: 'edu1',
      degree: 'B.Sc. Computer Science',
      institution: 'Tech University',
      year: '2021 - 2025',
      description: 'Specialization in Artificial Intelligence'
    }
  ],
  experience: [
    {
      id: 'exp1',
      position: 'Frontend Developer Intern',
      company: 'TechCorp',
      duration: 'Summer 2023',
      description: 'Worked on React applications and UI components.'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX']
};

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [userData, setUserData] = useState(mockUserData);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ ...mockUserData });

  useEffect(() => {
    // In a real app, fetch user data here
    // const fetchUserData = async () => {
    //   try {
    //     const response = await getUserProfile();
    //     setUserData(response.data);
    //     setFormData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching profile:', error);
    //   }
    // };
    // fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, save to API
    // try {
    //   await updateUserProfile(formData);
    //   setUserData(formData);
    //   setEditMode(false);
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    // }
    setUserData(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
  };

  const renderProfileHeader = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" gap={3}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            src={userData.avatar} 
            sx={{ width: 120, height: 120, border: '3px solid', borderColor: 'primary.main' }}
          />
          {editMode && (
            <IconButton 
              color="primary" 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.default' }
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>
        
        <Box flexGrow={1}>
          {editMode ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  size="small"
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  size="small"
                />
              </Box>
              <TextField
                name="bio"
                label="Bio"
                value={formData.bio}
                onChange={handleInputChange}
                multiline
                rows={3}
                fullWidth
              />
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {userData.bio}
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon color="action" fontSize="small" />
                  <Typography variant="body2">{userData.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon color="action" fontSize="small" />
                  <Typography variant="body2">{userData.phone}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationIcon color="action" fontSize="small" />
                  <Typography variant="body2">{userData.location}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        
        <Box>
          {editMode ? (
            <Box display="flex" gap={1}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );

  const renderEducation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Education</Typography>
      {userData.education.map((edu) => (
        <Paper key={edu.id} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{edu.degree}</Typography>
              <Typography variant="body2" color="text.secondary">{edu.institution}</Typography>
              <Typography variant="body2" color="text.secondary">{edu.year}</Typography>
              <Typography variant="body2" mt={1}>{edu.description}</Typography>
            </Box>
            {editMode && (
              <IconButton size="small" color="error">
                <CancelIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Paper>
      ))}
      {editMode && (
        <Button startIcon={<AddIcon />} color="primary">
          Add Education
        </Button>
      )}
    </Box>
  );

  const renderExperience = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Experience</Typography>
      {userData.experience.map((exp) => (
        <Paper key={exp.id} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{exp.position}</Typography>
              <Typography variant="body2" color="text.secondary">{exp.company}</Typography>
              <Typography variant="body2" color="text.secondary">{exp.duration}</Typography>
              <Typography variant="body2" mt={1}>{exp.description}</Typography>
            </Box>
            {editMode && (
              <IconButton size="small" color="error">
                <CancelIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Paper>
      ))}
      {editMode && (
        <Button startIcon={<AddIcon />} color="primary">
          Add Experience
        </Button>
      )}
    </Box>
  );

  const renderSkills = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Skills</Typography>
        {editMode && (
          <Button startIcon={<AddIcon />} size="small">
            Add Skill
          </Button>
        )}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {userData.skills.map((skill, index) => (
          <Chip 
            key={index} 
            label={skill} 
            onDelete={editMode ? () => {} : null}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 3 }}>
      {renderProfileHeader()}
      
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : false}
        allowScrollButtonsMobile
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" />
        <Tab label="Education" />
        <Tab label="Experience" />
        <Tab label="Skills" />
        <Tab label="Settings" />
      </Tabs>
      
      <Box>
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>About</Typography>
                <Typography variant="body1" paragraph>
                  {userData.bio || 'No bio available.'}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {renderSkills()}
              </Paper>
              
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <Typography variant="body2" color="text.secondary">
                  No recent activity to display.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon color="action" />
                    <Typography>{userData.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon color="action" />
                    <Typography>{userData.phone}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationIcon color="action" />
                    <Typography>{userData.location}</Typography>
                  </Box>
                </Box>
              </Paper>
              
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Education</Typography>
                {userData.education.length > 0 ? (
                  userData.education.slice(0, 2).map(edu => (
                    <Box key={edu.id} mb={2}>
                      <Typography variant="subtitle2">{edu.degree}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {edu.institution} • {edu.year}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No education information available.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
        
        {activeTab === 1 && renderEducation()}
        {activeTab === 2 && renderExperience()}
        {activeTab === 3 && renderSkills()}
        {activeTab === 4 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Account Settings</Typography>
            <Typography>Coming soon...</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
