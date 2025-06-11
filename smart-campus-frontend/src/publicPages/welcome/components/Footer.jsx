import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube, Email, Phone, LocationOn, School as SchoolIcon } from '@mui/icons-material';

const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0, 4),
  '& a': {
    color: theme.palette.grey[400],
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    },
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'block',
    width: '50px',
    height: '3px',
    background: theme.palette.primary.main,
    marginTop: theme.spacing(1),
  },
}));

const FooterList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    marginBottom: theme.spacing(1.5),
    '& svg': {
      marginRight: theme.spacing(1.5),
      color: theme.palette.primary.main,
      width: '20px',
    },
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { text: 'About Us', url: '/about' },
    { text: 'Contact', url: '/contact' },
    { text: 'FAQs', url: '/faq' },
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
  ];

  const resources = [
    { text: 'Academic Calendar', url: '/calendar' },
    { text: 'Campus Directory', url: '/directory' },
    { text: 'IT Help Desk', url: '/helpdesk' },
    { text: 'Careers', url: '/careers' },
    { text: 'Alumni', url: '/alumni' },
  ];

  const contactInfo = [
    { icon: <LocationOn />, text: '123 University Ave, City, Country' },
    { icon: <Phone />, text: '+1 (555) 123-4567' },
    { icon: <Email />, text: 'info@smartcampus.edu' },
  ];

  const socialMedia = [
    { icon: <Facebook />, name: 'Facebook', url: '#' },
    { icon: <Twitter />, name: 'Twitter', url: '#' },
    { icon: <Instagram />, name: 'Instagram', url: '#' },
    { icon: <LinkedIn />, name: 'LinkedIn', url: '#' },
    { icon: <YouTube />, name: 'YouTube', url: '#' },
  ];

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3} display="grid">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'white' }}>
                SmartCampus
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, color: theme.palette.grey[400] }}>
              Empowering education through technology. Connecting students, faculty, and staff in a seamless digital environment.
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              {socialMedia.map((social, index) => (
                <SocialButton key={index} aria-label={social.name} component="a" href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </SocialButton>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3} display="grid">
            <FooterTitle variant="h6">Quick Links</FooterTitle>
            <FooterList>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} underline="none">
                    {link.text}
                  </Link>
                </li>
              ))}
            </FooterList>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3} display="grid">
            <FooterTitle variant="h6">Resources</FooterTitle>
            <FooterList>
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link href={resource.url} underline="none">
                    {resource.text}
                  </Link>
                </li>
              ))}
            </FooterList>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3} display="grid">
            <FooterTitle variant="h6">Contact Us</FooterTitle>
            <FooterList>
              {contactInfo.map((info, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ marginTop: '4px' }}>{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </FooterList>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
            © {currentYear} SmartCampus. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/privacy" underline="none" variant="body2" color="text.secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" underline="none" variant="body2" color="text.secondary">
              Terms of Service
            </Link>
            <Link href="/accessibility" underline="none" variant="body2" color="text.secondary">
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
