import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  FileDownload as DownloadIcon,
  Upload as UploadIcon,
  Print as PrintIcon,
  Person as PersonIcon,
  Sort as SortIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Layout from '@common/components/Layout';

// Sample data - Replace with actual API calls
const courses = [
  { id: 'CS101', name: 'Introduction to Computer Science' },
  { id: 'MATH201', name: 'Calculus I' },
  { id: 'PHYS101', name: 'Physics I' },
  { id: 'ENG101', name: 'English Composition' },
];

const students = Array.from({ length: 25 }, (_, i) => ({
  id: `S${1000 + i}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@university.edu`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  status: ['active', 'inactive', 'on_leave'][Math.floor(Math.random() * 3)]
}));

const assignments = [
  { id: 'A1', title: 'Assignment 1', maxPoints: 100, weight: 0.15 },
  { id: 'A2', title: 'Assignment 2', maxPoints: 100, weight: 0.15 },
  { id: 'MT', title: 'Midterm Exam', maxPoints: 100, weight: 0.3 },
  { id: 'FP', title: 'Final Project', maxPoints: 100, weight: 0.4 },
];

// Generate random grades for each student and assignment
const generateGrades = () => {
  const grades = {};
  students.forEach(student => {
    grades[student.id] = {};
    assignments.forEach(assignment => {
      // Generate a random grade between 50 and 100
      grades[student.id][assignment.id] = Math.floor(50 + Math.random() * 50);
    });
  });
  return grades;
};

const GradesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [grades, setGrades] = useState({});
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterStatus, setFilterStatus] = useState(['active']);
  const [isExporting, setIsExporting] = useState(false);

  // Generate sample data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGrades(generateGrades());
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredStudents.map((student) => student.id);
      setSelectedStudents(newSelected);
      return;
    }
    setSelectedStudents([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedStudents, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedStudents.slice(1));
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelected = newSelected.concat(selectedStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1),
      );
    }

    setSelectedStudents(newSelected);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format) => {
    setIsExporting(true);
    // Simulate export
    setTimeout(() => {
      console.log(`Exporting grades as ${format}`);
      setIsExporting(false);
      handleMenuClose();
    }, 1500);
  };

  const handleGradeUpdate = (studentId, assignmentId, newGrade) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [assignmentId]: Math.min(100, Math.max(0, newGrade)) // Ensure grade is between 0 and 100
      }
    }));
  };

  const filteredStudents = students
    .filter(student => 
      student.status === 'active' &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (orderBy === 'grade') {
        const aGrade = calculateFinalGrade(a.id);
        const bGrade = calculateFinalGrade(b.id);
        return order === 'asc' ? aGrade - bGrade : bGrade - aGrade;
      }
      return 0;
    });

  const calculateFinalGrade = (studentId) => {
    if (!grades[studentId]) return 0;
    
    let total = 0;
    assignments.forEach(assignment => {
      const grade = grades[studentId][assignment.id] || 0;
      total += (grade / assignment.maxPoints) * assignment.weight * 100;
    });
    
    return Math.round(total * 10) / 10; // Round to 1 decimal place
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 80) return 'primary';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Gradebook
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleMenuOpen}
              disabled={isExporting}
              sx={{ mr: 1 }}
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleExport('csv')}>Export as CSV</MenuItem>
              <MenuItem onClick={() => handleExport('excel')}>Export as Excel</MenuItem>
              <MenuItem onClick={() => handleExport('pdf')}>Export as PDF</MenuItem>
            </Menu>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{ mr: 1 }}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
            >
              Print
            </Button>
          </Box>
        </Box>

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    label="Course"
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    multiple
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    input={<OutlinedInput label="Status" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {['active', 'inactive', 'on_leave'].map((status) => (
                      <MenuItem key={status} value={status}>
                        <Checkbox checked={filterStatus.indexOf(status) > -1} />
                        <ListItemText primary={status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedStudents.length > 0 &&
                        selectedStudents.length < filteredStudents.length
                      }
                      checked={
                        filteredStudents.length > 0 &&
                        selectedStudents.length === filteredStudents.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Student
                    </TableSortLabel>
                  </TableCell>
                  {assignments.map((assignment) => (
                    <TableCell key={assignment.id} align="center">
                      <Tooltip title={`${assignment.title} (${assignment.weight * 100}%)`}>
                        <Box>
                          <Box>{assignment.title}</Box>
                          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                            {assignment.maxPoints} pts
                          </Box>
                        </Box>
                      </Tooltip>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'grade'}
                      direction={orderBy === 'grade' ? order : 'desc'}
                      onClick={() => handleRequestSort('grade')}
                    >
                      Final Grade
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => {
                    const finalGrade = calculateFinalGrade(student.id);
                    const isSelected = selectedStudents.indexOf(student.id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={student.id}
                        selected={isSelected}
                        onClick={(event) => handleClick(event, student.id)}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              src={student.avatar}
                              alt={student.name}
                              sx={{ width: 32, height: 32, mr: 1 }}
                            >
                              {student.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{student.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {student.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {assignments.map((assignment) => (
                          <TableCell key={`${student.id}-${assignment.id}`} align="center">
                            <TextField
                              type="number"
                              value={grades[student.id]?.[assignment.id] || ''}
                              onChange={(e) =>
                                handleGradeUpdate(
                                  student.id,
                                  assignment.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              inputProps={{
                                min: 0,
                                max: assignment.maxPoints,
                                step: 0.5,
                                style: {
                                  textAlign: 'center',
                                  padding: '8px',
                                  width: '60px',
                                },
                              }}
                              variant="outlined"
                              size="small"
                            />
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          <Chip
                            label={`${finalGrade}% (${getGradeLetter(finalGrade)})`}
                            color={getGradeColor(finalGrade)}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {selectedStudents.length} of {filteredStudents.length} row(s) selected
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              disabled={selectedStudents.length === 0}
              sx={{ mr: 1 }}
            >
              Bulk Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              disabled={selectedStudents.length === 0}
            >
              Clear Grades
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default GradesPage;