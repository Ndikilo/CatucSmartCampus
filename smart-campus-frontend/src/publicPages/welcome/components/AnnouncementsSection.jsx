import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Divider, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Notifications as NotificationsIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Section = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(10, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: theme.palette.primary.main,
    margin: `${theme.spacing(2)} auto 0`,
    borderRadius: '2px',
  },
}));

const AnnouncementCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const AnnouncementDate = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  padding: theme.spacing(0.5, 2),
  borderRadius: '4px',
  marginBottom: theme.spacing(2),
  fontSize: '0.8rem',
  fontWeight: 500,
}));

const announcements = [
  {
    title: 'Campus Reopening Guidelines',
    date: 'June 15, 2024',
    excerpt: 'Important updates about the new semester and safety protocols for all students and staff members.',
    category: 'Announcement'
  },
  {
    title: 'Library Extended Hours',
    date: 'June 10, 2024',
    excerpt: '24/7 access available during the examination period for all registered students.',
    category: 'Library'
  },
  {
    title: 'New Cyber Café Location',
    date: 'June 5, 2024',
    excerpt: 'Check out our new and improved cyber café in the Student Center with high-speed internet and modern workstations.',
    category: 'Facilities'
  },
];

const AnnouncementsSection = () => {
  const theme = useTheme();

  return (
    <Section id="announcements">
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Latest Announcements
        </SectionTitle>
        
        <Grid container spacing={4}>
          {announcements.map((announcement, index) => (
            <Grid item xs={12} md={4} key={index}>
              <AnnouncementCard>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="overline" color="text.secondary">
                      {announcement.category}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {announcement.title}
                  </Typography>
                  <AnnouncementDate variant="caption">
                    {announcement.date}
                  </AnnouncementDate>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {announcement.excerpt}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ fontWeight: 500 }}
                  >
                    Read More
                  </Button>
                </Box>
              </AnnouncementCard>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="outlined" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            View All Announcements
          </Button>
        </Box>
      </Container>
    </Section>
  );
};

export default AnnouncementsSection;
