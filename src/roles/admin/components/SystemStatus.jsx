import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  useTheme,
  Skeleton,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const statusColors = {
  operational: 'success',
  degraded: 'warning',
  outage: 'error',
  maintenance: 'info',
};

const statusIcons = {
  operational: <CheckCircleIcon color="success" />,
  degraded: <WarningIcon color="warning" />,
  outage: <ErrorIcon color="error" />,
  maintenance: <InfoIcon color="info" />,
};

const SystemStatus = ({ loading = false }) => {
  const theme = useTheme();
  const [status, setStatus] = useState('operational');
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock system components status
  const [components, setComponents] = useState([
    { id: 'api', name: 'API', status: 'operational', usage: 65 },
    { id: 'database', name: 'Database', status: 'operational', usage: 42 },
    { id: 'storage', name: 'File Storage', status: 'operational', usage: 28 },
    { id: 'auth', name: 'Authentication', status: 'operational', usage: 15 },
  ]);

  const refreshStatus = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastChecked(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    // Simulate occasional status changes
    const interval = setInterval(() => {
      const newComponents = [...components];
      const randomIndex = Math.floor(Math.random() * newComponents.length);
      const randomStatus = Object.keys(statusColors)[Math.floor(Math.random() * 4)];
      
      newComponents[randomIndex] = {
        ...newComponents[randomIndex],
        status: randomStatus,
        usage: Math.min(100, Math.max(0, newComponents[randomIndex].usage + (Math.random() > 0.5 ? 5 : -5)))
      };
      
      setComponents(newComponents);
      
      // Update overall status based on components
      if (newComponents.some(c => c.status === 'outage')) {
        setStatus('outage');
      } else if (newComponents.some(c => c.status === 'degraded')) {
        setStatus('degraded');
      } else if (newComponents.some(c => c.status === 'maintenance')) {
        setStatus('maintenance');
      } else {
        setStatus('operational');
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [components]);

  const getComponentIcon = (componentId) => {
    switch (componentId) {
      case 'api':
        return <DnsIcon />;
      case 'database':
        return <StorageIcon />;
      case 'storage':
        return <CloudIcon />;
      case 'auth':
        return <SecurityIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Box component="span" mr={1}>
              {statusIcons[status]}
            </Box>
            <span>System Status</span>
          </Box>
        }
        action={
          <Tooltip title="Refresh status">
            <IconButton 
              onClick={refreshStatus} 
              disabled={isRefreshing}
              size="small"
              sx={{
                animation: isRefreshing ? 'spin 2s linear infinite' : 'none',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Box>
            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
          </Box>
        ) : (
          <Box>
            <Box mb={3}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Last checked: {lastChecked.toLocaleTimeString()}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" component="span" sx={{ mr: 1 }}>
                  Status:
                </Typography>
                <Chip
                  icon={statusIcons[status]}
                  label={getStatusLabel(status)}
                  color={statusColors[status]}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {status === 'operational' && 'All systems are functioning normally.'}
                {status === 'degraded' && 'Some systems may be experiencing issues.'}
                {status === 'outage' && 'Critical systems are experiencing an outage.'}
                {status === 'maintenance' && 'Scheduled maintenance in progress.'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Component Status
              </Typography>
              <Box sx={{ '& > div:not(:last-child)': { mb: 2 } }}>
                {components.map((component) => (
                  <Box key={component.id}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Box display="flex" alignItems="center">
                        <Box 
                          sx={{ 
                            color: 'text.secondary',
                            mr: 1,
                            '& .MuiSvgIcon-root': {
                              fontSize: '1rem',
                            }
                          }}
                        >
                          {getComponentIcon(component.id)}
                        </Box>
                        <Typography variant="body2">
                          {component.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={getStatusLabel(component.status)}
                        size="small"
                        variant="outlined"
                        color={statusColors[component.status]}
                        sx={{ height: 20, fontSize: '0.65rem' }}
                      />
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" mr={1}>
                        <LinearProgress 
                          variant="determinate" 
                          value={component.usage} 
                          color={component.usage > 80 ? 'error' : component.usage > 60 ? 'warning' : 'primary'}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        {Math.round(component.usage)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
