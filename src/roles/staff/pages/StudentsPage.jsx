import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Sample data - replace with actual API calls
const generateStudentData = (count = 50) => {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'William', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
  const programs = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law', 'Arts', 'Science'];
  const statuses = ['Active', 'Inactive', 'Suspended', 'Graduated', 'On Leave'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `STU${1000 + i}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `student${i + 1}@university.edu`,
    phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    program: programs[Math.floor(Math.random() * programs.length)],
    year: Math.floor(Math.random() * 4) + 1,
    gpa: (Math.random() * 2 + 2).toFixed(2),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    admissionDate: new Date(Date.now() - Math.floor(Math.random() * 3) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('view'); // 'view', 'edit', 'delete'

  // Load sample data on component mount
  useEffect(() => {
    const data = generateStudentData();
    setStudents(data);
    setFilteredStudents(data);
  }, []);

  // Apply filters whenever filters or search term changes
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.firstName.toLowerCase().includes(term) ||
        student.lastName.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.id.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(student => student.status === statusFilter);
    }
    
    // Apply program filter
    if (programFilter !== 'All') {
      result = result.filter(student => student.program === programFilter);
    }
    
    // Apply year filter
    if (yearFilter !== 'All') {
      result = result.filter(student => student.year.toString() === yearFilter);
    }
    
    setFilteredStudents(result);
    setPage(0); // Reset to first page when filters change
  }, [searchTerm, statusFilter, programFilter, yearFilter, students]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleProgramFilterChange = (event) => {
    setProgramFilter(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setProgramFilter('All');
    setYearFilter('All');
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setDialogType('view');
    setOpenDialog(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setDialogType('edit');
    setOpenDialog(true);
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setDialogType('delete');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'warning';
      case 'Suspended':
        return 'error';
      case 'Graduated':
        return 'info';
      case 'On Leave':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircleIcon fontSize="small" />;
      case 'Inactive':
        return <WarningIcon fontSize="small" color="warning" />;
      case 'Suspended':
        return <ErrorIcon fontSize="small" color="error" />;
      case 'Graduated':
        return <SchoolIcon fontSize="small" color="info" />;
      case 'On Leave':
        return <InfoIcon fontSize="small" color="action" />;
      default:
        return null;
    }
  };

  // Get unique programs for filter dropdown
  const programs = ['All', ...new Set(students.map(student => student.program))];
  const statuses = ['All', ...new Set(students.map(student => student.status))];
  const years = ['All', ...new Set(students.map(student => student.year.toString()))].sort();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Students</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PersonAddIcon />}
        >
          Add New Student
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Filters" 
          avatar={<FilterListIcon />} 
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Program</InputLabel>
                <Select
                  value={programFilter}
                  onChange={handleProgramFilterChange}
                  label="Program"
                >
                  {programs.map((program) => (
                    <MenuItem key={program} value={program}>
                      {program}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={yearFilter}
                  onChange={handleYearFilterChange}
                  label="Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={handleResetFilters}
                fullWidth
                size="small"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="students table">
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Program</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>GPA</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow hover key={student.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">
                              {student.firstName} {student.lastName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {student.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>Year {student.year}</TableCell>
                      <TableCell>
                        <Chip 
                          label={student.gpa} 
                          size="small"
                          color={student.gpa >= 3.5 ? 'success' : student.gpa >= 2.5 ? 'primary' : 'default'}
                          variant={student.gpa >= 2.0 ? 'filled' : 'outlined'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(student.status)}
                          label={student.status}
                          size="small"
                          color={getStatusColor(student.status)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewStudent(student)}
                            color="primary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditStudent(student)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteStudent(student)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                      No students found matching your criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Student Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedStudent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {selectedStudent.firstName.charAt(0)}{selectedStudent.lastName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedStudent.id}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedStudent.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedStudent.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Program</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedStudent.program}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Year</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Year {selectedStudent.year}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">GPA</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedStudent.gpa}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Status</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={getStatusIcon(selectedStudent.status)}
                      label={selectedStudent.status}
                      size="small"
                      color={getStatusColor(selectedStudent.status)}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Admission Date</Typography>
                  <Typography variant="body1">
                    {new Date(selectedStudent.admissionDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  handleCloseDialog();
                  handleEditStudent(selectedStudent);
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default StudentsPage;