import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, Box, Typography, Chip, IconButton, Tooltip, Paper } from '@mui/material';
import { Star as StarIcon, StarBorder as StarBorderIcon, Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material';

const CourseHeader = ({ course, isMobile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(course?.isFavorite || false);
  const [isBookmarked, setIsBookmarked] = useState(course?.isBookmarked || false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Update favorite status in the backend
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Update bookmark status in the backend
  };

  if (!course) return null;

  return (
    <Paper
      elevation={isScrolled ? 4 : 0}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: theme.palette.primary.contrastText,
        transition: 'all 0.3s ease',
        py: isScrolled ? 1 : 4,
        mb: isScrolled ? 2 : 4,
        borderRadius: 0,
      }}
    >
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'flex-start' : 'center'}
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Chip
                label={course.department}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'medium',
                }}
              />
              {!isMobile && (
                <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                  {course.code}
                </Typography>
              )}
            </Box>
            <Typography
              variant={isScrolled ? 'h6' : 'h4'}
              component="h1"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 1,
                transition: 'all 0.3s ease',
              }}
            >
              {course.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                <strong>Instructor:</strong> {course.instructor}
              </Typography>
              {!isMobile && (
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  • {course.credits} Credits • {course.startDate} - {course.endDate}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box display="flex" gap={1} alignSelf={isMobile ? 'stretch' : 'center'}>
            <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton 
                onClick={toggleFavorite}
                color="inherit"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {isFavorite ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark this course'}>
              <IconButton 
                onClick={toggleBookmark}
                color="inherit"
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this course'}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {!isScrolled && (
          <Box mt={3} sx={{ width: '100%', maxWidth: 600 }}>
            <Box 
              sx={{
                height: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                overflow: 'hidden',
                mb: 1,
              }}
            >
              <Box 
                sx={{
                  height: '100%',
                  width: `${course.progress}%`,
                  backgroundColor: 'white',
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Course Progress
              </Typography>
              <Typography variant="caption" sx={{ color: 'white', fontWeight: 'medium' }}>
                {Math.round(course.progress)}% Complete
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Paper>
  );
};

export default CourseHeader;
