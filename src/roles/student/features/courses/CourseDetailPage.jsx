import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import CourseHeader from './components/CourseHeader';
import CourseTabs from './components/CourseTabs';

// Mock data - replace with actual API call
const fetchCourseById = async (courseId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock course data
  const mockCourses = {
    '1': {
      id: '1',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      instructor: 'Dr. Smith',
      department: 'Computer Science',
      progress: 65,
      description: 'An introductory course covering fundamental concepts of computer science and programming.',
      isFavorite: false,
      isBookmarked: false,
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      credits: 3,
    },
    // Add more mock courses as needed
  };
  
  return mockCourses[courseId] || null;
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseById(courseId);
        if (data) {
          setCourse(data);
        } else {
          setError('Course not found');
          enqueueSnackbar('Course not found', { variant: 'error' });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Failed to load course');
        enqueueSnackbar('Failed to load course', { variant: 'error' });
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, enqueueSnackbar]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6">Course not found</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <CourseHeader course={course} isMobile={isMobile} />
      <CourseTabs course={course} isMobile={isMobile} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet context={{ course }} />
      </Container>
    </Box>
  );
};

export default CourseDetailPage;
