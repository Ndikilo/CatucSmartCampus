import React from 'react';
import FeaturesSection from '../../shared/components/FeaturesSection';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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

const features = [
  { title: 'Real-time Grade Updates', icon: <AssessmentIcon fontSize="large" />, description: 'Students receive instant updates on their grades and feedback.' },
  { title: 'Smart Attendance', icon: <GroupIcon fontSize="large" />, description: 'Track attendance seamlessly across all classes.' },
  { title: 'Digital Library Access', icon: <SchoolIcon fontSize="large" />, description: 'Browse thousands of academic resources on demand.' },
  { title: 'Secure Logins', icon: <LockIcon fontSize="large" />, description: 'Advanced authentication and role-based access.' },
  { title: 'Event Scheduling', icon: <QueryBuilderIcon fontSize="large" />, description: 'Keep track of all campus events and deadlines.' },
  { title: 'Push Notifications', icon: <NotificationsIcon fontSize="large" />, description: 'Stay informed with smart in-app alerts.' },
  { title: 'Cloud Storage', icon: <StorageIcon fontSize="large" />, description: 'Store, retrieve, and manage your files from anywhere.' },
  { title: 'Responsive UI', icon: <DevicesIcon fontSize="large" />, description: 'Works perfectly across phones, tablets, and desktops.' },
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
  const navigate = useNavigate(); // ✅ Correct placement

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ py: 10, textAlign: 'center', background: 'linear-gradient(to right, #003973, #E5E5BE)', color: 'white' }}>
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>Welcome to SmartCampus</Typography>
          <Typography variant="h6" mb={3}>Transforming education through smart, digital experiences</Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/welcome')}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <FeaturesSection />
      
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
