import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ThemeProvider } from './common/context/ThemeContext';
import { AuthProvider } from './common/context/AuthContext';
import ErrorBoundary from './common/components/ErrorBoundary';

// Lazy-loaded public pages
const LandingPage = lazy(() => import('./publicPages/landing/LandingPage'));
const Welcome = lazy(() => import('./publicPages/welcome/Welcome.jsx'));
const AuthPage = lazy(() => import('./publicPages/auth/AuthPage'));
const SignupPage = lazy(() => import('./publicPages/auth/SignupPage'));
const RoleRedirect = lazy(() => import('./RoleRedirect'));

// Lazy-loaded route wrappers
const PublicRoutes = lazy(() => import('./publicPages/PublicRoutes'));
const StudentRoutes = lazy(() => import('./roles/student/StudentRoutes'));
const StaffRoutes = lazy(() => import('./roles/staff/StaffRoutes'));
const AdminRoutes = lazy(() => import('./roles/admin/AdminRoutes'));

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress color="primary" />
  </Box>
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={
                <Suspense fallback={<Loader />}>
                  <LandingPage />
                </Suspense>
              } />
              <Route path="/welcome" element={
                <Suspense fallback={<Loader />}>
                  <Welcome />
                </Suspense>
              } />

              {/* Auth Routes */}
              <Route path="/auth">
                <Route index element={
                  <Suspense fallback={<Loader />}>
                    <AuthPage />
                  </Suspense>
                } />
                <Route path="login" element={
                  <Suspense fallback={<Loader />}>
                    <AuthPage />
                  </Suspense>
                } />
                <Route path="signup" element={
                  <Suspense fallback={<Loader />}>
                    <SignupPage />
                  </Suspense>
                } />
              </Route>

              {/* Role Redirect */}
              <Route path="/redirect" element={
                <Suspense fallback={<Loader />}>
                  <RoleRedirect />
                </Suspense>
              } />

              {/* Role-Based Routes */}
              <Route path="/student/*" element={
                <Suspense fallback={<Loader />}>
                  <StudentRoutes />
                </Suspense>
              } />
              <Route path="/staff/*" element={
                <Suspense fallback={<Loader />}>
                  <StaffRoutes />
                </Suspense>
              } />
              <Route path="/admin/*" element={
                <Suspense fallback={<Loader />}>
                  <AdminRoutes />
                </Suspense>
              } />

              {/* Catch-All for Quick Public Routes */}
              <Route path="/*" element={
                <Suspense fallback={<Loader />}>
                  <PublicRoutes />
                </Suspense>
              } />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
