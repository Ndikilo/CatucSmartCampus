import React from 'react';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Button,
  Box,
  useTheme,
  Skeleton,
  Typography,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  PersonAdd as AddUserIcon,
  CloudUpload as UploadIcon,
  FileCopy as FileIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActions = ({ loading = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const actions = [
    {
      id: 'add-user',
      icon: <AddUserIcon />,
      label: 'Add User',
      color: 'primary',
      onClick: () => navigate('/admin/users/new'),
      description: 'Create a new user account'
    },
    {
      id: 'upload-document',
      icon: <UploadIcon />,
      label: 'Upload',
      color: 'secondary',
      onClick: () => navigate('/admin/documents/upload'),
      description: 'Upload new documents'
    },
    {
      id: 'view-reports',
      icon: <ChartIcon />,
      label: 'Reports',
      color: 'info',
      onClick: () => navigate('/admin/reports'),
      description: 'View system reports'
    },
    {
      id: 'settings',
      icon: <SettingsIcon />,
      label: 'Settings',
      color: 'warning',
      onClick: () => navigate('/admin/settings'),
      description: 'System settings'
    },
    {
      id: 'notifications',
      icon: <NotificationsIcon />,
      label: 'Alerts',
      color: 'error',
      onClick: () => navigate('/admin/notifications'),
      description: 'View system alerts'
    },
    {
      id: 'security',
      icon: <SecurityIcon />,
      label: 'Security',
      color: 'success',
      onClick: () => navigate('/admin/security'),
      description: 'Security settings'
    },
  ];

  return (
    <Card>
      <CardHeader 
        title="Quick Actions"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Grid container spacing={2}>
            {Array(6).fill().map((_, index) => (
              <Grid item xs={6} key={index}>
                <Skeleton variant="rectangular" height={80} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {actions.map((action) => (
              <Grid item xs={6} key={action.id}>
                <Tooltip 
                  title={action.description} 
                  arrow
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 200 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={React.cloneElement(action.icon, { 
                        color: action.color 
                      })}
                      onClick={action.onClick}
                      sx={{
                        height: '100%',
                        minHeight: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: theme.palette[action.color].main,
                          backgroundColor: `${theme.palette[action.color].main}08`,
                        },
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          display: 'block',
                          mb: 0.5,
                          color: theme.palette[action.color].main,
                          '& .MuiSvgIcon-root': {
                            fontSize: '1.5rem',
                          }
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography 
                        variant="body2" 
                        component="span"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 500,
                        }}
                      >
                        {action.label}
                      </Typography>
                    </Button>
                  </motion.div>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
