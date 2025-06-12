import React, { useState, useEffect } from 'react';
import FeaturesSection from '../../shared/components/FeaturesSection/index.jsx';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Close as CloseIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  LocationOnOutlined,
  Search as SearchIcon,
  Language as WebsiteIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  Lock as LockIcon,
  QueryBuilder as QueryBuilderIcon,
  Devices as DevicesIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

// Import your institution data
import institutions from '../../data/institutions.json';
import { getInstitutionIcon } from '../../utils/institutionIcons.jsx';
import InstitutionMap from '../../components/InstitutionMap';

const reasons = [
  { icon: <SchoolIcon fontSize="large" />, label: 'Seamless Academic Management' },
  { icon: <LockIcon fontSize="large" />, label: 'Secure User Access' },
  { icon: <QueryBuilderIcon fontSize="large" />, label: '24/7 Availability' },
  { icon: <DevicesIcon fontSize="large" />, label: 'Accessible on All Devices' },
  { icon: <GroupIcon fontSize="large" />, label: 'Collaboration Tools' },
  { icon: <AssessmentIcon fontSize="large" />, label: 'Performance Insights' },
  { icon: <NotificationsIcon fontSize="large" />, label: 'Smart Notifications' },
  { icon: <StorageIcon fontSize="large" />, label: 'Reliable Cloud Storage' },
];

const faqs = [
  { question: 'What is SmartCampus?', answer: 'SmartCampus is an all-in-one digital platform that streamlines campus operations for students, staff, and administrators.' },
  { question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption and authentication methods to protect your data.' },
  { question: 'Who can use SmartCampus?', answer: 'Students, lecturers, administrators, and IT personnel of supported institutions.' },
  { question: 'Does it work offline?', answer: 'While SmartCampus requires internet access for real-time features, some offline support is under development.' },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 }
};


const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get the selected institution data
  const selectedInstitutionData = selectedInstitution 
    ? institutions.find(i => i.id === selectedInstitution) 
    : null;
    
  // Add icon mapping for institutions
  const getInstitutionIcon = (institution) => {
    if (institution.id === 'guest') return <PersonIcon />;
    return <SchoolIcon />;
  };
  
  // Add guest option to institutions list
  const institutionsWithGuest = [
    ...institutions,
    {
      id: 'guest',
      name: 'Continue as Guest',
      type: '',
      location: '',
      programs: 'Limited access',
      guestAccess: true
    }
  ];
  
  // Filter institutions based on search term
  const filteredInstitutions = institutionsWithGuest.filter(institution => 
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (institution.location && institution.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (institution.type && institution.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle search clear
  const handleSearchClear = () => {
    setSearchTerm('');
  };

  const handleGetStarted = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleProceed = () => {
    if (selectedInstitution) {
      navigate('/welcome', { state: { institution: selectedInstitution } });
    } else {
      navigate('/welcome');
    }
  };

  const handleInstitutionSelect = (institutionId) => {
    setSelectedInstitution(institutionId);
    // Auto-scroll to details on mobile
    if (isMobile) {
      setTimeout(() => {
        document.querySelector('#institution-details')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Get the display name for the selected institution
  const getInstitutionDisplayName = (institution) => {
    return institution.abbreviation || institution.name.split('(')[0].trim();
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ py: 6, textAlign: 'center', background: 'linear-gradient(to right, #003973, #E5E5BE)', color: 'white' }}>
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box 
            component="img"
            src="/src/assets/logo.png"
            alt="SmartCampus Logo"
            sx={{ 
              height: 120, 
              width: 'auto',
              mb: 4,
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))'
            }}
          />
          <Typography variant="h2" fontWeight="bold" gutterBottom>Welcome to SmartCampus</Typography>
          <Typography variant="h6" mb={3}>Transforming education through smart, digital experiences</Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          
          {/* Institution Selection Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleClose} 
            maxWidth="lg" 
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
              sx: {
                borderRadius: { xs: 0, md: 2 },
                boxShadow: { xs: 'none', md: '0 10px 25px rgba(0, 0, 0, 0.2)' },
                maxHeight: { xs: '100%', md: '90vh' },
                height: { xs: '100%', md: 'auto' },
                width: { xs: '100%', md: '90vw' },
                maxWidth: { xs: '100%', md: '1200px' },
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }
            }}
          >
            <DialogTitle sx={{ 
              textAlign: 'center', 
              bgcolor: 'primary.main', 
              color: 'white',
              padding: { xs: '12px 16px', md: '16px 24px' },
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              },
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '64px',
              boxSizing: 'border-box'
            }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  sx={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
              Select Your Institution
            </DialogTitle>
            <DialogContent dividers sx={{ flex: '1 1 auto', overflowY: 'auto', p: { xs: 2, md: 3 } }}>
              <Grid container spacing={3} sx={{ mt: 0 }}>
                <Grid item xs={12} md={5}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search institutions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleSearchClear}
                              size="small"
                              sx={{ mr: -1 }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'divider',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                          },
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ 
                    height: { xs: '50vh', md: '60vh' }, 
                    overflowY: 'auto',
                    border: '1px solid', 
                    borderColor: 'divider', 
                    borderRadius: 1,
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(0,0,0,0.03)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(0,0,0,0.15)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'rgba(0,0,0,0.25)',
                    }
                  }}>
                    {filteredInstitutions.length > 0 ? (
                      <List disablePadding>
                        {filteredInstitutions.map((institution) => (
                          <React.Fragment key={institution.id}>
                            <ListItem 
                              button 
                              onClick={() => handleInstitutionSelect(institution.id)}
                              selected={selectedInstitution === institution.id}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                },
                                '&.Mui-selected': {
                                  backgroundColor: 'action.selected',
                                  '&:hover': {
                                    backgroundColor: 'action.selected',
                                  },
                                },
                                borderLeft: selectedInstitution === institution.id ? '4px solid' : 'none',
                                borderLeftColor: 'primary.main',
                                pl: selectedInstitution === institution.id ? '12px' : '16px',
                                py: 1.5,
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: selectedInstitution === institution.id ? 'primary.light' : 'grey.100',
                                    color: selectedInstitution === institution.id ? 'primary.contrastText' : 'text.secondary',
                                    width: 40,
                                    height: 40
                                  }}
                                >
                                  {getInstitutionIcon(institution.id, 'medium')}
                                </Avatar>
                              </ListItemAvatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  noWrap 
                                  sx={{ 
                                    color: selectedInstitution === institution.id ? 'primary.main' : 'text.primary',
                                    fontWeight: selectedInstitution === institution.id ? 600 : 500,
                                    mb: 0.5
                                  }}
                                >
                                  {institution.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                                  <Chip 
                                    label={institution.type} 
                                    size="small" 
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '0.65rem',
                                      fontWeight: 500,
                                      bgcolor: selectedInstitution === institution.id ? 'primary.light' : 'grey.100',
                                      color: selectedInstitution === institution.id ? 'primary.dark' : 'text.secondary',
                                    }} 
                                  />
                                  {institution.website && (
                                    <Tooltip title="Visit website">
                                      <IconButton 
                                        size="small" 
                                        href={institution.website} 
                                        target="_blank" 
                                        rel="noopener"
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          color: 'text.secondary',
                                          '&:hover': { color: 'primary.main' }
                                        }}
                                      >
                                        <WebsiteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                  <LocationIcon fontSize="inherit" sx={{ fontSize: '1rem', mr: 0.5 }} />
                                  <Typography variant="caption" noWrap sx={{ fontSize: '0.75rem' }}>
                                    {institution.location}
                                  </Typography>
                                </Box>
                              </Box>
                            </ListItem>
                            <Divider component="li" sx={{ my: 0 }} />
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        p: 3,
                        textAlign: 'center'
                      }}>
                        <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }} />
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          No institutions found
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Try adjusting your search or filter
                        </Typography>
                        {searchTerm && (
                          <Button 
                            size="small" 
                            color="primary" 
                            onClick={handleSearchClear}
                            sx={{ mt: 1 }}
                          >
                            Clear search
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>
                  
                  {selectedInstitution && (
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        mt: 2, 
                        p: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {selectedInstitution === 'guest' ? (
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', mr: 2 }}>
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600}>
                                Continue as Guest
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Limited access to features
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ pl: 1, borderLeft: '2px solid', borderColor: 'divider' }}>
                            You'll have access to basic features. Sign in with an institution account for full access to all features and content.
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: 'primary.light', 
                                color: 'primary.contrastText', 
                                mr: 2,
                                width: 48,
                                height: 48,
                                '& .MuiSvgIcon-root': {
                                  fontSize: '1.75rem'
                                }
                              }}
                            >
                              {getInstitutionIcon(selectedInstitution, 'large')}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="subtitle1" fontWeight={600} noWrap>
                                {selectedInstitutionData?.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                                <Chip 
                                  label={selectedInstitutionData?.type} 
                                  size="small" 
                                  sx={{ 
                                    height: 20, 
                                    fontSize: '0.65rem',
                                    fontWeight: 500,
                                    bgcolor: 'primary.light',
                                    color: 'primary.dark',
                                  }} 
                                />
                                {selectedInstitutionData?.website && (
                                  <Tooltip title="Visit website">
                                    <IconButton 
                                      size="small" 
                                      href={selectedInstitutionData.website} 
                                      target="_blank" 
                                      rel="noopener"
                                      sx={{
                                        width: 24,
                                        height: 24,
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' }
                                      }}
                                    >
                                      <WebsiteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Box>
                            </Box>
                          </Box>
                          
                          <Grid container spacing={2} sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <LocationIcon 
                                  color="action" 
                                  fontSize="small" 
                                  sx={{ 
                                    mt: '2px', 
                                    mr: 1, 
                                    color: 'text.secondary',
                                    flexShrink: 0
                                  }} 
                                />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.3}>
                                    Location
                                  </Typography>
                                  <Typography variant="body2" color="text.primary">
                                    {selectedInstitutionData?.location}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <SchoolIcon 
                                  color="action" 
                                  fontSize="small" 
                                  sx={{ 
                                    mt: '2px', 
                                    mr: 1, 
                                    color: 'text.secondary',
                                    flexShrink: 0
                                  }} 
                                />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.3}>
                                    Programs
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.25 }}>
                                    {selectedInstitutionData?.programs?.slice(0, 3).map((program, index) => (
                                      <Chip 
                                        key={index} 
                                        label={program} 
                                        size="small" 
                                        sx={{ 
                                          height: 20, 
                                          fontSize: '0.6rem',
                                          bgcolor: 'action.selected',
                                          color: 'text.secondary'
                                        }} 
                                      />
                                    ))}
                                    {selectedInstitutionData?.programs?.length > 3 && (
                                      <Tooltip 
                                        title={selectedInstitutionData.programs.slice(3).join(', ')}
                                        arrow
                                      >
                                        <Chip 
                                          label={`+${selectedInstitutionData.programs.length - 3} more`} 
                                          size="small" 
                                          sx={{ 
                                            height: 20, 
                                            fontSize: '0.6rem',
                                            bgcolor: 'action.hover',
                                            color: 'text.secondary'
                                          }} 
                                        />
                                      </Tooltip>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </Paper>
                  )}
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderBottom: '1px solid', 
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <LocationIcon color="primary" sx={{ mr: 1, fontSize: '1.25rem' }} />
                      <Typography variant="subtitle2" color="text.primary" fontWeight={500}>
                        {selectedInstitutionData?.location || 'Bamenda, Cameroon'}
                      </Typography>
                      <Tooltip 
                        title="The map shows the location of the selected institution. You can interact with the map to explore further."
                        arrow
                        placement="top"
                      >
                        <IconButton size="small" sx={{ ml: 'auto', color: 'text.secondary' }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ flex: 1, position: 'relative' }}>
                      {selectedInstitution ? (
                        <InstitutionMap 
                          institution={selectedInstitutionData} 
                          height="100%"
                        />
                      ) : (
                        <Box 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            p: 3,
                            textAlign: 'center',
                            bgcolor: 'grey.50',
                          }}
                        >
                          <LocationOnOutlined 
                            sx={{ 
                              fontSize: 48, 
                              color: 'text.disabled', 
                              mb: 1.5 
                            }} 
                          />
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            Select an institution to view its location
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
                            The map will show the exact location of the selected institution
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button 
                onClick={handleClose} 
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  padding: '8px 20px',
                  borderRadius: 1,
                  fontWeight: 500
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleProceed} 
                variant="contained" 
                color="primary"
                disabled={!selectedInstitution}
                sx={{
                  textTransform: 'none',
                  padding: '8px 24px',
                  borderRadius: 1,
                  fontWeight: 500,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                    boxShadow: 'none'
                  }
                }}
              >
                Proceed to {selectedInstitution === 'guest' ? 'Guest Access' : 'Campus'}
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Box>

      {/* Why Choose SmartCampus Carousel */}
      <Box sx={{ py: 10, backgroundColor: '#f4f6f8' }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>Why Choose SmartCampus</Typography>
          <Carousel
            responsive={responsive}
            autoPlay
            autoPlaySpeed={3000}
            infinite
            pauseOnHover
            arrows={false}
            showDots
          >
            {reasons.map((reason, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}>
                <Card sx={{ m: 2, p: 3, textAlign: 'center' }}>
                  {reason.icon}
                  <Typography variant="subtitle1" mt={1}>{reason.label}</Typography>
                </Card>
              </motion.div>
            ))}
          </Carousel>
        </Container>
      </Box>
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* FAQ Section */}
      <Box sx={{ py: 10, backgroundColor: '#f0f2f5' }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>Frequently Asked Questions</Typography>
          {faqs.map((faq, idx) => (
            <Accordion key={idx} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: '#003973', color: '#fff' }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h6">SmartCampus</Typography>
          <Typography variant="body2" mt={1}>Empowering education for the digital age.</Typography>
          <Typography variant="caption" mt={2} display="block">© {new Date().getFullYear()} SmartCampus. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
