import React from 'react';
import { Box, Typography, Button, Paper, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const features = [
  {
    icon: <SchoolIcon fontSize="large" />,
    title: 'Track Your Progress',
    description: 'Monitor your academic journey with real-time updates',
  },
  {
    icon: <EmojiEventsIcon fontSize="large" />,
    title: 'Achieve More',
    description: 'Set and accomplish your academic goals',
  },
  {
    icon: <LocalLibraryIcon fontSize="large" />,
    title: 'Learn Smarter',
    description: 'Access all your learning resources in one place',
  },
];

const WelcomeBanner = ({ firstName, onDismiss, onStartTour }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: theme.palette.primary.contrastText,
        p: 4,
        borderRadius: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          right: 100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      
      <Box position="relative" zIndex={1}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back, {firstName}!
            </Typography>
            <Typography variant="h6" fontWeight={400} sx={{ opacity: 0.9, maxWidth: '70%' }}>
              We're excited to have you here. Let's make this semester your best one yet!
            </Typography>
          </Box>
          <Button
            onClick={onDismiss}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            variant="outlined"
          >
            Dismiss
          </Button>
        </Box>

        <Box display="flex" mt={4} flexWrap="wrap" gap={3}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  minWidth: 240,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                  transition: 'all 0.3s ease',
                }}
                elevation={0}
              >
                <Box sx={{ color: 'white', mb: 1 }}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onStartTour}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Take a Quick Tour
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              px: 4,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Watch Tutorial
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default WelcomeBanner;
