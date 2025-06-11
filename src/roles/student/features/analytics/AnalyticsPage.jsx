import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  LinearProgress, 
  useMediaQuery, 
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
} from '@mui/material';
import { 
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TableChart as TableChartIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';

// Mock data for the analytics
const mockPerformanceData = {
  overallAverage: 78.5,
  trend: 'up', // 'up', 'down', or 'neutral'
  trendPercentage: 5.2,
  completedCourses: 12,
  inProgressCourses: 4,
  totalHoursSpent: 156,
  weeklyStudyTime: [
    { name: 'Mon', hours: 3.5 },
    { name: 'Tue', hours: 4.2 },
    { name: 'Wed', hours: 2.8 },
    { name: 'Thu', hours: 5.1 },
    { name: 'Fri', hours: 3.9 },
    { name: 'Sat', hours: 2.5 },
    { name: 'Sun', hours: 1.8 },
  ],
  coursePerformance: [
    { name: 'Mathematics', grade: 85, trend: 'up', assignments: 12, completed: 10 },
    { name: 'Science', grade: 78, trend: 'up', assignments: 8, completed: 7 },
    { name: 'History', grade: 92, trend: 'neutral', assignments: 6, completed: 6 },
    { name: 'English', grade: 68, trend: 'down', assignments: 10, completed: 7 },
    { name: 'Computer Science', grade: 88, trend: 'up', assignments: 15, completed: 12 },
  ],
  gradeDistribution: [
    { name: 'A (90-100%)', value: 25 },
    { name: 'B (80-89%)', value: 35 },
    { name: 'C (70-79%)', value: 25 },
    { name: 'D (60-69%)', value: 10 },
    { name: 'F (Below 60%)', value: 5 },
  ],
  subjectPerformance: [
    { subject: 'Mathematics', score: 85, fullMark: 100 },
    { subject: 'Science', score: 78, fullMark: 100 },
    { subject: 'History', score: 92, fullMark: 100 },
    { subject: 'English', score: 68, fullMark: 100 },
    { subject: 'Computer Science', score: 88, fullMark: 100 },
  ],
  recentActivities: [
    { id: 1, type: 'assignment', title: 'Submitted Math Assignment #5', time: '2 hours ago', status: 'submitted' },
    { id: 2, type: 'quiz', title: 'Completed Science Quiz', time: '1 day ago', status: 'graded' },
    { id: 3, type: 'exam', title: 'Upcoming History Midterm', time: '3 days from now', status: 'upcoming' },
    { id: 4, type: 'assignment', title: 'English Essay Draft', time: '2 days ago', status: 'graded' },
    { id: 5, type: 'project', title: 'Computer Science Project Milestone', time: '1 week from now', status: 'in-progress' },
  ],
  studyStreak: 14,
  weeklyGoals: {
    completed: 8,
    total: 10,
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  const open = Boolean(anchorEl);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  
  const handleCourseFilterChange = (event) => {
    setSelectedCourse(event.target.value);
  };
  
  const filteredCourses = useMemo(() => {
    if (selectedCourse === 'all') return mockPerformanceData.coursePerformance;
    return mockPerformanceData.coursePerformance.filter(course => 
      course.name.toLowerCase() === selectedCourse.toLowerCase()
    );
  }, [selectedCourse]);
  
  const renderOverviewTab = () => (
    <Box>
      {/* Performance Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Overall Average
                </Typography>
                <Box display="flex" alignItems="flex-end" gap={1} mt={0.5}>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {mockPerformanceData.overallAverage}%
                  </Typography>
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    color={mockPerformanceData.trend === 'up' ? 'success.main' : 'error.main'}
                    mb={0.5}
                  >
                    {mockPerformanceData.trend === 'up' ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                    <Typography variant="body2" fontWeight="medium">
                      {mockPerformanceData.trendPercentage}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'white' }}>
                <AssessmentIcon />
              </Avatar>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={mockPerformanceData.overallAverage} 
              sx={{ mt: 2, height: 8, borderRadius: 4 }}
              color={mockPerformanceData.overallAverage >= 80 ? 'success' : mockPerformanceData.overallAverage >= 60 ? 'warning' : 'error'}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Courses
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold" mt={0.5}>
                  {mockPerformanceData.completedCourses + mockPerformanceData.inProgressCourses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mockPerformanceData.completedCourses} completed • {mockPerformanceData.inProgressCourses} in progress
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'success.light', color: 'white' }}>
                <SchoolIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Study Time (Week)
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold" mt={0.5}>
                  {mockPerformanceData.weeklyStudyTime.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mockPerformanceData.studyStreak} day streak
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'white' }}>
                <TimelineIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Weekly Goals
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {mockPerformanceData.weeklyGoals.completed}/{mockPerformanceData.weeklyGoals.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({Math.round((mockPerformanceData.weeklyGoals.completed / mockPerformanceData.weeklyGoals.total) * 100)}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(mockPerformanceData.weeklyGoals.completed / mockPerformanceData.weeklyGoals.total) * 100} 
                  sx={{ mt: 2, height: 8, borderRadius: 4 }}
                  color="primary"
                />
              </Box>
              <Avatar sx={{ bgcolor: 'info.light', color: 'white' }}>
                <TrendingUpIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Charts Row 1 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Performance Trend</Typography>
              <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Time Range"
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="semester">This Semester</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: 'Jan', value: 65 },
                    { name: 'Feb', value: 68 },
                    { name: 'Mar', value: 72 },
                    { name: 'Apr', value: 70 },
                    { name: 'May', value: 75 },
                    { name: 'Jun', value: 78.5 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Average Score']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Average Score" 
                    stroke={theme.palette.primary.main} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    fill={theme.palette.primary.light}
                    fillOpacity={0.2}
                    stroke="none"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" mb={3}>Grade Distribution</Typography>
            <Box height={300} display="flex" flexDirection="column" justifyContent="center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPerformanceData.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockPerformanceData.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Course Performance Table */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Course Performance</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={handleCourseFilterChange}
                label="Filter by Course"
              >
                <MenuItem value="all">All Courses</MenuItem>
                {mockPerformanceData.coursePerformance.map((course) => (
                  <MenuItem key={course.name} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <DownloadIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export Data</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <FilterListIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Advanced Filters</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell align="right">Grade</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Assignments</TableCell>
                <TableCell>Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.name} hover>
                  <TableCell>
                    <Typography fontWeight="medium">{course.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                      <Typography 
                        variant="body1" 
                        fontWeight="bold"
                        color={course.grade >= 80 ? 'success.main' : course.grade >= 60 ? 'warning.main' : 'error.main'}
                      >
                        {course.grade}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box width="100%" maxWidth={120}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(course.completed / course.assignments) * 100} 
                          sx={{ height: 8, borderRadius: 4 }}
                          color={
                            (course.completed / course.assignments) >= 0.8 ? 'success' :
                            (course.completed / course.assignments) >= 0.5 ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {course.completed}/{course.assignments}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${course.completed}/${course.assignments}`} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" color={
                      course.trend === 'up' ? 'success.main' : 
                      course.trend === 'down' ? 'error.main' : 'warning.main'
                    }>
                      {course.trend === 'up' ? (
                        <>
                          <ArrowDropUpIcon />
                          <Typography variant="body2">Improving</Typography>
                        </>
                      ) : course.trend === 'down' ? (
                        <>
                          <ArrowDropDownIcon />
                          <Typography variant="body2">Needs Work</Typography>
                        </>
                      ) : (
                        <>
                          <TimelineIcon fontSize="small" />
                          <Typography variant="body2">Stable</Typography>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" mb={3}>Weekly Study Time</Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockPerformanceData.weeklyStudyTime}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} hours`, 'Study Time']} />
                  <Legend />
                  <Bar 
                    dataKey="hours" 
                    name="Study Hours" 
                    fill={theme.palette.primary.main} 
                    radius={[4, 4, 0, 0]}
                  >
                    {mockPerformanceData.weeklyStudyTime.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.hours >= 4 ? theme.palette.success.main :
                          entry.hours >= 2 ? theme.palette.warning.main :
                          theme.palette.error.main
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" mb={3}>Subject Performance</Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockPerformanceData.subjectPerformance}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar 
                    name="Performance" 
                    dataKey="score" 
                    stroke={theme.palette.primary.main} 
                    fill={theme.palette.primary.main} 
                    fillOpacity={0.6} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Subject: ${label}`}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" mb={3}>Recent Activity</Typography>
        <List>
          {mockPerformanceData.recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                alignItems="flex-start"
                secondaryAction={
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                }
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {activity.status === 'submitted' ? (
                    <InfoIcon color="info" />
                  ) : activity.status === 'graded' ? (
                    <CheckCircleIcon color="success" />
                  ) : activity.status === 'upcoming' ? (
                    <WarningIcon color="warning" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={activity.title}
                  secondary={
                    <Chip 
                      label={activity.status.replace('-', ' ')}
                      size="small"
                      color={
                        activity.status === 'submitted' ? 'info' :
                        activity.status === 'graded' ? 'success' :
                        activity.status === 'upcoming' ? 'warning' : 'error'
                      }
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  }
                />
              </ListItem>
              {index < mockPerformanceData.recentActivities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
  
  const renderDetailedTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Detailed Analytics</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
          Detailed analytics view coming soon. This section will include in-depth analysis and advanced metrics.
        </Typography>
      </Paper>
    </Box>
  );
  
  const renderComparativeTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Comparative Analysis</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
          Comparative analysis with peers will be available here. This feature is under development.
        </Typography>
      </Paper>
    </Box>
  );
  
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your academic performance and learning analytics
        </Typography>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-flexContainer': {
              bgcolor: 'background.paper',
            },
          }}
        >
          <Tab 
            icon={isMobile ? <BarChartIcon /> : null} 
            label={!isMobile && "Overview"} 
            value="overview" 
            sx={{ minHeight: 64 }}
          />
          <Tab 
            icon={isMobile ? <TimelineIcon /> : null} 
            label={!isMobile && "Detailed"} 
            value="detailed" 
            sx={{ minHeight: 64 }}
          />
          <Tab 
            icon={isMobile ? <PieChartIcon /> : null} 
            label={!isMobile && "Comparative"} 
            value="comparative" 
            sx={{ minHeight: 64 }}
          />
        </Tabs>
        
        <Box p={3}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'detailed' && renderDetailedTab()}
          {activeTab === 'comparative' && renderComparativeTab()}
        </Box>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
