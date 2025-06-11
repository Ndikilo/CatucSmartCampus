// src/roles/staff/pages/AttendancePage.jsx
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Help as HelpIcon,
  Event as EventIcon,
  Class as ClassIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Layout from '../../../common/components/Layout';

// Sample data
const classes = [
  { id: 'CS101', name: 'Introduction to Computer Science' },
  { id: 'MATH201', name: 'Calculus II' },
  { id: 'PHYS101', name: 'Physics for Engineers' },
  { id: 'ENG105', name: 'Academic Writing' },
];

const students = Array.from({ length: 15 }, (_, i) => ({
  id: `STU${1000 + i}`,
  name: `Student ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  status: ['Present', 'Absent', 'Late', 'Excused'][Math.floor(Math.random() * 4)],
  lastAttendance: new Date(2023, 5, 15 - (i % 10)),
  attendanceRate: Math.floor(70 + Math.random() * 30)
}));

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState(students);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceRecords(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus } 
          : student
      )
    );
  };

  const handleSaveAttendance = () => {
    // Save attendance logic here
    console.log('Saving attendance:', {
      class: selectedClass,
      date: selectedDate,
      records: attendanceRecords
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'success';
      case 'Late': return 'warning';
      case 'Absent': return 'error';
      case 'Excused': return 'info';
      default: return 'default';
    }
  };

  const filteredStudents = attendanceRecords.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Attendance Management</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track and manage student attendance
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={handleClassChange}
                  label="Select Class"
                  startAdornment={
                    <ClassIcon color="action" sx={{ mr: 1 }} />
                  }
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      InputProps: {
                        startAdornment: <CalendarIcon color="action" sx={{ mr: 1 }} />
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSaveAttendance}
                disabled={!selectedClass}
              >
                Save Attendance
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Attendance Summary */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'success.light', color: 'success.contrastText', mr: 2 }}>
                    <CheckCircleIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Present</Typography>
                    <Typography variant="h4">
                      {attendanceRecords.filter(s => s.status === 'Present').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.contrastText', mr: 2 }}>
                    <EventIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Late</Typography>
                    <Typography variant="h4">
                      {attendanceRecords.filter(s => s.status === 'Late').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'error.light', color: 'error.contrastText', mr: 2 }}>
                    <CancelIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Absent</Typography>
                    <Typography variant="h4">
                      {attendanceRecords.filter(s => s.status === 'Absent').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: 'info.light', color: 'info.contrastText', mr: 2 }}>
                    <HelpIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Excused</Typography>
                    <Typography variant="h4">
                      {attendanceRecords.filter(s => s.status === 'Excused').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Attendance Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Last Attendance</TableCell>
                  <TableCell>Attendance Rate</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={student.avatar} sx={{ mr: 2 }} />
                        <Typography variant="body2">{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      {student.lastAttendance.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box width={60} mr={1}>
                          <Box 
                            width={`${student.attendanceRate}%`} 
                            height={8} 
                            bgcolor="primary.main" 
                            borderRadius={4}
                          />
                        </Box>
                        <Typography variant="body2">
                          {student.attendanceRate}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={student.status}
                        color={getStatusColor(student.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <Tooltip title="Mark as Present">
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleStatusChange(student.id, 'Present')}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark as Late">
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleStatusChange(student.id, 'Late')}
                          >
                            <EventIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark as Absent">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark as Excused">
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleStatusChange(student.id, 'Excused')}
                          >
                            <HelpIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
};

export default AttendancePage;