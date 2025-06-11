import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
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
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Bed as BedIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as ClockIcon,
} from '@mui/icons-material';

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

interface HostelCardProps {
  hostel: {
    id: number;
    name: string;
    type: string;
    rating: number;
    price: number;
    image: string;
    description: string;
    amenities: string[];
    location: string;
    rooms: Array<{
      type: string;
      price: number;
      available: number;
    }>;
    contact: {
      phone: string;
      email: string;
      officeHours: string;
    };
  };
  onApplyNow: (hostel: any, roomType: string) => void;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel, onApplyNow }) => {
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
          {[1, 2, 3, 4, 5].map((star) =>
            star <= Math.floor(hostel.rating) ? (
              <StarIcon key={star} color="warning" fontSize="small" />
            ) : (
              <StarBorderIcon key={star} fontSize="small" />
            )
          )}
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
              icon={amenityIcons[amenity as keyof typeof amenityIcons] || <HomeIcon />} 
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
            onClick={() => onApplyNow(hostel, hostel.rooms[0].type)}
          >
            Apply Now
          </Button>
        </Box>
      </CardContent>
      
      <Divider />
      
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>View Room Details</Typography>
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
                    <Button 
                      variant="outlined" 
                      size="small" 
                      sx={{ ml: 2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyNow(hostel, room.type);
                      }}
                    >
                      Apply
                    </Button>
                  </ListItem>
                  {index < hostel.rooms.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
          
          <Box>
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
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default HostelCard;
