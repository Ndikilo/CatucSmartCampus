import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Book as BookIcon, Computer as ComputerIcon, Map as MapIcon, Event as EventIcon } from '@mui/icons-material';

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
    icon: <BookIcon />,
    title: 'Digital Library',
    description: 'Access thousands of books, journals, and research papers anytime, anywhere.',
    actionText: 'Browse Library',
    path: '/library'
  },
  {
    icon: <ComputerIcon />,
    title: 'Cyber Café',
    description: 'Book computer stations and access high-speed internet across campus.',
    actionText: 'View Stations',
    path: '/cyber-cafe'
  },
  {
    icon: <MapIcon />,
    title: 'Campus Map',
    description: 'Navigate the campus with our interactive map and find your way around easily.',
    actionText: 'Explore Map',
    path: '/map'
  },
  {
    icon: <EventIcon />,
    title: 'Events',
    description: 'Stay updated with upcoming campus events, workshops, and activities.',
    actionText: 'View Events',
    path: '/events'
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Section id="features">
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Discover Our Platform
        </SectionTitle>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    endIcon={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>→</Box>}
                    onClick={() => navigate(feature.path)}
                    sx={{ 
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {feature.actionText}
                  </Button>
                </CardActions>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default FeaturesSection;
