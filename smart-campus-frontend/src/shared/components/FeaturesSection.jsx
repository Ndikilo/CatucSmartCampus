import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Book as BookIcon, 
  Computer as ComputerIcon, 
  Map as MapIcon, 
  Event as EventIcon, 
  School as SchoolIcon, 
  Lock as LockIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon 
} from '@mui/icons-material';

const Section = styled('section')(({ theme }) => ({
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

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: '32px',
  },
}));

const features = [
  {
    icon: <SchoolIcon />,
    title: 'Academic Management',
    description: 'Streamline courses, attendance, and academic progress in one platform.',
    actionText: 'Learn More',
    path: '/academics',
    color: 'primary'
  },
  {
    icon: <LockIcon />,
    title: 'Secure Access',
    description: 'Advanced authentication and role-based access control for security.',
    actionText: 'Security',
    path: '/security',
    color: 'secondary'
  },
  {
    icon: <BookIcon />,
    title: 'Digital Library',
    description: 'Access books, journals, and research papers anytime.',
    actionText: 'Browse',
    path: '/library',
    color: 'success'
  },
  {
    icon: <ComputerIcon />,
    title: 'Cyber Café',
    description: 'Book computer stations and access high-speed internet.',
    actionText: 'View Stations',
    path: '/cyber-cafe',
    color: 'info'
  },
  {
    icon: <MapIcon />,
    title: 'Campus Navigation',
    description: 'Interactive maps for easy campus wayfinding.',
    actionText: 'Explore',
    path: '/map',
    color: 'warning'
  },
  {
    icon: <EventIcon />,
    title: 'Events & Activities',
    description: 'Stay updated with campus events and workshops.',
    actionText: 'View Events',
    path: '/events',
    color: 'error'
  },
  {
    icon: <AssessmentIcon />,
    title: 'Performance Analytics',
    description: 'Track and improve academic performance.',
    actionText: 'Analytics',
    path: '/analytics',
    color: 'primary'
  },
  {
    icon: <NotificationsIcon />,
    title: 'Smart Notifications',
    description: 'Real-time alerts and announcements.',
    actionText: 'Alerts',
    path: '/notifications',
    color: 'secondary'
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Section id="features">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section title removed as per request */}
          
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index} display="grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: isMobile ? "-50px" : undefined }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <FeatureCard>
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <FeatureIcon sx={{ 
                        backgroundColor: `${feature.color}.light`,
                        color: `${feature.color}.main`,
                        '&:hover': {
                          backgroundColor: `${feature.color}.main`,
                          color: `${feature.color}.contrastText`,
                        }
                      }}>
                        {feature.icon}
                      </FeatureIcon>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, minHeight: '60px' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3, minHeight: '72px' }}>
                        {feature.description}
                      </Typography>
                      <Button 
                        variant="outlined"
                        size="small" 
                        color={feature.color}
                        onClick={() => navigate(feature.path)}
                        sx={{ 
                          fontWeight: 500,
                          textTransform: 'none',
                          borderRadius: '8px',
                          px: 2,
                          '&:hover': {
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        {feature.actionText}
                        <Box component="span" sx={{ ml: 0.5, display: 'inline-flex', transition: 'transform 0.3s' }}>→</Box>
                      </Button>
                    </CardContent>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FeaturesSection;
