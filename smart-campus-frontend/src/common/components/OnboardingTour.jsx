import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Welcome to SmartCampus',
    content: 'Your one-stop platform for all academic needs. Let us show you around!',
    selector: '#welcome-tour',
  },
  {
    title: 'Quick Stats',
    content: 'View your academic performance at a glance with these key metrics.',
    selector: '#stats-tour',
  },
  {
    title: 'Upcoming Deadlines',
    content: 'Never miss an assignment or exam with your personalized schedule.',
    selector: '#deadlines-tour',
  },
  {
    title: 'Recent Activity',
    content: 'Stay updated with the latest announcements and course updates.',
    selector: '#activity-tour',
  },
  {
    title: 'Quick Actions',
    content: 'Access important features quickly from this section.',
    selector: '#quick-actions-tour',
  },
];

const OnboardingTour = ({ open, onClose, onComplete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [position, setPosition] = useState({});
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    if (open && steps[activeStep]?.selector) {
      const element = document.querySelector(steps[activeStep].selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        
        // Adjust tooltip position to not go off-screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let tooltipLeft = rect.left;
        let tooltipTop = rect.bottom + 20;
        
        if (tooltipLeft + 300 > viewportWidth) {
          tooltipLeft = viewportWidth - 320;
        }
        
        if (tooltipTop + 200 > viewportHeight) {
          tooltipTop = rect.top - 220;
        }
        
        setPosition(prev => ({
          ...prev,
          tooltipLeft,
          tooltipTop,
          arrow: tooltipTop < rect.top ? 'bottom' : 'top'
        }));
      }
    }
  }, [activeStep, open]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onComplete();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (!open) return null;

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              left: position.tooltipLeft,
              top: position.tooltipTop,
              width: 300,
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[10],
              padding: theme.spacing(3),
              zIndex: 1400,
            }}
          >
            {/* Arrow */}
            <Box
              sx={{
                position: 'absolute',
                [position.arrow === 'bottom' ? 'bottom' : 'top']: -10,
                left: 20,
                width: 20,
                height: 20,
                backgroundColor: theme.palette.background.paper,
                transform: 'rotate(45deg)',
                zIndex: -1,
              }}
            />
            
            <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>
            
            <Typography variant="h6" gutterBottom>
              {steps[activeStep]?.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {steps[activeStep]?.content}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={activeStep === 0 ? onClose : handleBack}
                sx={{ mr: 1 }}
              >
                {activeStep === 0 ? 'Skip' : 'Back'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
      
      {/* Highlight the current element */}
      {steps[activeStep]?.selector && (
        <Box
          sx={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: position.width,
            height: position.height,
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius,
            boxShadow: `0 0 0 2000px rgba(0,0,0,0.5)`,
            zIndex: 1399,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

export default OnboardingTour;
