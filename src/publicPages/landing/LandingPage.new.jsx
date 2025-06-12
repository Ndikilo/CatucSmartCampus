import React, { useState } from 'react';
import FeaturesSection from '../../shared/components/FeaturesSection/index.jsx';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorageIcon from '@mui/icons-material/Storage';
import { useNavigate } from 'react-router-dom';

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

const institutions = [
  { 
    id: 'uba', 
    name: 'University of Bamenda (UBa)', 
    type: 'Public',
    location: 'Bambili, Bamenda',
    programs: 'Science, Engineering, Medicine, Law, Education, Arts, Agriculture',
    website: 'https://www.uniba.cm',
    icon: <SchoolIcon /> 
  },
  { 
    id: 'catuc', 
    name: 'Catholic University of Cameroon (CATUC)', 
    type: 'Private (Faith-based)',
    location: 'Nkwen, Bamenda',
    programs: 'Computer Science, Business, Philosophy, Law, Health Sciences',
    website: 'https://www.catuc.org',
    icon: <SchoolIcon /> 
  },
  { 
    id: 'npuib', 
    name: 'National Polytechnic University Institute Bamenda (NPUIB)', 
    type: 'Private',
    location: 'Mile 7, Mankon, Bamenda',
    programs: 'Engineering, Computer Science, Management, Health Sciences',
    website: 'https://npbedu.org',
    icon: <SchoolIcon /> 
  },
  { 
    id: 'smu', 
    name: 'Saint Monica University (SMU)', 
    type: 'Private',
    location: 'Bulu, Mile 16 Nkwen, Bamenda',
    programs: 'Business, IT, Public Health, International Relations',
    website: 'https://www.stmonicauniversity.com',
    icon: <SchoolIcon /> 
  },
  { 
    id: 'ict', 
    name: 'ICT University Cameroon Campus', 
    type: 'Private (American-affiliated)',
    location: 'Online programs available in Bamenda',
    programs: 'IT, Cybersecurity, Data Science, Management, Public Health',
    website: 'https://www.ictuniversity.org',
    icon: <SchoolIcon /> 
  },
  { 
    id: 'guest', 
    name: 'Continue as Guest', 
    type: '',
    location: '',
    programs: 'Limited access',
    website: '',
    icon: <PersonIcon /> 
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState('');

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
          <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              Select Your Institution
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={5}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="institution-select-label">Search Institution</InputLabel>
                    <Select
                      labelId="institution-select-label"
                      id="institution-select"
                      value={selectedInstitution}
                      label="Search Institution"
                      onChange={(e) => handleInstitutionSelect(e.target.value)}
                      fullWidth
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                          },
                        },
                      }}
                    >
                      {institutions.map((institution) => (
                        <MenuItem key={institution.id} value={institution.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {institution.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={institution.name.split(' (')[0]} 
                              secondary={institution.name.includes('(') ? `(${institution.name.split(' (')[1]}` : ''}
                              primaryTypographyProps={{ noWrap: true }}
                              secondaryTypographyProps={{ noWrap: true }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {selectedInstitution && selectedInstitution !== 'guest' && (
                    <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom>
                        {institutions.find(i => i.id === selectedInstitution)?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Type:</strong> {institutions.find(i => i.id === selectedInstitution)?.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Location:</strong> {institutions.find(i => i.id === selectedInstitution)?.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Programs:</strong> {institutions.find(i => i.id === selectedInstitution)?.programs}
                      </Typography>
                      {institutions.find(i => i.id === selectedInstitution)?.website && (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          href={institutions.find(i => i.id === selectedInstitution)?.website} 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </Button>
                      )}
                    </Paper>
                  )}
                  
                  {selectedInstitution === 'guest' && (
                    <Paper elevation={3} sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="h6" gutterBottom>
                        Continue as Guest
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You'll have limited access to features. Sign in with an institution account for full access.
                      </Typography>
                    </Paper>
                  )}
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Box sx={{ height: '100%', minHeight: 300, bgcolor: 'grey.100', borderRadius: 1, p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Map View (Bamenda, Cameroon)
                    </Typography>
                    <Box sx={{ 
                      height: 'calc(100% - 30px)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'white',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      p: 2,
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        Interactive map would be displayed here showing institution locations
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                onClick={handleProceed} 
                variant="contained" 
                color="primary"
                disabled={!selectedInstitution}
              >
                Proceed
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
