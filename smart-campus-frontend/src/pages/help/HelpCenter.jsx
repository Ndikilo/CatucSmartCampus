import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Book as BookIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  Mail as MailIcon
} from '@mui/icons-material';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const faqs = [
    {
      id: 'library',
      question: 'How do I access the library resources?',
      answer: 'You can access the library resources by logging into your account and clicking on the Library section in the main menu.'
    },
    {
      id: 'courses',
      question: 'How do I register for courses?',
      answer: 'Course registration can be done through the Academics section during the registration period.'
    },
    {
      id: 'hostel',
      question: 'How do I apply for hostel accommodation?',
      answer: 'Hostel applications are managed through the Hostel section in your student portal.'
    },
    {
      id: 'results',
      question: 'When will the exam results be published?',
      answer: 'Exam results are typically published within 4 weeks after the examination period ends.'
    }
  ];

  const helpCategories = [
    { 
      title: 'Library', 
      icon: <BookIcon />, 
      description: 'Access e-books, journals, and research materials',
      link: '/library'
    },
    { 
      title: 'Academics', 
      icon: <SchoolIcon />, 
      description: 'Course information, timetables, and academic resources',
      link: '/academics'
    },
    { 
      title: 'Hostel', 
      icon: <HomeIcon />, 
      description: 'Hostel applications and information',
      link: '/hostel'
    },
    { 
      title: 'Contact Us', 
      icon: <MailIcon />, 
      description: 'Get in touch with our support team',
      link: '/contact'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Help Center
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search help articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Help Categories
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {helpCategories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.title}>
            <Card 
              component="a" 
              href={category.link}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                '&:hover': {
                  boxShadow: 3,
                },
                transition: 'box-shadow 0.3s',
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {React.cloneElement(category.icon, { sx: { fontSize: 40, mb: 2, color: 'primary.main' } })}
                <Typography variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>
      
      <Paper elevation={0} sx={{ mb: 4 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Accordion 
              key={faq.id} 
              expanded={expanded === `panel-${index}`}
              onChange={handleAccordionChange(`panel-${index}`)}
              elevation={0}
              sx={{
                '&:before': {
                  display: 'none',
                },
                mb: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                '&.Mui-expanded': {
                  margin: 0,
                  mb: 1,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ flexShrink: 0, mr: 2 }}>
                  <HelpIcon color="primary" />
                </Typography>
                <Typography sx={{ flex: 1 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>No results found for "{searchQuery}"</Typography>
        )}
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 2 }}>
        Still need help?
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        href="/it-help"
        startIcon={<HelpIcon />}
      >
        Contact IT Support
      </Button>
    </Container>
  );
};

export default HelpCenter;
