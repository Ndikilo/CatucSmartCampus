import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Computer as ComputerIcon,
  AccountCircle as AccountCircleIcon,
  Lock as LockIcon,
  Wifi as WifiIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Build as BuildIcon
} from '@mui/icons-material';

const ITHelpDesk = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    subject: '',
    description: '',
    priority: 'medium',
  });
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock data for ticket history
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Cannot access student portal',
      status: 'Resolved',
      date: '2023-05-15',
      priority: 'high'
    },
    {
      id: 'TKT-002',
      subject: 'WiFi connection issues in Library',
      status: 'In Progress',
      date: '2023-06-01',
      priority: 'medium'
    },
    {
      id: 'TKT-003',
      subject: 'Email not syncing on mobile',
      status: 'Open',
      date: '2023-06-10',
      priority: 'low'
    }
  ]);

  const issueTypes = [
    { value: 'login', label: 'Login Issues', icon: <LockIcon /> },
    { value: 'wifi', label: 'WiFi/Network', icon: <WifiIcon /> },
    { value: 'email', label: 'Email Problems', icon: <EmailIcon /> },
    { value: 'printing', label: 'Printing Issues', icon: <PrintIcon /> },
    { value: 'software', label: 'Software Installation', icon: <ComputerIcon /> },
    { value: 'other', label: 'Other Technical Issue', icon: <BuildIcon /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: formData.subject,
        status: 'Open',
        date: new Date().toISOString().split('T')[0],
        priority: formData.priority
      };
      
      setTickets([newTicket, ...tickets]);
      setSubmitting(false);
      setSnackbar({
        open: true,
        message: 'Your support ticket has been submitted successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        issueType: '',
        subject: '',
        description: '',
        priority: 'medium',
      });
      
      // Switch to tickets tab
      setActiveTab(1);
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'in progress':
        return <CircularProgress size={20} />;
      default:
        return <PendingIcon color="action" fontSize="small" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error.main';
      case 'medium':
        return 'warning.main';
      default:
        return 'success.main';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        IT Help Desk
      </Typography>
      <Typography color="text.secondary" paragraph>
        Having technical issues? Submit a ticket and our IT support team will assist you.
      </Typography>

      <Paper elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3,
            },
          }}
        >
          <Tab label="Submit a Ticket" iconPosition="start" icon={<ComputerIcon />} />
          <Tab label="My Tickets" iconPosition="start" icon={<AccountCircleIcon />} />
          <Tab label="Contact Support" iconPosition="start" icon={<PhoneIcon />} />
        </Tabs>

        <Box p={3}>
          {activeTab === 0 && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required margin="normal">
                    <InputLabel id="issue-type-label">Issue Type</InputLabel>
                    <Select
                      labelId="issue-type-label"
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleChange}
                      label="Issue Type"
                    >
                      {issueTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {type.icon}
                            {type.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required margin="normal">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={6}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, and what you've tried so far."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={20} /> : null}
                  >
                    {submitting ? 'Submitting...' : 'Submit Ticket'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}

          {activeTab === 1 && (
            <Box>
              {tickets.length > 0 ? (
                <Box>
                  {tickets.map((ticket) => (
                    <Card 
                      key={ticket.id} 
                      variant="outlined" 
                      sx={{ 
                        mb: 2,
                        borderLeft: `4px solid ${getPriorityColor(ticket.priority)}`,
                        '&:hover': {
                          boxShadow: 1,
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            {getStatusIcon(ticket.status)}
                          </Grid>
                          <Grid item xs>
                            <Typography variant="subtitle1">
                              {ticket.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Ticket #{ticket.id} • {ticket.date}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Chip 
                              label={ticket.status} 
                              size="small"
                              color={
                                ticket.status.toLowerCase() === 'resolved' ? 'success' : 
                                ticket.status.toLowerCase() === 'in progress' ? 'primary' : 'default'
                              }
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography color="text.secondary">
                    You don't have any support tickets yet.
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact IT Support
              </Typography>
              <Typography paragraph>
                For immediate assistance, please contact our IT support team using one of the following methods:
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Call Us</Typography>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium' }}>
                        +1 (555) 123-4567
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Mon-Fri, 8:00 AM - 6:00 PM
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <EmailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Email Us</Typography>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium', wordBreak: 'break-word' }}>
                        itsupport@campus.edu
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Response within 24 hours
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <ComputerIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Live Chat</Typography>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium' }}>
                        Chat Now
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Mon-Fri, 9:00 AM - 5:00 PM
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  IT Support Hours
                </Typography>
                <Typography paragraph>
                  Our IT support team is available during the following hours:
                </Typography>
                <Box component="ul" sx={{ pl: 3, '& li': { mb: 1 } }}>
                  <li><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</li>
                  <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                  <li><strong>Sunday:</strong> Closed</li>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                  * Hours may vary during holidays and campus breaks.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ITHelpDesk;
