import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Avatar,
  LinearProgress,
  TextField,
  InputAdornment,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Book as BookIcon,
  Grade as GradeIcon,
  Chat as ChatIcon,
  Note as NoteIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Layout from '@common/components/Layout';

// Sample data - Replace with actual API calls
const courseData = {
  id: 'CS101',
  title: 'Introduction to Computer Science',
  code: 'CS101',
  description: 'This course introduces the fundamental concepts of computer science and programming. Students will learn problem-solving techniques and how to design algorithms using a high-level programming language.',
  instructor: 'Dr. John Smith',
  schedule: 'Mon, Wed, Fri 10:00 AM - 11:30 AM',
  room: 'CSB 101',
  credits: 4,
  semester: 'Fall 2023',
  students: 35,
  activeStudents: 32,
  averageGrade: 85.5,
};

const assignments = [
  { id: 1, title: 'Assignment 1: Variables and Data Types', dueDate: '2023-09-15', submissions: 32, average: 87.5, status: 'graded' },
  { id: 2, title: 'Assignment 2: Control Structures', dueDate: '2023-10-01', submissions: 31, average: 82.0, status: 'graded' },
  { id: 3, title: 'Assignment 3: Functions', dueDate: '2023-10-20', submissions: 30, average: 0, status: 'submission' },
  { id: 4, title: 'Midterm Project', dueDate: '2023-11-10', submissions: 0, average: 0, status: 'upcoming' },
  { id: 5, title: 'Final Project', dueDate: '2023-12-15', submissions: 0, average: 0, status: 'upcoming' },
];

const students = Array.from({ length: 15 }, (_, i) => ({
  id: `S00${i + 1}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@university.edu`,
  attendance: Math.floor(70 + Math.random() * 30),
  grade: Math.floor(60 + Math.random() * 40),
  status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)]
}));

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [course, setCourse] = useState(courseData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCourseData = async () => {
      try {
        // In a real app, you would fetch the course data here
        // const response = await fetch(`/api/courses/${id}`);
        // const data = await response.json();
        // setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewAssignment = (assignmentId) => {
    navigate(`/staff/assignments/${assignmentId}`);
  };

  const handleViewStudent = (studentId) => {
    navigate(`/staff/students/${studentId}`);
  };

  const renderCourseInfo = () => (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {course.code} • {course.credits} Credits • {course.semester}
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/staff/courses/${id}/edit`)}
            >
              Edit Course
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <PersonIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Instructor:</Typography>
              <Typography variant="body2" ml={1}>
                {course.instructor}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <CalendarIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Schedule:</Typography>
              <Typography variant="body2" ml={1}>
                {course.schedule}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <SchoolIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Room:</Typography>
              <Typography variant="body2" ml={1}>
                {course.room}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Students
            </Typography>
            <Box display="flex" alignItems="center">
              <PeopleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4">{course.students}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Active Students
            </Typography>
            <Box display="flex" alignItems="center">
              <PeopleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h4">{course.activeStudents}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Average Grade
            </Typography>
            <Box display="flex" alignItems="center">
              <GradeIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="h4">{course.averageGrade}%</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Assignments
            </Typography>
            <Box display="flex" alignItems="center">
              <AssignmentIcon color="info" sx={{ mr: 1 }} />
              <Typography variant="h4">{assignments.length}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAssignments = () => (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Assignments</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/staff/courses/${id}/assignments/new`)}
          >
            New Assignment
          </Button>
        </Box>
        
        <List>
          {assignments.map((assignment) => (
            <React.Fragment key={assignment.id}>
              <ListItem 
                button 
                onClick={() => handleViewAssignment(assignment.id)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon color={assignment.status === 'graded' ? 'success' : 'action'} />
                </ListItemIcon>
                <ListItemText
                  primary={assignment.title}
                  secondary={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`}
                />
                <ListItemSecondaryAction>
                  <Box display="flex" alignItems="center">
                    <Chip 
                      label={
                        assignment.status === 'graded' ? 'Graded' : 
                        assignment.status === 'submission' ? 'Submission Open' : 'Upcoming'
                      }
                      color={
                        assignment.status === 'graded' ? 'success' : 
                        assignment.status === 'submission' ? 'warning' : 'default'
                      }
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <IconButton edge="end" aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderStudents = () => (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Students</Typography>
          <Box>
            <TextField
              size="small"
              placeholder="Search students..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: 250 }}
            />
            <Button startIcon={<FilterListIcon />}>Filter</Button>
          </Box>
        </Box>
        
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={students}
            columns={[
              {
                field: 'name',
                headerName: 'Name',
                flex: 1,
                renderCell: (params) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                      {params.row.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{params.row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {params.row.email}
                      </Typography>
                    </Box>
                  </Box>
                ),
              },
              {
                field: 'status',
                headerName: 'Status',
                width: 120,
                renderCell: (params) => (
                  <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'active' ? 'success' : 'default'}
                    variant="outlined"
                  />
                ),
              },
              {
                field: 'attendance',
                headerName: 'Attendance',
                width: 180,
                renderCell: (params) => (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        {params.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={params.value}
                      color={params.value > 80 ? 'success' : params.value > 60 ? 'warning' : 'error'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ),
              },
              {
                field: 'grade',
                headerName: 'Grade',
                width: 120,
                renderCell: (params) => (
                  <Chip
                    label={`${params.value}%`}
                    color={
                      params.value >= 90 ? 'success' :
                      params.value >= 80 ? 'primary' :
                      params.value >= 70 ? 'info' :
                      params.value >= 60 ? 'warning' : 'error'
                    }
                    variant="outlined"
                    size="small"
                  />
                ),
              },
              {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                width: 120,
                renderCell: (params) => (
                  <IconButton
                    size="small"
                    onClick={() => handleViewStudent(params.row.id)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <LinearProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        {renderCourseInfo()}
        {renderStats()}
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Assignments" />
          <Tab label="Students" />
          <Tab label="Grades" />
          <Tab label="Resources" />
          <Tab label="Discussions" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            {renderAssignments()}
            <Box mt={3}>
              {renderStudents()}
            </Box>
          </Box>
        )}
        {tabValue === 1 && renderAssignments()}
        {tabValue === 2 && renderStudents()}
        {tabValue === 3 && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Grades</Typography>
              <Typography color="text.secondary">
                Gradebook view and management will be available here.
              </Typography>
            </CardContent>
          </Card>
        )}
        {tabValue === 4 && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Course Resources</Typography>
              <Typography color="text.secondary">
                Course materials and resources will be available here.
              </Typography>
            </CardContent>
          </Card>
        )}
        {tabValue === 5 && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Discussions</Typography>
              <Typography color="text.secondary">
                Course discussions and announcements will be available here.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Layout>
  );
};

export default CoursePage;