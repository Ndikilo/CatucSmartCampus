import React, { useState, useCallback } from 'react';
import HostelApplication from './HostelApplication';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Box, 
  Tabs, 
  Tab, 
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  Home as HomeIcon,
  LocationOn as LocationIcon,
  Wifi as WifiIcon,
  Restaurant as RestaurantIcon,
  LocalLaundryService as LaundryIcon,
  Security as SecurityIcon,
  FitnessCenter as GymIcon,
  LocalParking as ParkingIcon,
  MeetingRoom as StudyRoomIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Bed as BedIcon,
  Bathtub as BathroomIcon,
  People as CapacityIcon,
  MonetizationOn as PriceIcon,
  FilterList as FilterIcon,
  Map as MapIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as ClockIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Sample data for hostels
const hostels = [
  {
    id: 1,
    name: 'Unity Hall',
    type: 'Male',
    rating: 4.5,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Modern hostel with excellent facilities and a vibrant community. Perfect for students who want a balance of study and social life.',
    amenities: ['WiFi', 'Cafeteria', 'Laundry', '24/7 Security', 'Gym', 'Study Room'],
    location: 'Main Campus, 5 min walk to Central Library',
    rooms: [
      { type: 'Single', price: 350000, available: 5 },
      { type: 'Double', price: 300000, available: 8 },
      { type: 'Triple', price: 250000, available: 3 },
    ],
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'unity.hall@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
  {
    id: 2,
    name: 'Harmony House',
    type: 'Female',
    rating: 4.8,
    price: 1350,
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'A peaceful and secure environment designed for female students. Features modern amenities and a supportive community.',
    amenities: ['WiFi', 'Cafeteria', 'Laundry', '24/7 Security', 'Study Room', 'Yoga Room'],
    location: 'North Campus, next to Student Center',
    rooms: [
      { type: 'Single', price: 350000, available: 3 },
      { type: 'Double', price: 300000, available: 5 },
    ],
    contact: {
      phone: '+1 (555) 123-4568',
      email: 'harmony.house@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
  {
    id: 3,
    name: 'Prestige Residences',
    type: 'Mixed',
    rating: 4.2,
    price: 275000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Affordable housing option with all essential amenities. Great for students looking for a comfortable place to stay on a budget.',
    amenities: ['WiFi', 'Laundry', '24/7 Security', 'Common Kitchen'],
    location: 'East Campus, 10 min walk to Engineering Building',
    rooms: [
      { type: 'Double', price: 300000, available: 10 },
      { type: 'Triple', price: 275000, available: 7 },
      { type: 'Quad', price: 250000, available: 4 },
    ],
    contact: {
      phone: '+1 (555) 123-4569',
      email: 'prestige.residences@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
];

// Amenity icons mapping
const amenityIcons = {
  'WiFi': <WifiIcon />,
  'Cafeteria': <RestaurantIcon />,
  'Laundry': <LaundryIcon />,
  '24/7 Security': <SecurityIcon />,
  'Gym': <GymIcon />,
  'Parking': <ParkingIcon />,
  'Study Room': <StudyRoomIcon />,
  'Yoga Room': <GymIcon />,
  'Common Kitchen': <RestaurantIcon />
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 4,
  },
  marginBottom: theme.spacing(4),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minWidth: 120,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const HostelCard = ({ hostel, onApplyNow }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardActionArea onClick={() => setExpanded(!expanded)}>
        <CardMedia
          component="img"
          height="200"
          image={hostel.image}
          alt={hostel.name}
          sx={{ objectPosition: 'center' }}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 0, mr: 1 }}>
              {hostel.name}
            </Typography>
            <Chip 
              label={hostel.type} 
              size="small" 
              color={hostel.type === 'Female' ? 'secondary' : 'primary'}
              variant="outlined"
            />
          </Box>
          
          <Box display="flex" alignItems="center" mb={1.5}>
            {[1, 2, 3, 4, 5].map((star) => (
              star <= Math.floor(hostel.rating) ? 
                <StarIcon key={star} color="warning" fontSize="small" /> : 
                <StarBorderIcon key={star} fontSize="small" />
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {hostel.rating.toFixed(1)}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {expanded ? hostel.description : `${hostel.description.substring(0, 100)}...`}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={1.5}>
            <LocationIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {hostel.location}
            </Typography>
          </Box>
          
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {hostel.amenities.slice(0, 4).map((amenity) => (
              <Chip 
                key={amenity} 
                icon={amenityIcons[amenity] || <HomeIcon />} 
                label={amenity} 
                size="small"
                variant="outlined"
              />
            ))}
            {hostel.amenities.length > 4 && (
              <Chip 
                label={`+${hostel.amenities.length - 4} more`} 
                size="small"
                variant="outlined"
              />
            )}
          </Box>
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Starting from
              </Typography>
              <Typography variant="h6" color="primary">
                {Math.min(...hostel.rooms.map(r => r.price)).toLocaleString()} FCFA/year
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // Handle book now action
              }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded(!expanded)}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ display: 'none' }}>
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              ROOM TYPES & PRICES
            </Typography>
            <List dense>
              {hostel.rooms.map((room, index) => (
                <React.Fragment key={room.type}>
                  <ListItem>
                    <ListItemIcon>
                      <BedIcon color="action" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${room.type} Room`} 
                      secondary={`${room.available} available`} 
                    />
                    <Typography variant="body1" fontWeight="medium">
                      {room.price.toLocaleString()} FCFA/year
                    </Typography>
                  </ListItem>
                  {index < hostel.rooms.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
          
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              CONTACT INFORMATION
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary={hostel.contact.phone} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={hostel.contact.email} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemIcon>
                  <ClockIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Office Hours" secondary={hostel.contact.officeHours} />
              </ListItem>
            </List>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
            onClick={() => onApplyNow(hostel, room.type)}
            sx={{ mt: 2 }}
          >
            Apply Now
          </Button>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

const HostelsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const handleApplyNow = useCallback((hostel, roomType) => {
    setSelectedHostel(hostel);
    setSelectedRoomType(roomType);
    setApplicationOpen(true);
  }, []);

  const handleCloseApplication = useCallback(() => {
    setApplicationOpen(false);
    // Small delay to allow the dialog to close before resetting
    setTimeout(() => {
      setSelectedHostel(null);
      setSelectedRoomType('');
    }, 300);
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const filteredHostels = hostels.filter(hostel => 
    hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hostel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hostel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Campus Hostels
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="700px" mx="auto">
            Find your perfect home away from home. Our hostels offer comfortable living spaces, modern amenities, and a vibrant community.
          </Typography>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 6, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Looking for a place to stay?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Browse our selection of comfortable and affordable hostels. Apply now to secure your spot for the upcoming semester.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<HomeIcon />}
                href="#hostels"
              >
                View Available Hostels
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  background: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Why Choose Our Hostels?
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="24/7 Security & CCTV Surveillance" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><WifiIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="High-Speed WiFi" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><RestaurantIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Healthy Meal Plans Available" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><StudyRoomIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Dedicated Study Areas" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        
        <Box id="hostels" sx={{ mb: 6 }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" component="h2" gutterBottom={false}>
              Available Hostels
            </Typography>
            <Box width={{ xs: '100%', sm: 'auto' }} mt={{ xs: 2, sm: 0 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search hostels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setSearchQuery('')}
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="hostel categories"
          >
            <StyledTab label="All Hostels" />
            <StyledTab label="Male" />
            <StyledTab label="Female" />
            <StyledTab label="Mixed" />
            <StyledTab label="Most Popular" />
            <StyledTab label="Newest" />
          </StyledTabs>
          
          <Grid container spacing={4}>
            {filteredHostels.map((hostel) => (
              <Grid item xs={12} md={6} lg={4} key={hostel.id}>
                <HostelCard 
                  hostel={hostel} 
                  onApplyNow={handleApplyNow} 
                />
              </Grid>
            ))}
          </Grid>
          
          {filteredHostels.length === 0 && (
            <Box textAlign="center" py={8}>
              <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hostels found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We couldn't find any hostels matching your search. Try adjusting your filters.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </Box>
          )}
        </Box>
        
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Need Help Choosing?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Our housing advisors are here to help you find the perfect accommodation that fits your needs and budget.
              </Typography>
              <Stack direction="row" spacing={2} mt={3}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<PhoneIcon />}
                  href="tel:+15551234567"
                >
                  Call Us
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:housing@campus.edu"
                >
                  Email Us
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Housing Application Process
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="1. Browse Available Hostels" 
                      secondary="Check out our facilities, room types, and prices"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="2. Submit Your Application" 
                      secondary="Fill out the online application form"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="3. Receive Confirmation" 
                      secondary="Get your room assignment and move-in details"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
      
      {/* Hostel Application Dialog */}
      <HostelApplication
        open={applicationOpen}
        onClose={handleCloseApplication}
        hostel={selectedHostel}
        roomType={selectedRoomType}
      />
    </Container>
  );
};

export default HostelsPage;
