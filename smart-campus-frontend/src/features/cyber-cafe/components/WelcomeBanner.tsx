import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, IconButton, Collapse, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const WelcomeBanner = () => {
  const [open, setOpen] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Check if user has seen the welcome message before (only runs on client-side)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenCyberCafeWelcome') === 'true';
    setHasSeenWelcome(seen);
  }, []);
  
  if (hasSeenWelcome && !showHelp) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenCyberCafeWelcome', 'true');
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
  };

  return (
    <Collapse in={open}>
      <Alert 
        severity="info" 
        variant="outlined" 
        sx={{ 
          mb: 3,
          borderRadius: '12px',
          '& .MuiAlert-message': {
            width: '100%',
          }
        }}
        action={
          <>
            <IconButton
              aria-label="help"
              color="inherit"
              size="small"
              onClick={handleHelpClick}
              sx={{ mr: 0.5 }}
            >
              <HelpOutlineIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </>
        }
      >
        <AlertTitle>Welcome to the SmartCampus Cyber Café</AlertTitle>
        <Box sx={{ mb: 1 }}>
          Browse available computers below and book one for your preferred time duration.
          <br />
          Premium machines offer higher specs at a slightly higher rate.
          <br />
          Already using a system? You can end your session once you're done.
        </Box>
        
        {showHelp && (
          <Box 
            sx={{ 
              mt: 2, 
              pt: 2, 
              borderTop: '1px solid',
              borderColor: 'divider',
              fontSize: '0.9em'
            }}
          >
            <strong>Quick Guide:</strong>
            <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
              <li>Select a computer to view its details and booking options</li>
              <li>Choose your preferred duration (billed per hour)</li>
              <li>End your session when you're finished to free up the computer</li>
              <li>Premium computers offer better performance for resource-intensive tasks</li>
            </ul>
          </Box>
        )}
      </Alert>
    </Collapse>
  );
};

export default WelcomeBanner;
