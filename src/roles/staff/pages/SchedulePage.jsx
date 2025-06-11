// src/roles/staff/pages/SchedulePage.jsx
import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { 
  Today as TodayIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Class as ClassIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import Layout from '../../../common/components/Layout';

// Sample schedule data
const weeklySchedule = [
  {
    day: 'Monday',
    date: new Date(2023, 5, 5),
    classes: [
      { time: '09:00 - 10:30', subject: 'Mathematics 101', type: 'Lecture', location: 'Room 101', status: 'ongoing' },
      { time: '11:00 - 12:30', subject: 'Physics 201', type: 'Lab', location: 'Lab A', status: 'upcoming' },
      { time: '14:00 - 15:30', subject: 'Office Hours', type: 'Meeting', location: 'Office 42', status: 'upcoming' },
    ]
  },
  {
    day: 'Tuesday',
    date: new Date(2023, 5, 6),
    classes: [
      { time: '10:00 - 11:30', subject: 'Computer Science 301', type: 'Lecture', location: 'Room 205', status: 'upcoming' },
      { time: '13:00 - 14:30', subject: 'Department Meeting', type: 'Meeting', location: 'Conference Room', status: 'upcoming' },
    ]
  },
  // Add more days as needed
];

const ScheduleCard = ({ day, date, classes }) => {
  const theme = useTheme();
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing': return 'primary.main';
      case 'upcoming': return 'success.main';
      case 'completed': return 'text.secondary';
      default: return 'text.primary';
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <TodayIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            {day}, {format(date, 'MMMM d, yyyy')}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {classes.length > 0 ? (
          classes.map((cls, index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 2, 
                p: 2, 
                borderRadius: 1,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer',
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cls.subject}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5} mb={1}>
                    <TimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {cls.time}
                    </Typography>
                    <LocationIcon fontSize="small" color="action" sx={{ ml: 1.5, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {cls.location}
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={cls.status} 
                  size="small" 
                  sx={{ 
                    backgroundColor: `${getStatusColor(cls.status)}20`,
                    color: getStatusColor(cls.status),
                    textTransform: 'capitalize',
                    fontWeight: 'medium'
                  }} 
                />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <ClassIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {cls.type}
                </Typography>
              </Box>
              {index < classes.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={3}>
            <Typography variant="body1" color="text.secondary">
              No classes scheduled for {day}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const SchedulePage = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Class Schedule</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View and manage your weekly class schedule
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {weeklySchedule.map((daySchedule, index) => (
              <ScheduleCard 
                key={index} 
                day={daySchedule.day} 
                date={daySchedule.date} 
                classes={daySchedule.classes} 
              />
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Chip 
                  icon={<TodayIcon />} 
                  label="View Monthly Calendar" 
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ justifyContent: 'flex-start', p: 1.5 }}
                  clickable
                />
                <Chip 
                  icon={<ClassIcon />} 
                  label="Add New Class" 
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ justifyContent: 'flex-start', p: 1.5 }}
                  clickable
                />
                <Chip 
                  icon={<LocationIcon />} 
                  label="Manage Locations" 
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ justifyContent: 'flex-start', p: 1.5 }}
                  clickable
                />
              </Box>
              
              <Box mt={4}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Upcoming Events
                </Typography>
                <Box>
                  <Typography variant="body2" color="primary" fontWeight="medium">
                    Department Meeting
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tomorrow, 10:00 AM - 11:30 AM
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SchedulePage;
