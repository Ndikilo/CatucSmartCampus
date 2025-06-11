import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, CardActionArea, 
  Tabs, Tab, Button, Chip, Avatar, useMediaQuery, useTheme, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Slider, FormControl,
  InputLabel, Select, MenuItem, LinearProgress, IconButton, Divider
} from '@mui/material';
import { 
  SelfImprovement as MeditationIcon, EmojiEmotions as MoodIcon,
  FitnessCenter as FitnessIcon, Nightlight as SleepIcon, Add as AddIcon,
  CheckCircle as CheckCircleIcon, Bookmark as BookmarkIcon, 
  BookmarkBorder as BookmarkBorderIcon, ChevronRight as ChevronRightIcon,
  LocalHospital as HospitalIcon, Spa as SpaIcon, Phone as PhoneIcon,
  Chat as ChatIcon, School as SchoolIcon, SupportAgent as SupportAgentIcon,
  Diversity3 as Diversity3Icon, AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data
const mockMoodData = {
  currentMood: 4,
  moodHistory: [
    { date: 'Mon', mood: 4 }, { date: 'Tue', mood: 3 }, { date: 'Wed', mood: 5 },
    { date: 'Thu', mood: 4 }, { date: 'Fri', mood: 2 }, { date: 'Sat', mood: 4 },
    { date: 'Sun', mood: 3 },
  ],
  averageMood: 3.57,
  moodTrend: 'up',
  moodNotes: 'Feeling more focused this week after starting morning meditation.',
};

const mockResources = [
  {
    id: 1,
    title: 'Mindfulness Meditation',
    type: 'meditation',
    duration: '10 min',
    saved: true,
    completed: true,
    description: 'Guided meditation for stress relief',
  },
  {
    id: 2,
    title: 'Stress Management',
    type: 'article',
    duration: '5 min read',
    saved: false,
    completed: false,
    description: 'Effective strategies for exam stress',
  },
  {
    id: 3,
    title: 'Sleep Hygiene',
    type: 'article',
    duration: '7 min read',
    saved: true,
    completed: false,
    description: 'Tips for better sleep quality',
  },
];

const mockChallenges = [
  {
    id: 1,
    title: '7-Day Mindfulness',
    description: 'Daily mindfulness exercises',
    progress: 3,
    total: 7,
    active: true,
  },
  {
    id: 2,
    title: 'Hydration Tracker',
    description: '8 glasses of water daily',
    progress: 5,
    total: 7,
    active: true,
  },
];

const moodIcons = [
  { icon: '😢', label: 'Very Sad' },
  { icon: '😞', label: 'Sad' },
  { icon: '😐', label: 'Neutral' },
  { icon: '😊', label: 'Happy' },
  { icon: '😄', label: 'Very Happy' },
];

const WellbeingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState('overview');
  const [moodRating, setMoodRating] = useState(3);
  const [openMoodModal, setOpenMoodModal] = useState(false);
  const [resourceFilter, setResourceFilter] = useState('all');
  const [resources, setResources] = useState(mockResources);
  const [challenges, setChallenges] = useState(mockChallenges);
  
  const toggleSaveResource = (id) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, saved: !r.saved } : r
    ));
  };
  
  const toggleCompleteResource = (id) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };
  
  const updateChallengeProgress = (id, increment = true) => {
    setChallenges(challenges.map(c => {
      if (c.id === id) {
        const newProgress = increment 
          ? Math.min(c.progress + 1, c.total)
          : Math.max(0, c.progress - 1);
        return { ...c, progress: newProgress };
      }
      return c;
    }));
  };
  
  const filteredResources = resourceFilter === 'all' 
    ? resources 
    : resources.filter(r => r.type === resourceFilter);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Wellbeing Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your wellness and find resources to support your mental health
        </Typography>
      </Box>
      
      <Tabs 
        value={activeTab} 
        onChange={(e, v) => setActiveTab(v)}
        variant={isMobile ? 'scrollable' : 'standard'}
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Resources" value="resources" />
        <Tab label="Challenges" value="challenges" />
        <Tab label="Emergency" value="emergency" />
      </Tabs>
      
      {activeTab === 'overview' && (
        <Box>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Mood Tracker</Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddIcon />}
                    onClick={() => setOpenMoodModal(true)}
                  >
                    Log Mood
                  </Button>
                </Box>
                <Box display="flex" justifyContent="space-around" py={2}>
                  {mockMoodData.moodHistory.map((day, i) => (
                    <Box key={i} textAlign="center">
                      <Box 
                        sx={{
                          width: 40,
                          height: `${day.mood * 20}px`,
                          bgcolor: 'primary.main',
                          mx: 'auto',
                          mb: 1,
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                      <Typography variant="caption">{day.date}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    component={motion.div}
                    whileHover={{ y: -4 }}
                    sx={{ height: '100%' }}
                  >
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', mb: 2, mx: 'auto' }}>
                          <MeditationIcon />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>Meditation</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Take a moment to relax
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    component={motion.div}
                    whileHover={{ y: -4 }}
                    sx={{ height: '100%' }}
                  >
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar sx={{ bgcolor: 'success.light', mb: 2, mx: 'auto' }}>
                          <FitnessIcon />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>Quick Workout</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Boost your energy
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card 
                    component={motion.div}
                    whileHover={{ y: -4 }}
                    sx={{ height: '100%' }}
                  >
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar sx={{ bgcolor: 'warning.light', mb: 2, mx: 'auto' }}>
                          <SleepIcon />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>Sleep Sounds</Typography>
                        <Typography variant="body2" color="text.secondary">
                          For better sleep
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Weekly Summary</Typography>
                <Box mb={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Mood Average
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="h4" mr={1}>
                      {mockMoodData.averageMood.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      / 5.0
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(mockMoodData.averageMood / 5) * 100} 
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Active Challenges
                </Typography>
                {challenges.filter(c => c.active).map(challenge => (
                  <Box key={challenge.id} mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2">{challenge.title}</Typography>
                      <Typography variant="body2">
                        {challenge.progress}/{challenge.total}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(challenge.progress / challenge.total) * 100} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => setActiveTab('challenges')}
                >
                  View All Challenges
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {activeTab === 'resources' && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Wellness Resources</Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                label="Filter by Type"
              >
                <MenuItem value="all">All Resources</MenuItem>
                <MenuItem value="meditation">Meditation</MenuItem>
                <MenuItem value="article">Articles</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Grid container spacing={3}>
            {filteredResources.map((resource) => (
              <Grid item xs={12} sm={6} lg={4} key={resource.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Chip 
                        label={resource.type} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                      <Box>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleSaveResource(resource.id)}
                          color={resource.saved ? 'primary' : 'default'}
                        >
                          {resource.saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleCompleteResource(resource.id)}
                          color={resource.completed ? 'success' : 'default'}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                      {resource.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {resource.description}
                    </Typography>
                    
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {resource.duration}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      {activeTab === 'challenges' && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Wellness Challenges</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              New Challenge
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {challenges.map((challenge) => (
              <Grid item xs={12} md={6} key={challenge.id}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {challenge.title}
                    </Typography>
                    {challenge.active && (
                      <Chip label="Active" color="primary" size="small" />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {challenge.description}
                  </Typography>
                  
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="caption" fontWeight={500}>
                        {challenge.progress}/{challenge.total}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(challenge.progress / challenge.total) * 100} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between">
                    <Button 
                      size="small" 
                      variant="outlined"
                    >
                      Details
                    </Button>
                    <Box>
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ mr: 1 }}
                        onClick={() => updateChallengeProgress(challenge.id, true)}
                        disabled={challenge.progress >= challenge.total}
                      >
                        +1
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => updateChallengeProgress(challenge.id, false)}
                        disabled={challenge.progress <= 0}
                      >
                        -1
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      {activeTab === 'emergency' && (
        <Box>
          <Typography variant="h6" gutterBottom>Emergency Resources</Typography>
          <Typography variant="body1" paragraph>
            If you're in immediate danger or experiencing a mental health crisis, please contact emergency services or use one of the resources below:
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderLeft: '4px solid #f44336' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <HospitalIcon color="error" sx={{ fontSize: 32, mr: 2 }} />
                  <Typography variant="h6">Emergency Services</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Call <strong>911</strong> or go to your nearest emergency room if you're in immediate danger.
                </Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth
                  component="a"
                  href="tel:911"
                  startIcon={<HospitalIcon />}
                >
                  Call 911
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderLeft: '4px solid #2196F3' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <SpaIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
                  <Typography variant="h6">Crisis Text Line</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Text <strong>HOME</strong> to <strong>741741</strong> for free, 24/7 crisis support.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  component="a"
                  href="sms:741741&body=HOME"
                  startIcon={<ChatIcon />}
                >
                  Text HOME to 741741
                </Button>
              </Paper>
            </Grid>
          </Grid>
          
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Additional Resources</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderLeft: '4px solid #4CAF50' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <SupportAgentIcon color="success" sx={{ fontSize: 32, mr: 2 }} />
                    <Typography variant="h6">Suicide Prevention</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Call <strong>1-800-273-8255</strong> for free and confidential support, 24/7.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="success" 
                    fullWidth
                    component="a"
                    href="tel:18002738255"
                    startIcon={<PhoneIcon />}
                  >
                    Call 1-800-273-8255
                  </Button>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderLeft: '4px solid #9C27B0' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Diversity3Icon color="secondary" sx={{ fontSize: 32, mr: 2 }} />
                    <Typography variant="h6">Campus Counseling</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Contact your campus counseling center for mental health support.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                    component="a"
                    href="/support/counseling"
                    startIcon={<SchoolIcon />}
                  >
                    Visit Counseling Services
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      
      {/* Mood Logging Modal */}
      <Dialog open={openMoodModal} onClose={() => setOpenMoodModal(false)}>
        <DialogTitle>How are you feeling today?</DialogTitle>
        <DialogContent>
          <Box textAlign="center" py={2}>
            <Typography variant="h2" mb={2}>
              {moodIcons[moodRating - 1]?.icon}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {moodIcons[moodRating - 1]?.label}
            </Typography>
            <Slider
              value={moodRating}
              onChange={(e, v) => setMoodRating(v)}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}
            />
            <TextField
              fullWidth
              label="Add a note (optional)"
              multiline
              rows={3}
              margin="normal"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMoodModal(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setOpenMoodModal(false);
              // In a real app, save the mood data here
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WellbeingPage;
