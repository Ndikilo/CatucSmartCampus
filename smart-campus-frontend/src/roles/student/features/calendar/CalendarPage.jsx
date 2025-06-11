import React, { useState, useCallback, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns';
import { Box, Typography, Paper, IconButton, Button, useMediaQuery, useTheme } from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
  FilterList as FilterListIcon,
  ViewDay as ViewDayIcon,
  ViewWeek as ViewWeekIcon,
  ViewMonth as ViewMonthIcon,
  ViewAgenda as ViewAgendaIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// Mock data for calendar events
const mockEvents = [
  {
    id: '1',
    title: 'CS101 Assignment 1 Due',
    type: 'assignment',
    date: new Date(2024, 5, 15), // June 15, 2024
    course: 'CS101',
    color: '#3f51b5',
    completed: false,
  },
  {
    id: '2',
    title: 'MATH201 Quiz 1',
    type: 'quiz',
    date: new Date(2024, 5, 18),
    course: 'MATH201',
    color: '#4caf50',
    completed: false,
  },
  {
    id: '3',
    title: 'Team Meeting',
    type: 'event',
    date: new Date(2024, 5, 20),
    course: 'CS101',
    color: '#ff9800',
    completed: false,
  },
  {
    id: '4',
    title: 'Project Submission',
    type: 'assignment',
    date: new Date(2024, 5, 25),
    course: 'CS101',
    color: '#3f51b5',
    completed: false,
  },
  {
    id: '5',
    title: 'Final Exam',
    type: 'exam',
    date: new Date(2024, 5, 30),
    course: 'MATH201',
    color: '#f44336',
    completed: false,
  },
];

const CalendarPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'day', 'week', 'month', 'agenda'
  const [filters, setFilters] = useState({
    assignments: true,
    quizzes: true,
    events: true,
    exams: true,
  });
  
  // Generate days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      if (event.type === 'assignment' && !filters.assignments) return false;
      if (event.type === 'quiz' && !filters.quizzes) return false;
      if (event.type === 'event' && !filters.events) return false;
      if (event.type === 'exam' && !filters.exams) return false;
      return true;
    });
  }, [filters]);
  
  // Get events for a specific day
  const getEventsForDay = useCallback((day) => {
    return filteredEvents.filter(event => isSameDay(event.date, day));
  }, [filteredEvents]);
  
  // Navigation handlers
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const toggleFilter = (filter) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  const getEventIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon fontSize="small" />;
      case 'quiz':
        return <QuizIcon fontSize="small" />;
      case 'exam':
        return <QuizIcon fontSize="small" color="error" />;
      default:
        return <EventIcon fontSize="small" />;
    }
  };
  
  const renderMonthView = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
      {/* Day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <Typography key={day} variant="body2" fontWeight="medium" textAlign="center" py={1}>
          {day}
        </Typography>
      ))}
      
      {/* Calendar days */}
      {monthDays.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isDayToday = isToday(day);
        
        return (
          <Paper
            key={index}
            elevation={0}
            sx={{
              aspectRatio: '1.5',
              p: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              position: 'relative',
              bgcolor: isDayToday ? 'action.selected' : 'background.paper',
              opacity: isCurrentMonth ? 1 : 0.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                fontWeight: isDayToday ? 'bold' : 'normal',
                color: isDayToday ? 'primary.main' : 'text.primary',
              }}
            >
              {format(day, 'd')}
            </Typography>
            <Box sx={{ mt: 0.5, overflow: 'hidden', maxHeight: 'calc(100% - 24px)' }}>
              {dayEvents.slice(0, 3).map((event, idx) => (
                <Box 
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '0.7rem',
                    py: 0.25,
                  }}
                >
                  {getEventIcon(event.type)}
                  <Typography 
                    variant="caption" 
                    noWrap
                    sx={{ 
                      color: event.color || 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {event.title}
                  </Typography>
                </Box>
              ))}
              {dayEvents.length > 3 && (
                <Typography variant="caption" color="text.secondary">
                  +{dayEvents.length - 3} more
                </Typography>
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
  
  const renderAgendaView = () => (
    <Box>
      {filteredEvents.map((event, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" lineHeight={1}>
                {format(event.date, 'd')}
              </Typography>
              <Typography variant="caption" lineHeight={1}>
                {format(event.date, 'MMM')}
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                {getEventIcon(event.type)}
                <Typography variant="subtitle2" fontWeight={500}>
                  {event.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {event.course} • {format(event.date, 'h:mm a')}
              </Typography>
            </Box>
            <Button size="small" variant="outlined">
              View Details
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
  
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Calendar Header */}
      <Box 
        display="flex" 
        flexDirection={isMobile ? 'column' : 'row'} 
        alignItems={isMobile ? 'stretch' : 'center'} 
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" component="h1">
            Calendar
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={prevMonth} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6">
              {format(currentDate, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={nextMonth} size="small">
              <ChevronRightIcon />
            </IconButton>
            <Button 
              variant="outlined" 
              startIcon={<TodayIcon />} 
              onClick={goToToday}
              size="small"
            >
              Today
            </Button>
          </Box>
        </Box>
        
        <Box display="flex" gap={1} flexWrap="wrap">
          <Button
            variant={view === 'month' ? 'contained' : 'outlined'}
            onClick={() => setView('month')}
            size="small"
            startIcon={<ViewMonthIcon />}
          >
            {!isMobile && 'Month'}
          </Button>
          <Button
            variant={view === 'agenda' ? 'contained' : 'outlined'}
            onClick={() => setView('agenda')}
            size="small"
            startIcon={<ViewAgendaIcon />}
          >
            {!isMobile && 'Agenda'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="small"
            onClick={() => enqueueSnackbar('Filter functionality coming soon', { variant: 'info' })}
          >
            {!isMobile && 'Filters'}
          </Button>
        </Box>
      </Box>
      
      {/* Quick Filters */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        {Object.entries(filters).map(([key, value]) => (
          <Button
            key={key}
            variant={value ? 'contained' : 'outlined'}
            size="small"
            onClick={() => toggleFilter(key)}
            sx={{
              textTransform: 'capitalize',
              ...(key === 'assignments' && value && { bgcolor: 'primary.main' }),
              ...(key === 'quizzes' && value && { bgcolor: 'success.main' }),
              ...(key === 'events' && value && { bgcolor: 'warning.main' }),
              ...(key === 'exams' && value && { bgcolor: 'error.main' }),
            }}
          >
            {key}
          </Button>
        ))}
      </Box>
      
      {/* Calendar View */}
      {view === 'month' ? renderMonthView() : renderAgendaView()}
      
      {/* Upcoming Events */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        {filteredEvents
          .filter(event => event.date > new Date())
          .slice(0, 3)
          .map((event, index) => (
            <Paper key={index} sx={{ p: 2, mb: 1 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    p: 1,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    borderRadius: '50%',
                  }}
                >
                  {getEventIcon(event.type)}
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.course} • {format(event.date, 'MMM d, yyyy h:mm a')}
                  </Typography>
                </Box>
                <Button size="small" variant="text">
                  View
                </Button>
              </Box>
            </Paper>
          ))}
      </Box>
    </Box>
  );
};

export default CalendarPage;
