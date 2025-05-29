import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// Lazy-loaded public pages
const LandingPage = lazy(() => import('./publicPages/landing/LandingPage'));
const WelcomePage = lazy(() => import('./publicPages/welcome/Welcome'));
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
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Auth Routes */}
        <Route path="/auth">
          <Route index element={<AuthPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Role Redirect */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* Role-Based Routes */}
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/staff/*" element={<StaffRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Catch-All for Quick Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default App;
