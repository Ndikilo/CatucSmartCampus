import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon, Class as ClassIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
   
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCourses = [
          {
            id: '1',
            code: 'CS101',
            title: 'Introduction to Computer Science',
            instructor: 'Dr. Smith',
            progress: 65,
            department: 'Computer Science',
            thumbnail: 'https://via.placeholder.com/300x150?text=CS101',
          },
          {
            id: '2',
            code: 'MATH201',
            title: 'Linear Algebra',
            instructor: 'Prof. Johnson',
            progress: 30,
            department: 'Mathematics',
            thumbnail: 'https://via.placeholder.com/300x150?text=MATH201',
          },
          // Add more mock courses as needed
        ];
        
        setCourses(mockCourses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Courses
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 600, mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredCourses.length === 0 ? (
        <Box textAlign="center" py={8}>
          <ClassIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No courses found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {searchTerm ? 'Try a different search term' : 'You are not enrolled in any courses yet'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardActionArea 
                  onClick={() => handleCourseClick(course.id)}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.thumbnail}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6" component="h2" noWrap>
                        {course.code}
                      </Typography>
                      <Chip 
                        label={course.department} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.instructor}
                    </Typography>
                    <Box mt="auto">
                      <Box display="flex" alignItems="center" mb={1}>
                        <Box width="100%" mr={1}>
                          <Box 
                            sx={{
                              height: 8,
                              backgroundColor: 'divider',
                              borderRadius: 4,
                              overflow: 'hidden',
                            }}
                          >
                            <Box 
                              sx={{
                                height: '100%',
                                width: `${course.progress}%`,
                                backgroundColor: 'primary.main',
                                transition: 'width 0.3s ease',
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {Math.round(course.progress)}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CoursesPage;
