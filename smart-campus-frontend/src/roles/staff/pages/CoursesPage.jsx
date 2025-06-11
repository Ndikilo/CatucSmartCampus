// src/roles/staff/pages/CoursesPage.jsx
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  People as PeopleIcon,
  Class as ClassIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../common/components/Layout';

// Sample course data
const courses = [
  {
    id: 'CS101',
    title: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 4,
    students: 45,
    status: 'Active',
    semester: 'Fall 2023',
    instructor: 'Dr. Smith',
    schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
    description: 'Fundamental concepts of computer science and programming.'
  },
  {
    id: 'MATH201',
    title: 'Calculus II',
    code: 'MATH201',
    credits: 3,
    students: 32,
    status: 'Active',
    semester: 'Fall 2023',
    instructor: 'Dr. Johnson',
    schedule: 'Tue/Thu 1:00 PM - 2:30 PM',
    description: 'Advanced topics in integral calculus and series.'
  },
  {
    id: 'PHYS101',
    title: 'Physics for Engineers',
    code: 'PHYS101',
    credits: 4,
    students: 28,
    status: 'Active',
    semester: 'Fall 2023',
    instructor: 'Dr. Williams',
    schedule: 'Mon/Wed/Fri 9:00 AM - 10:00 AM',
    description: 'Fundamental principles of physics with engineering applications.'
  },
  {
    id: 'ENG105',
    title: 'Academic Writing',
    code: 'ENG105',
    credits: 3,
    students: 25,
    status: 'Upcoming',
    semester: 'Spring 2024',
    instructor: 'Prof. Davis',
    schedule: 'Tue/Thu 11:00 AM - 12:30 PM',
    description: 'Develop academic writing and research skills.'
  },
  {
    id: 'CS201',
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    credits: 4,
    students: 38,
    status: 'Active',
    semester: 'Fall 2023',
    instructor: 'Dr. Anderson',
    schedule: 'Mon/Wed 2:00 PM - 3:30 PM',
    description: 'Advanced data structures and algorithm analysis.'
  },
];

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSemesterFilterChange = (event) => {
    setSemesterFilter(event.target.value);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesSemester = semesterFilter === 'all' || course.semester === semesterFilter;
    
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const handleViewCourse = (courseId) => {
    navigate(`/staff/courses/${courseId}`);
  };

  const handleEditCourse = (courseId) => {
    // Handle edit course
    console.log('Edit course:', courseId);
  };

  const handleDeleteCourse = (courseId) => {
    // Handle delete course
    console.log('Delete course:', courseId);
  };

  // Get unique semesters for filter
  const semesters = [...new Set(courses.map(course => course.semester))];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h4" gutterBottom>Course Management</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage and organize your courses
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {}}
            >
              Create Course
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Semester</InputLabel>
                <Select
                  value={semesterFilter}
                  onChange={handleSemesterFilterChange}
                  label="Semester"
                >
                  <MenuItem value="all">All Semesters</MenuItem>
                  {semesters.map((semester) => (
                    <MenuItem key={semester} value={semester}>
                      {semester}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => {}}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Courses Grid */}
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleViewCourse(course.id)}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <ClassIcon color="primary" sx={{ mr: 1 }} />
                        <Typography 
                          variant="h6" 
                          component="div"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '3em'
                          }}
                        >
                          {course.title}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {course.code} • {course.credits} Credits
                      </Typography>
                    </Box>
                    <Chip 
                      label={course.status} 
                      size="small" 
                      color={course.status === 'Active' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '4.5em',
                    mb: 2
                  }}>
                    {course.description}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Grid container spacing={1} mb={1}>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <PeopleIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {course.students} Students
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <ScheduleIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {course.schedule}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <StarIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {course.instructor}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{ p: 1.5, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title="View Details">
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCourse(course.id);
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Course">
                    <IconButton 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCourse(course.id);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Course">
                    <IconButton 
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredCourses.length === 0 && (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" color="text.secondary">
              No courses found matching your criteria
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSemesterFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default CoursesPage;