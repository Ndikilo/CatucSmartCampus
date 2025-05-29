// WelcomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  Share,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  // <-- import useNavigate
import logo from '../../assets/logo.png';

const newsData = [
  {
    id: 1,
    title: 'CATUC Graduation Ceremony 2024',
    content: 'Join us to celebrate our graduating students.',
    image: 'https://source.unsplash.com/featured/?graduation',
  },
  {
    id: 2,
    title: 'New Library Resources Available',
    content: 'Explore the latest digital and print materials.',
    image: 'https://source.unsplash.com/featured/?library',
  },
  {
    id: 3,
    title: 'Upcoming Tech Symposium',
    content: 'Discover innovations at the IT Lab conference.',
    image: 'https://source.unsplash.com/featured/?technology',
  },
  {
    id: 4,
    title: 'Finance Portal Updates',
    content: 'Track fees and scholarships more easily.',
    image: 'https://source.unsplash.com/featured/?finance',
  },
];

const NewsCard = ({ news, liked, onLike, onShare }) => (
  <Card
    sx={{
      width: 280,
      flexShrink: 0,
      m: 1,
      scrollSnapAlign: 'center',
      borderRadius: 3,
      boxShadow: 3,
      transition: 'all 0.3s ease-in-out',
      '&:hover': { boxShadow: 6 },
    }}
  >
    <CardMedia component="img" height="160" image={news.image} alt={news.title} />
    <CardContent>
      <Typography gutterBottom variant="h6" fontWeight={600}>
        {news.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {news.content}
      </Typography>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Tooltip title={liked ? 'Unlike' : 'Like'}>
          <IconButton onClick={onLike}>
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton onClick={onShare}>
            <Share />
          </IconButton>
        </Tooltip>
      </Box>
    </CardContent>
  </Card>
);

const WelcomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState({});
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();  // <-- initialize navigate

  const handleLike = (id) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (title) => {
    const url = window.location.href + `#${title.replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(url);
    alert(`Link to "${title}" copied to clipboard!`);
  };

  const filteredNews = newsData
    .filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 4);

  useEffect(() => {
    const container = scrollRef.current;
    const handleWheel = (e) => {
      if (container) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY < 0 ? -300 : 300 });
      }
    };
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Map quick links to routes - ensure these match the routes in App.jsx
  const quickLinkRoutes = {
    Library: '/library',
    Finance: '/finance',
    Academics: '/academics',
    'IT Lab': '/it-lab',
    Exams: '/exams',
    Admissions: '/admissions',
    Events: '/events',
    'Help & Support': '/help-support',
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" px={4} py={2} boxShadow={1} bgcolor="#fafafa">
        <Box display="flex" alignItems="center">
          <img src={logo} alt="CATUC Logo" style={{ height: 50, marginRight: 12 }} />
          <Typography variant="h6" fontWeight={700}>SmartCampus</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1, px: 3, py: 1, borderRadius: '999px', fontWeight: 600 }}
            onClick={() => navigate('/auth/login')} // <-- navigate to login
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ px: 3, py: 1, borderRadius: '999px', fontWeight: 600 }}
            onClick={() => navigate('/auth/signup')} // <-- navigate to signup
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box textAlign="center" mt={6} px={2}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          CATUC SmartCampus
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: { borderRadius: 999 },
          }}
          sx={{
            width: '90%',
            maxWidth: 600,
            mt: 3,
            bgcolor: '#fff',
            borderRadius: 999,
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 999,
            },
          }}
        />
      </Box>

      {/* Quick Links */}
      <Box
        mt={6}
        px={3}
        sx={{
          display: 'flex',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          overflowX: isMobile ? 'auto' : 'visible',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: 2,
        }}
      >
        {Object.entries(quickLinkRoutes).map(([label, route]) => (
          <Box
            key={label}
            sx={{
              minWidth: 110,
              height: 100,
              bgcolor: '#f5f5f5',
              borderRadius: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 1,
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: '#e0e0e0',
                boxShadow: 3,
              },
            }}
            onClick={() => navigate(route)} // <-- navigate on click
          >
            <Typography fontSize="1.8rem">
              {
                {
                  Library: '📚',
                  Finance: '💰',
                  Academics: '🎓',
                  'IT Lab': '🖥️',
                  Exams: '📝',
                  Admissions: '🏫',
                  Events: '📅',
                  'Help & Support': '🛠️',
                }[label]
              }
            </Typography>
            <Typography variant="subtitle2" mt={1}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* News Carousel */}
      <Box display="flex" justifyContent="center" mt={7} px={2}>
        <Box position="relative" width="100%" maxWidth="1200px">
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              zIndex: 2,
              bgcolor: 'white',
              borderRadius: '50%',
              boxShadow: 2,
              transform: 'translateY(-50%)',
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              whiteSpace: 'nowrap',
              pb: 2,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ccc',
                borderRadius: 3,
              },
            }}
          >
            {filteredNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                liked={likedItems[news.id]}
                onLike={() => handleLike(news.id)}
                onShare={() => handleShare(news.title)}
              />
            ))}
          </Box>

          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              zIndex: 2,
              bgcolor: 'white',
              borderRadius: '50%',
              boxShadow: 2,
              transform: 'translateY(-50%)',
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
