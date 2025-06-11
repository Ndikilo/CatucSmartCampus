import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const examSchedule = [
  { id: 1, subject: 'Mathematics', date: '2025-06-10', time: '9:00 AM - 12:00 PM' },
  { id: 2, subject: 'English Literature', date: '2025-06-12', time: '9:00 AM - 11:00 AM' },
  { id: 3, subject: 'Computer Science', date: '2025-06-15', time: '10:00 AM - 1:00 PM' },
];

const Examinations = () => {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 6, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#fffde7', borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <EventIcon color="warning" sx={{ fontSize: 36, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="warning.dark">
            Examination Schedule
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Stay updated with upcoming exams and schedules.
        </Typography>

        <List>
          {examSchedule.map((exam, index) => (
            <React.Fragment key={exam.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" variant="body1">
                      {exam.subject}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Date: {exam.date} <br />
                      Time: {exam.time}
                    </Typography>
                  }
                />
              </ListItem>
              {index < examSchedule.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Examinations;
