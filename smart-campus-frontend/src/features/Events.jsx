import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box, 
  Divider,
  Tabs,
  Tab,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { 
  Event as EventIcon, 
  CalendarMonth, 
  LocationOn, 
  AccessTime, 
  Search,
  FilterList,
  Share,
  Bookmark,
  BookmarkBorder,
  Category,
  Person,
  Group,
  School,
  SportsSoccer,
  MusicNote,
  Science,
  Computer,
  EmojiEvents
} from '@mui/icons-material';
import { format } from 'date-fns';

// Sample event categories
const categories = [
  { id: 'all', label: 'All Events', icon: <EventIcon /> },
  { id: 'academic', label: 'Academic', icon: <School /> },
  { id: 'sports', label: 'Sports', icon: <SportsSoccer /> },
  { id: 'music', label: 'Music', icon: <MusicNote /> },
  { id: 'science', label: 'Science & Tech', icon: <Science /> },
  { id: 'workshop', label: 'Workshops', icon: <Computer /> },
  { id: 'awards', label: 'Award Ceremonies', icon: <EmojiEvents /> },
];

// Sample events data
const allEvents = [
  {
    id: 1,
    title: 'Annual Science Symposium',
    date: '2025-04-15T09:00:00',
    endDate: '2025-04-17T17:00:00',
    location: 'Main Auditorium',
    description: 'Join us for the biggest science event of the year featuring keynote speakers, paper presentations, and interactive workshops.',
    image: 'https://source.unsplash.com/random/800x400/?science,conference',
    category: 'academic',
    featured: true,
    capacity: 250,
    registered: 187,
    price: 0,
    organizer: 'Science Department',
    tags: ['Science', 'Research', 'Workshop']
  },
  {
    id: 2,
    title: 'Inter-University Football Finals',
    date: '2025-04-20T15:00:00',
    endDate: '2025-04-20T18:00:00',
    location: 'University Stadium',
    description: 'Cheer for your university team as they compete in the championship finals!',
    image: 'https://source.unsplash.com/random/800x400/?football,stadium',
    category: 'sports',
    featured: true,
    capacity: 5000,
    registered: 0,
    price: 5,
    organizer: 'Sports Committee',
    tags: ['Sports', 'Championship', 'Football']
  },
  {
    id: 3,
    title: 'Spring Music Festival',
    date: '2025-05-05T18:00:00',
    endDate: '2025-05-05T23:00:00',
    location: 'Central Lawn',
    description: 'A night of music, food, and fun featuring performances by student bands and special guests.',
    image: 'https://source.unsplash.com/random/800x400/?music,festival',
    category: 'music',
    featured: true,
    capacity: 1000,
    registered: 0,
    price: 10,
    organizer: 'Music Society',
    tags: ['Music', 'Festival', 'Live Performance']
  },
  {
    id: 4,
    title: 'Tech Workshop: AI & Machine Learning',
    date: '2025-05-12T10:00:00',
    endDate: '2025-05-12T16:00:00',
    location: 'Computer Lab 3',
    description: 'Hands-on workshop on the fundamentals of AI and machine learning. No prior experience required.',
    image: 'https://source.unsplash.com/random/800x400/?ai,machine-learning',
    category: 'workshop',
    featured: false,
    capacity: 30,
    registered: 28,
    price: 25,
    organizer: 'Computer Science Department',
    tags: ['Workshop', 'AI', 'Machine Learning', 'Coding']
  },
  {
    id: 5,
    title: 'Annual Research Awards',
    date: '2025-05-25T18:30:00',
    endDate: '2025-05-25T21:30:00',
    location: 'Grand Ballroom',
    description: 'Celebrating outstanding research contributions by faculty and students across all departments.',
    image: 'https://source.unsplash.com/random/800x400/?award,ceremony',
    category: 'awards',
    featured: true,
    capacity: 300,
    registered: 0,
    price: 0,
    organizer: 'Research Office',
    tags: ['Awards', 'Research', 'Recognition']
  },
  {
    id: 6,
    title: 'Environmental Science Seminar',
    date: '2025-06-05T14:00:00',
    endDate: '2025-06-05T16:00:00',
    location: 'Science Building, Room 205',
    description: 'Exploring sustainable solutions for environmental challenges. Open to all students and faculty.',
    image: 'https://source.unsplash.com/random/800x400/?environment,science',
    category: 'academic',
    featured: false,
    capacity: 80,
    registered: 45,
    price: 0,
    organizer: 'Environmental Science Department',
    tags: ['Seminar', 'Environment', 'Sustainability']
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleBookmark = (eventId) => {
    const newBookmarks = new Set(bookmarkedEvents);
    if (newBookmarks.has(eventId)) {
      newBookmarks.delete(eventId);
    } else {
      newBookmarks.add(eventId);
    }
    setBookmarkedEvents(newBookmarks);
  };

  // Filter events based on category, search query, and date
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = activeTab === 'all' || event.category === activeTab;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const isUpcoming = !upcomingOnly || new Date(event.date) >= new Date();
    
    return matchesCategory && matchesSearch && isUpcoming;
  });

  // Group events by date
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(eventsByDate).sort();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Campus Events
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          Discover and participate in exciting events happening across campus. Filter by category or search for specific events.
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant={upcomingOnly ? 'contained' : 'outlined'}
              onClick={() => setUpcomingOnly(!upcomingOnly)}
              startIcon={<CalendarMonth />}
              sx={{ mr: 2 }}
            >
              {upcomingOnly ? 'Upcoming Only' : 'Show All'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, overflowX: 'auto' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="event categories"
        >
          {categories.map((category) => (
            <Tab 
              key={category.id} 
              value={category.id}
              icon={category.icon}
              iconPosition="start"
              label={category.label}
              sx={{ minHeight: 64 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Events List */}
      <Box>
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <Box key={date} mb={6}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                {formatDate(date)}
              </Typography>
              <Grid container spacing={3}>
                {eventsByDate[date].map((event) => (
                  <Grid item xs={12} key={event.id}>
                    <Card sx={{ display: 'flex', height: '100%' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                        image={event.image}
                        alt={event.title}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box>
                              <Typography component="div" variant="h6" noWrap>
                                {event.title}
                                {event.featured && (
                                  <Chip 
                                    label="Featured" 
                                    color="primary" 
                                    size="small" 
                                    sx={{ ml: 1, mb: 0.5 }} 
                                  />
                                )}
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1} mb={1.5} flexWrap="wrap" gap={1}>
                                <Chip 
                                  icon={<AccessTime fontSize="small" />} 
                                  label={`${formatTime(event.date)} - ${formatTime(event.endDate)}`} 
                                  size="small" 
                                  variant="outlined"
                                />
                                <Chip 
                                  icon={<LocationOn fontSize="small" />} 
                                  label={event.location} 
                                  size="small" 
                                  variant="outlined"
                                />
                                <Chip 
                                  icon={<Group fontSize="small" />} 
                                  label={`${event.registered}/${event.capacity} registered`} 
                                  size="small" 
                                  variant="outlined"
                                  color={event.registered >= event.capacity ? 'error' : 'default'}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {event.description}
                              </Typography>
                              <Box display="flex" flexWrap="wrap" gap={1} mt={1.5}>
                                {event.tags.map((tag, idx) => (
                                  <Chip key={idx} label={tag} size="small" />
                                ))}
                              </Box>
                            </Box>
                            <Box>
                              <IconButton 
                                aria-label={bookmarkedEvents.has(event.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                                onClick={() => toggleBookmark(event.id)}
                                color={bookmarkedEvents.has(event.id) ? 'primary' : 'default'}
                              >
                                {bookmarkedEvents.has(event.id) ? <Bookmark /> : <BookmarkBorder />}
                              </IconButton>
                              <IconButton aria-label="share">
                                <Share />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pt: 0, mt: 'auto' }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                                <Person />
                              </Avatar>
                              <Typography variant="body2" color="text.secondary">
                                {event.organizer}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <Button 
                              variant="contained" 
                              color="primary"
                              size="small"
                              disabled={event.registered >= event.capacity}
                            >
                              {event.price > 0 ? `$${event.price} - Register` : 'Register Now'}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <EventIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No events found matching your criteria
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
                setUpcomingOnly(true);
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Events;
