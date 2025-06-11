import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  TextField, 
  Box, 
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  School, 
  Description, 
  ContactMail, 
  Payment, 
  CheckCircle, 
  ExpandMore,
  EventAvailable,
  Info,
  Phone,
  Email,
  LocationOn,
  AccessTime
} from '@mui/icons-material';

const steps = [
  'Application',
  'Document Submission',
  'Entrance Exam',
  'Interview',
  'Admission Decision'
];

const programs = [
  {
    title: 'Undergraduate Programs',
    description: 'Bachelor\'s degrees in various fields of study',
    deadline: 'June 30, 2024',
    requirements: [
      'High school diploma or equivalent',
      'Minimum GPA of 3.0',
      'SAT/ACT scores (optional)',
      'Personal statement',
      'Letters of recommendation'
    ]
  },
  {
    title: 'Graduate Programs',
    description: 'Master\'s and PhD programs for advanced studies',
    deadline: 'July 31, 2024',
    requirements: [
      'Bachelor\'s degree from accredited institution',
      'Minimum GPA of 3.2',
      'GRE/GMAT scores (if required)',
      'Statement of purpose',
      'Letters of recommendation',
      'Resume/CV'
    ]
  },
  {
    title: 'International Students',
    description: 'Special admission process for international applicants',
    deadline: 'May 15, 2024',
    requirements: [
      'All standard program requirements',
      'TOEFL/IELTS scores',
      'Financial documentation',
      'Passport copy',
      'Visa documentation'
    ]
  }
];

const Admission = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Admissions
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          Begin your academic journey with us. Explore our programs, check requirements, and start your application today.
        </Typography>
      </Box>

      {/* Application Process Stepper */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Application Process
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Paper>

      {/* Programs Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Our Programs
      </Typography>
      <Grid container spacing={4} mb={6}>
        {programs.map((program, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <School color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    {program.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {program.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box mb={2}>
                  <Chip 
                    icon={<EventAvailable />} 
                    label={`Deadline: ${program.deadline}`} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements:
                </Typography>
                <List dense>
                  {program.requirements.map((req, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box p={2}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                  onClick={() => {/* Handle apply now */}}
                >
                  Apply Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Frequently Asked Questions
      </Typography>
      <Paper elevation={2} sx={{ mb: 6, borderRadius: 2, overflow: 'hidden' }}>
        {[/* FAQ items */].map((faq, index) => (
          <Accordion 
            key={index} 
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            elevation={0}
            sx={{
              '&:not(:last-child)': { borderBottom: 1, borderColor: 'divider' },
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Contact Information */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Contact Admissions
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <ContactMail color="primary" sx={{ mr: 2 }} />
              <div>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography>admissions@campus.edu</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <Phone color="primary" sx={{ mr: 2 }} />
              <div>
                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography>+1 (555) 123-4567</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn color="primary" sx={{ mr: 2 }} />
              <div>
                <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                <Typography>123 University Avenue, Campus City, 12345</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Office Hours
          </Typography>
          <Box display="flex" alignItems="center">
            <AccessTime color="primary" sx={{ mr: 1 }} />
            <Typography>Monday - Friday: 9:00 AM - 5:00 PM</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Admission;
