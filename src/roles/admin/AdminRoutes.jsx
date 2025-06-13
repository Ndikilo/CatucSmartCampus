import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import AdminLayout from './components/AdminLayout';

// Error boundary component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleCatch = (error, errorInfo) => {
    console.error('Error caught by error boundary:', error, errorInfo);
    setError(error);
    setHasError(true);
  };

  if (hasError) {
    return (
      <Box p={4}>
        <Typography color="error" variant="h6" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body1" paragraph>
          {error?.message || 'An unexpected error occurred.'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please try refreshing the page or contact support if the problem persists.
        </Typography>
      </Box>
    );
  }

  return children;
};

// Loading component with better error handling
const Loading = () => {
  const [showError, setShowError] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 5000); // Show error message after 5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="80vh"
      p={3}
    >
      <CircularProgress />
      {showError && (
        <Typography color="error" mt={2} align="center">
          Taking longer than expected. Please check your connection and refresh the page.
        </Typography>
      )}
    </Box>
  );
};

// Coming Soon component for unimplemented pages
const ComingSoon = () => (
  <Box p={4}>
    <Typography variant="h5" gutterBottom>
      Coming Soon
    </Typography>
    <Typography variant="body1">
      This page is currently under development.
    </Typography>
  </Box>
);

// Lazy load existing pages with error boundary
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error('Error loading component:', error);
      return { 
        default: function ErrorComponent() {
          return (
            <Box p={3}>
              <Typography color="error">
                Failed to load component. Please try again later.
              </Typography>
            </Box>
          );
        }
      };
    }
  });

// Only import existing pages
const DashboardPage = lazyWithRetry(() => import('./dashboard/DashboardPage'));
const ManageUsersPage = lazyWithRetry(() => import('./users/ManageUsersPage'));
const UserDetailPage = lazyWithRetry(() => import('./users/UserDetailPage'));

// Layout wrapper with suspense
const LayoutWrapper = () => (
  <AdminLayout>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </AdminLayout>
);

const AdminRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<LayoutWrapper />}>
          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* User Management */}
          <Route path="users">
            <Route index element={<ManageUsersPage />} />
            <Route path=":userId" element={<UserDetailPage />} />
            <Route path="new" element={<UserDetailPage isNew />} />
          </Route>
          
          {/* Coming Soon Pages - These will be implemented later */}
          <Route path="roles" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
          <Route path="analytics" element={<ComingSoon />} />
          <Route path="content" element={<ComingSoon />} />
          <Route path="audit-logs" element={<ComingSoon />} />
          
          {/* 404 - Keep this last */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default AdminRoutes;