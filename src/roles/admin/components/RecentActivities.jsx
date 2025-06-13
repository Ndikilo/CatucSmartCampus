import React from 'react';
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Skeleton,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  FileCopy as FileIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const activityIcons = {
  user: <PersonIcon />,
  document: <FileIcon />,
  security: <SecurityIcon />,
  success: <CheckCircleIcon color="success" />,
  error: <ErrorIcon color="error" />,
  warning: <WarningIcon color="warning" />,
  info: <InfoIcon color="info" />
};

const RecentActivities = ({ loading = false }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedActivity, setSelectedActivity] = React.useState(null);

  // Mock data - replace with actual data from API
  const activities = [
    {
      id: 1,
      type: 'user',
      title: 'New user registered',
      description: 'John Doe has created an account',
      time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: 'success'
    },
    {
      id: 2,
      type: 'document',
      title: 'Document uploaded',
      description: 'Quarterly report.pdf has been uploaded',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'info'
    },
    {
      id: 3,
      type: 'security',
      title: 'Security alert',
      description: 'Multiple failed login attempts detected',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'warning'
    },
    {
      id: 4,
      type: 'user',
      title: 'Profile updated',
      description: 'Jane Smith has updated her profile',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'info'
    },
    {
      id: 5,
      type: 'document',
      title: 'Document deleted',
      description: 'Old_report_2023.pdf has been deleted',
      time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      status: 'error'
    }
  ];

  const handleMenuOpen = (event, activity) => {
    setAnchorEl(event.currentTarget);
    setSelectedActivity(activity);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedActivity(null);
  };

  const handleMarkAsRead = () => {
    // Handle mark as read logic
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success.main';
      case 'error':
        return 'error.main';
      case 'warning':
        return 'warning.main';
      case 'info':
      default:
        return 'info.main';
    }
  };

  return (
    <Card>
      <CardHeader
        title="Recent Activities"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Divider />
      <List sx={{ p: 0 }}>
        {loading ? (
          // Loading skeleton
          Array(3).fill().map((_, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton variant="text" width="60%" />}
                  secondary={<Skeleton variant="text" width="40%" />}
                />
                <Skeleton variant="text" width={60} />
              </ListItem>
              {index < 2 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))
        ) : (
          activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                secondaryAction={
                  <Box display="flex" alignItems="center">
                    <Typography 
                      variant="caption" 
                      color="textSecondary"
                      sx={{ mr: 1 }}
                    >
                      {formatDistanceToNow(activity.time, { addSuffix: true })}
                    </Typography>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleMenuOpen(e, activity)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette[activity.status]?.main || 'primary.main', 0.1),
                      color: getStatusColor(activity.status)
                    }}
                  >
                    {activityIcons[activity.type] || activityIcons.info}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography 
                        variant="subtitle2" 
                        component="span"
                        sx={{ mr: 1 }}
                      >
                        {activity.title}
                      </Typography>
                      {activity.status === 'warning' && (
                        <Chip 
                          label="Warning" 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  }
                  secondary={activity.description}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary',
                    noWrap: true,
                    sx: {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      maxWidth: '70%',
                      [theme.breakpoints.up('md')]: {
                        maxWidth: '80%',
                      },
                    },
                  }}
                />
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))
        )}
      </List>

      {/* Activity Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMarkAsRead}>Mark as read</MenuItem>
        <MenuItem onClick={handleMenuClose}>View details</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default RecentActivities;
