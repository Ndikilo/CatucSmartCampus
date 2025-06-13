import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Skeleton,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  trend,
  loading = false,
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[8],
        },
        ...props.sx
      }}
      {...props}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography 
              variant="subtitle2" 
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={60} height={40} />
            ) : (
              <Typography variant="h4" component="div">
                {value}
              </Typography>
            )}
            {trend && !loading && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: theme.palette[color].main,
                  display: 'flex',
                  alignItems: 'center',
                  mt: 0.5
                }}
              >
                {trend}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: alpha(theme.palette[color].main, 0.1),
              borderRadius: '12px',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette[color].main,
            }}
          >
            {React.cloneElement(icon, { fontSize: 'large' })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
