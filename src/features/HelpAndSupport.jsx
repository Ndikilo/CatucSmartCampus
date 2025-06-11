import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Button, 
  TextField, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Help as HelpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  AccountCircle as AccountCircleIcon,
  Category as CategoryIcon,
  Computer as ComputerIcon,
  Receipt as ReceiptIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const HelpAndSupport = () => {
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ open: false, success: false, message: '' });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitStatus({
      open: true,
      success: true,
      message: 'Your support request has been submitted successfully! We\'ll get back to you soon.'
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(prev => ({ ...prev, open: false }));
  };

  const supportCategories = [
    { id: 'academics', label: 'Academics', icon: <SchoolIcon /> },
    { id: 'technical', label: 'Technical Issues', icon: <ComputerIcon /> },
    { id: 'billing', label: 'Billing & Payments', icon: <ReceiptIcon /> },
    { id: 'account', label: 'Account Help', icon: <AccountCircleIcon /> },
    { id: 'other', label: 'Other Inquiries', icon: <HelpIcon /> },
  ];

  const faqs = [
    {
      id: 'password',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your registered email address and follow the instructions sent to your email to create a new password.'
    },
    {
      id: 'materials',
      question: 'Where can I find my course materials?',
      answer: 'All course materials are available in the "My Courses" section after logging in. Navigate to the specific course and select "Materials" to access lecture notes, assignments, and other resources.'
    },
    {
      id: 'enrollment',
      question: 'How do I enroll in a course?',
      answer: 'You can enroll in courses through the "Course Catalog" in your dashboard. Browse available courses, check the schedule, and click "Enroll" on your preferred courses. Some courses may require advisor approval.'
    },
    {
      id: 'grades',
      question: 'When will my grades be available?',
      answer: 'Grades are typically posted within one week after the final exam. You can view your grades in the "Grades" section of your student portal. If you have concerns about a grade, please contact your instructor.'
    },
    {
      id: 'schedule',
      question: 'How do I view my class schedule?',
      answer: 'Your current class schedule is available in the "My Schedule" section. You can view it in list or calendar format, and export it to your personal calendar.'
    },
  ];

  const contactMethods = [
    {
      icon: <EmailIcon color="primary" />,
      title: 'Email Us',
      description: 'We typically respond within 24 hours',
      detail: 'support@smartcampus.edu',
      action: 'Send an email',
      link: 'mailto:support@smartcampus.edu'
    },
    {
      icon: <PhoneIcon color="primary" />,
      title: 'Call Us',
      description: 'Available Monday to Friday, 9am - 5pm',
      detail: '+1 (555) 123-4567',
      action: 'Call now',
      link: 'tel:+15551234567'
    },
    {
      icon: <ChatIcon color="primary" />,
      title: 'Live Chat',
      description: 'Chat with a support agent',
      detail: 'Available 24/7',
      action: 'Start chat',
      link: '#live-chat',
      disabled: true
    },
    {
      icon: <ScheduleIcon color="primary" />,
      title: 'Book an Appointment',
      description: 'Schedule a video call with support',
      detail: 'Select a time that works for you',
      action: 'Book now',
      link: '#book-appointment',
      disabled: true
    }
  ];

  const quickLinks = [
    { text: 'Academic Calendar', url: '#' },
    { text: 'Campus Map', url: '#' },
    { text: 'IT Help Center', url: '#' },
    { text: 'Library Resources', url: '#' },
    { text: 'Student Handbook', url: '#' },
    { text: 'FAQs', url: '#faq' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Box sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4,
          backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        }}>
          <HelpIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            How can we help you today?
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Find answers to common questions or get in touch with our support team.
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Describe your issue or question..."
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              ),
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container columns={12} spacing={4}>
        {/* Left Column - Support Options */}
        <Grid xs={12} md={8}>
          {/* Contact Methods */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Contact Support
          </Typography>
          <Grid container columns={12} spacing={3} mb={6}>
            {contactMethods.map((method, index) => (
              <Grid xs={12} sm={6} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 1,
                    },
                    opacity: method.disabled ? 0.7 : 1,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        {method.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3">
                        {method.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" paragraph>
                      {method.description}
                    </Typography>
                    <Typography variant="body2" color="text.primary" fontWeight="medium" mb={2}>
                      {method.detail}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      component="a"
                      href={method.link}
                      disabled={method.disabled}
                    >
                      {method.action}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* FAQ Section */}
          <Box id="faq" mb={6}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Paper variant="outlined">
              {faqs.map((faq, index) => (
                <Accordion 
                  key={faq.id}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  elevation={0}
                  sx={{
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&.Mui-expanded': {
                        minHeight: '48px',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    <Typography sx={{ flexShrink: 0, fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Box>

          {/* Contact Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Send us a Message
            </Typography>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Grid container columns={12} spacing={3}>
                <Grid xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select a category</option>
                    {supportCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <textarea
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontFamily: 'inherit',
                      fontSize: '0.875rem',
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => handleInputChange({ target: { name: 'message', value: e.target.value } })}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        {/* Right Column - Quick Links & Resources */}
        <Grid xs={12} md={4}>
          {/* Quick Links */}
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              Quick Links
            </Typography>
            <List disablePadding>
              {quickLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    button 
                    component="a" 
                    href={link.url}
                    sx={{
                      px: 0,
                      py: 1.5,
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ChevronRightIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                  {index < quickLinks.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Support Categories */}
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              Support Categories
            </Typography>
            <Grid container columns={12} spacing={1}>
              {supportCategories.map((category) => (
                <Grid xs={6} key={category.id}>
                  <Button
                    fullWidth
                    startIcon={category.icon}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      color: 'text.primary',
                      textAlign: 'left',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    {category.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Status */}
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'success.light' }}>
            <Box display="flex" alignItems="center" mb={1}>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                All Systems Operational
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              No ongoing incidents or maintenance. Last updated 2 hours ago.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Success Message */}
      <Snackbar
        open={submitStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={submitStatus.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HelpAndSupport;
