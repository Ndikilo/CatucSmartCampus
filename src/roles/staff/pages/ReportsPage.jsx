import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Download as DownloadIcon,
  FilterAlt as FilterIcon,
  Refresh as RefreshIcon,
  Print as PrintIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

// Sample data - replace with actual API calls
const generateReportData = () => {
  const reportTypes = ['Attendance', 'Grades', 'Performance', 'Financial', 'Library'];
  const statuses = ['Completed', 'Processing', 'Failed'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `${reportTypes[i % reportTypes.length]} Report ${i + 1}`,
    type: reportTypes[i % reportTypes.length],
    generatedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    records: Math.floor(Math.random() * 1000) + 100,
  }));
};

const ReportsPage = () => {
  const [reportType, setReportType] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const reports = generateReportData();
  
  const filteredReports = reports.filter(report => {
    const matchesType = !reportType || report.type === reportType;
    const matchesStatus = !statusFilter || report.status === statusFilter;
    const matchesDate = !dateRange.start || 
      (new Date(report.generatedDate) >= new Date(dateRange.start) && 
       (!dateRange.end || new Date(report.generatedDate) <= new Date(dateRange.end)));
    
    return matchesType && matchesStatus && matchesDate;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (field) => (event) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value,
    });
    setPage(0);
  };

  const handleResetFilters = () => {
    setReportType('');
    setStatusFilter('');
    setDateRange({ start: '', end: '' });
  };

  const handleDownloadReport = (reportId) => {
    // Implement download functionality
    console.log(`Downloading report ${reportId}`);
  };

  const handleViewReport = (reportId) => {
    // Implement view report functionality
    console.log(`Viewing report ${reportId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <Button variant="contained" color="primary" startIcon={<DownloadIcon />}>
          Generate New Report
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <FilterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Filters
          </Typography>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="report-type-label">Report Type</InputLabel>
                <Select
                  labelId="report-type-label"
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Attendance">Attendance</MenuItem>
                  <MenuItem value="Grades">Grades</MenuItem>
                  <MenuItem value="Performance">Performance</MenuItem>
                  <MenuItem value="Financial">Financial</MenuItem>
                  <MenuItem value="Library">Library</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Start Date"
                type="date"
                value={dateRange.start}
                onChange={handleDateChange('start')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="End Date"
                type="date"
                value={dateRange.end}
                onChange={handleDateChange('end')}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!dateRange.start}
              />
            </Grid>
            <Grid item xs={12} md={1} sx={{ textAlign: 'right' }}>
              <Button 
                variant="outlined" 
                onClick={handleResetFilters}
                size="small"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="reports table">
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Generated Date</TableCell>
                <TableCell>Records</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report) => (
                  <TableRow hover key={report.id}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{report.records.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          p: '4px 8px',
                          borderRadius: 1,
                          bgcolor: 
                            report.status === 'Completed' ? 'success.light' :
                            report.status === 'Processing' ? 'warning.light' : 'error.light',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'medium',
                        }}
                      >
                        {report.status}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Report">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewReport(report.id)}
                          color="primary"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton 
                          size="small" 
                          onClick={() => handleDownloadReport(report.id)}
                          color="primary"
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Print">
                        <IconButton size="small" color="primary">
                          <PrintIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                      No reports found matching your criteria
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
          count={filteredReports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ReportsPage;