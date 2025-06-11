import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  Class as ClassIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import Layout from '@common/components/Layout';

// Sample data
const courses = [
  { id: 'CS101', name: 'Introduction to Computer Science' },
  { id: 'MATH201', name: 'Calculus II' },
  { id: 'PHYS101', name: 'Physics for Engineers' },
  { id: 'ENG105', name: 'Academic Writing' },
];

const assignments = Array.from({ length: 15 }, (_, i) => ({
  id: `A${1000 + i}`,
  title: `Assignment ${i + 1}`,
  course: courses[i % courses.length],
  dueDate: new Date(2023, 5, 15 + (i % 10)),
  totalPoints: 100,
  submissions: Math.floor(Math.random() * 30),
  status: ['draft', 'published', 'graded'][Math.floor(Math.random() * 3)],
  description: `This is a detailed description for Assignment ${i + 1}. Students should complete all the questions and submit before the due date.`
}));

const AssignmentsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAssignment(null);
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || assignment.course.id === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const getStatusChip = (status) => {
    switch (status) {
      case 'published':
        return <Chip icon={<CheckCircleIcon />} label="Published" color="success" size="small" />;
      case 'draft':
        return <Chip icon={<PendingIcon />} label="Draft" color="warning" size="small" />;
      case 'graded':
        return <Chip icon={<CheckCircleIcon />} label="Graded" color="info" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Assignments</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create and manage assignments for your courses
          </Typography>
        </Box>


        {/* Filters and Actions */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                label="Search assignments..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  label="Filter by Course"
                  startAdornment={
                    <ClassIcon color="action" sx={{ mr: 1 }} />
                  }
                >
                  <MenuItem value="all">All Courses</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} ({course.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {}}
              >
                New Assignment
              </Button>
            </Grid>
          </Grid>
        </Paper>


        {/* Assignments Table */}
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Submissions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAssignments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((assignment) => (
                    <TableRow key={assignment.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <AssignmentIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">{assignment.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={`${assignment.course.id} - ${assignment.course.name}`}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <CalendarIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {format(new Date(assignment.dueDate), 'MMM d, yyyy')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <PeopleIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {assignment.submissions} / 30
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(assignment.status)}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton onClick={() => handleViewAssignment(assignment)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAssignments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Assignment Details Dialog */}
        {selectedAssignment && (
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{selectedAssignment.title}</Typography>
                <IconButton onClick={handleCloseDialog} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>Description</Typography>
                  <Typography variant="body1" paragraph>{selectedAssignment.description}</Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>Instructions</Typography>
                  <Typography variant="body1" paragraph>
                    Please complete all questions and submit your work before the due date. 
                    Late submissions will be penalized according to the course policy.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Assignment Details
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      
                      <Box mb={2}>
                        <Typography variant="caption" color="text.secondary" display="block">Course</Typography>
                        <Typography variant="body2">
                          {selectedAssignment.course.name} ({selectedAssignment.course.id})
                        </Typography>
                      </Box>
                      
                      <Box mb={2}>
                        <Typography variant="caption" color="text.secondary" display="block">Due Date</Typography>
                        <Box display="flex" alignItems="center">
                          <CalendarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {format(new Date(selectedAssignment.dueDate), 'EEEE, MMMM d, yyyy')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box mb={2}>
                        <Typography variant="caption" color="text.secondary" display="block">Points</Typography>
                        <Typography variant="body2">{selectedAssignment.totalPoints} points</Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Status</Typography>
                        {getStatusChip(selectedAssignment.status)}
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DescriptionIcon />}
                    sx={{ mb: 1 }}
                  >
                    Download Assignment
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SchoolIcon />}
                  >
                    View Submissions ({selectedAssignment.submissions})
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">Edit Assignment</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Layout>
  );
};

export default AssignmentsPage;