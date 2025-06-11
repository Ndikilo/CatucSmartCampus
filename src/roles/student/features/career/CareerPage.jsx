import React, { useState, useEffect } from 'react';
import {
  getJobs,
  toggleSaveJob as toggleSaveJobApi,
  applyForJob as applyForJobApi,
  getResources as getResourcesApi,
  getEvents as getEventsApi,
  registerForEvent as registerForEventApi,
  getAdvisors as getAdvisorsApi,
  scheduleAppointment as scheduleAppointmentApi
} from '../../../../services/careerService';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActionArea,
  Button, Chip, Tabs, Tab, useMediaQuery, useTheme, Divider,
  Avatar, TextField, InputAdornment, IconButton, Badge, LinearProgress
} from '@mui/material';
import {
  Work as WorkIcon, Business as CompanyIcon, School as EducationIcon,
  Search as SearchIcon, FilterList as FilterIcon, Star as StarIcon,
  StarBorder as StarBorderIcon, Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon, CheckCircle as CheckCircleIcon,
  Event as EventIcon, Person as PersonIcon, Email as EmailIcon,
  Phone as PhoneIcon, LinkedIn as LinkedInIcon, GitHub as GitHubIcon
} from '@mui/icons-material';

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    posted: '2 days ago',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    requirements: ['3+ years of React', 'JavaScript/TypeScript', 'Redux'],
    saved: true,
    applied: false,
    deadline: '2023-12-15'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Contract',
    salary: '$50 - $70 per hour',
    posted: '1 week ago',
    description: 'Create beautiful and intuitive user experiences.',
    requirements: ['Portfolio required', '3+ years UX/UI', 'Figma/Sketch'],
    saved: false,
    applied: true,
    deadline: '2023-12-20'
  }
];

const mockResources = [
  {
    id: 'r1',
    title: 'Resume Writing Guide',
    type: 'guide',
    duration: '15 min read',
    description: 'Learn how to craft the perfect resume.'
  },
  {
    id: 'r2',
    title: 'Interview Preparation',
    type: 'video',
    duration: '25 min',
    description: 'Common interview questions and answers.'
  }
];

const mockEvents = [
  {
    id: 'e1',
    title: 'Tech Career Fair',
    date: '2023-11-15',
    time: '10:00 AM - 3:00 PM',
    location: 'Campus Center',
    type: 'career-fair',
    registered: true
  },
  {
    id: 'e2',
    title: 'Resume Workshop',
    date: '2023-11-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Library Room 203',
    type: 'workshop',
    registered: false
  }
];

const mockAdvisors = [
  {
    id: 'a1',
    name: 'Dr. Sarah Johnson',
    title: 'Career Counselor',
    department: 'Engineering & Technology',
    email: 's.johnson@university.edu',
    phone: '(555) 123-4567',
    availability: ['Mon 9am-12pm', 'Wed 1pm-4pm'],
    expertise: ['Resume Review', 'Interview Prep']
  }
];

const CareerPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState({
    jobs: false,
    events: false,
    resources: false,
    advisors: false
  });
  const [error, setError] = useState(null);
  
  // Fetch data when tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, [activeTab]: true }));
        setError(null);
        
        switch (activeTab) {
          case 'jobs':
            if (jobs.length === 0) {
              const jobsData = await getJobs();
              setJobs(jobsData);
            }
            break;
            
          case 'resources':
            if (resources.length === 0) {
              const resourcesData = await getResourcesApi();
              setResources(resourcesData);
            }
            break;
            
          case 'events':
            if (events.length === 0) {
              const eventsData = await getEventsApi();
              setEvents(eventsData);
            }
            break;
            
          case 'advisors':
            if (advisors.length === 0) {
              const advisorsData = await getAdvisorsApi();
              setAdvisors(advisorsData);
            }
            break;
            
          default:
            break;
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab}:`, err);
        setError(`Failed to load ${activeTab}. Please try again later.`);
      } finally {
        setLoading(prev => ({ ...prev, [activeTab]: false }));
      }
    };
    
    fetchData();
  }, [activeTab]);
  
  // Toggle save job
  const toggleSaveJob = async (jobId) => {
    try {
      // Optimistic update
      const updatedJobs = jobs.map(job => 
        job.id === jobId ? { ...job, saved: !job.saved } : job
      );
      setJobs(updatedJobs);
      
      // API call
      await toggleSaveJobApi(jobId);
    } catch (error) {
      console.error('Error toggling save job:', error);
      // Revert on error
      setJobs(jobs);
    }
  };
  
  // Handle job application
  const handleApply = async (jobId) => {
    try {
      // Optimistic update
      const updatedJobs = jobs.map(job => 
        job.id === jobId ? { ...job, applied: true } : job
      );
      setJobs(updatedJobs);
      
      // API call
      await applyForJobApi(jobId, {
        appliedAt: new Date().toISOString(),
        status: 'applied'
      });
    } catch (error) {
      console.error('Error applying for job:', error);
      // Revert on error
      setJobs(jobs);
    }
  };
  
  // Toggle event registration
  const toggleEventRegistration = async (eventId) => {
    try {
      // Optimistic update
      const updatedEvents = events.map(event => 
        event.id === eventId ? { ...event, registered: !event.registered } : event
      );
      setEvents(updatedEvents);
      
      // API call
      await registerForEventApi(eventId);
    } catch (error) {
      console.error('Error toggling event registration:', error);
      // Revert on error
      setEvents(events);
    }
  };
  
  // Schedule appointment with advisor
  const handleScheduleAppointment = async (advisorId, appointmentData) => {
    try {
      await scheduleAppointmentApi(advisorId, appointmentData);
      // Handle success (e.g., show success message)
      return true;
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      throw error; // Re-throw to handle in the component
    }
  };
  
  // Render job card
  const renderJobCard = (job) => (
    <Card key={job.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h6">{job.title}</Typography>
            <Typography color="text.secondary" gutterBottom>
              {job.company} • {job.location}
            </Typography>
            
            <Box display="flex" gap={1} flexWrap="wrap" mb={1.5}>
              <Chip label={job.type} size="small" variant="outlined" />
              <Chip label={job.salary} size="small" />
              <Chip 
                label={`Apply by ${new Date(job.deadline).toLocaleDateString()}`} 
                size="small" 
                color="secondary"
                variant="outlined"
              />
            </Box>
            
            <Typography variant="body2" paragraph>{job.description}</Typography>
            
            <Box display="flex" gap={1} flexWrap="wrap">
              {job.requirements.slice(0, 3).map((req, i) => (
                <Chip key={i} label={req} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
          
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <IconButton onClick={() => toggleSaveJob(job.id)}>
              {job.saved ? <BookmarkIcon color="warning" /> : <BookmarkBorderIcon />}
            </IconButton>
            
            {job.applied ? (
              <Chip 
                label="Applied" 
                color="success" 
                size="small" 
                icon={<CheckCircleIcon />}
              />
            ) : (
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => handleApply(job.id)}
                sx={{ mt: 1 }}
              >
                Apply Now
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  
  // Render resource card
  const renderResourceCard = (resource) => (
    <Card key={resource.id} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {resource.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {resource.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {resource.duration}
        </Typography>
      </CardContent>
    </Card>
  );
  
  // Render event card
  const renderEventCard = (event) => (
    <Card key={event.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {new Date(event.date).toLocaleDateString()} • {event.time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
          </Box>
          
          <Button 
            variant={event.registered ? "outlined" : "contained"} 
            size="small"
            color={event.registered ? "success" : "primary"}
            startIcon={event.registered ? <CheckIcon /> : <EventIcon />}
            onClick={() => toggleEventRegistration(event.id)}
          >
            {event.registered ? 'Registered' : 'Register'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
  
  // Render advisor card
  const renderAdvisorCard = (advisor) => (
    <Card key={advisor.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex">
          <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
            <PersonIcon />
          </Avatar>
          
          <Box flexGrow={1}>
            <Typography variant="h6">{advisor.name}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {advisor.title} • {advisor.department}
            </Typography>
            
            <Typography variant="body2" paragraph>
              <strong>Expertise:</strong> {advisor.expertise.join(', ')}
            </Typography>
            
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<EmailIcon />}
              >
                Email
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<PhoneIcon />}
              >
                Call
              </Button>
              <Button 
                variant="contained" 
                size="small"
                sx={{ ml: 'auto' }}
              >
                Schedule
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore job opportunities and career resources
        </Typography>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          <Tab label="Jobs" value="jobs" icon={<WorkIcon />} iconPosition="start" />
          <Tab label="Resources" value="resources" icon={<SchoolIcon />} iconPosition="start" />
          <Tab label="Events" value="events" icon={<EventIcon />} iconPosition="start" />
          <Tab label="Advisors" value="advisors" icon={<PersonIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* Search */}
      {activeTab === 'jobs' && (
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      
      {/* Content */}
      <Box>
        {error && (
          <Box mb={3}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: 'error.light' }}>
              <Typography color="error.dark">{error}</Typography>
            </Paper>
          </Box>
        )}
        
        {loading[activeTab] ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {activeTab === 'jobs' && (
              <Box>
                {jobs && jobs.length > 0 ? (
                  jobs.filter(job => 
                    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()))
                  ).map(job => renderJobCard(job))
                ) : (
                  <Typography>No jobs found</Typography>
                )}
              </Box>
            )}
            
            {activeTab === 'resources' && (
              <Grid container spacing={3}>
                {resources && resources.length > 0 ? (
                  resources.map(resource => (
                    <Grid item xs={12} sm={6} md={4} key={resource.id}>
                      {renderResourceCard(resource)}
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>No resources available</Typography>
                  </Grid>
                )}
              </Grid>
            )}
            
            {activeTab === 'events' && (
              <Box>
                {events && events.length > 0 ? (
                  events.map(event => renderEventCard(event))
                ) : (
                  <Typography>No upcoming events</Typography>
                )}
              </Box>
            )}
            
            {activeTab === 'advisors' && (
              <Box>
                {advisors && advisors.length > 0 ? (
                  advisors.map(advisor => renderAdvisorCard(advisor))
                ) : (
                  <Typography>No advisors available</Typography>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CareerPage;
