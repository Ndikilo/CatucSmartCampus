import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Button,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Info as InfoIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Forum as ForumIcon,
  People as PeopleIcon,
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material';

const tabs = [
  { id: 'overview', label: 'Overview', icon: <InfoIcon /> },
  { id: 'materials', label: 'Materials', icon: <DescriptionIcon /> },
  { id: 'assignments', label: 'Assignments', icon: <AssignmentIcon /> },
  { id: 'grades', label: 'Grades', icon: <GradeIcon /> },
  { id: 'discussions', label: 'Discussions', icon: <ForumIcon /> },
  { id: 'people', label: 'People', icon: <PeopleIcon /> },
  { id: 'quizzes', label: 'Quizzes', icon: <QuizIcon /> },
  { id: 'announcements', label: 'Announcements', icon: <AnnouncementIcon /> },
];

const CourseTabs = ({ course, isMobile }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const moreMenuOpen = Boolean(moreMenuAnchor);
  
  // Get current tab from URL
  const currentTab = location.pathname.split('/').pop() || 'overview';
  const currentTabIndex = Math.max(tabs.findIndex(tab => tab.id === currentTab), 0);
  
  const visibleTabs = isSmallScreen ? tabs.slice(0, 3) : tabs.slice(0, 5);
  const moreTabs = isSmallScreen ? tabs.slice(3) : tabs.slice(5);
  
  const handleTabChange = (event, newValue) => {
    const tabId = tabs[newValue].id;
    navigate(`/student/courses/${courseId}/${tabId}`);
  };
  
  const handleMoreClick = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };
  
  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };
  
  const handleMoreTabSelect = (tabId) => {
    navigate(`/student/courses/${courseId}/${tabId}`);
    handleMoreMenuClose();
  };
  
  const handleDownloadSyllabus = () => {
    // TODO: Implement syllabus download
    console.log('Download syllabus');
  };
  
  const handleShareCourse = () => {
    // TODO: Implement share functionality
    console.log('Share course');
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: 64,
              '& .MuiTab-root': {
                minHeight: 64,
                py: 1,
                px: 2,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            {visibleTabs.map((tab) => (
              <Tab 
                key={tab.id}
                icon={isSmallScreen ? tab.icon : null}
                iconPosition="start"
                label={isSmallScreen ? null : tab.label}
                sx={{
                  minWidth: 'auto',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
            ))}
            
            {moreTabs.length > 0 && (
              <Tab
                icon={<MoreVertIcon />}
                onClick={handleMoreClick}
                aria-label="More"
                sx={{
                  minWidth: 'auto',
                  minHeight: 64,
                  p: 1,
                }}
              />
            )}
          </Tabs>
          
          <Box sx={{ display: 'flex', gap: 1, ml: 'auto', pr: 2 }}>
            <Tooltip title="Download Syllabus">
              <IconButton onClick={handleDownloadSyllabus} size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton onClick={handleShareCourse} size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
      
      {/* More Tabs Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={moreMenuOpen}
        onClose={handleMoreMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {moreTabs.map((tab) => (
          <MenuItem 
            key={tab.id} 
            onClick={() => handleMoreTabSelect(tab.id)}
            selected={currentTab === tab.id}
          >
            <ListItemIcon>
              {tab.icon}
            </ListItemIcon>
            <ListItemText>{tab.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CourseTabs;
