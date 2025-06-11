// File: src/roles/student/StudentRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import MainLayout from './components/MainLayout';

// Lazy load pages for better performance
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const CoursesPage = lazy(() => import('./features/courses/CoursesPage'));
const CourseDetailPage = lazy(() => import('./features/courses/CourseDetailPage'));
const CalendarPage = lazy(() => import('./features/calendar/CalendarPage'));
const GamificationPage = lazy(() => import('./features/gamification/GamificationPage'));
const AnalyticsPage = lazy(() => import('./features/analytics/AnalyticsPage'));
const WellbeingPage = lazy(() => import('./features/wellbeing/WellbeingPage'));
const DocumentsPage = lazy(() => import('./features/documents/DocumentsPage'));
const CareerPage = lazy(() => import('./features/career/CareerPage'));
const ProfilePage = lazy(() => import('./features/profile/ProfilePage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../../common/components/NotFoundPage'));

// Loading component for suspense fallback
const Loading = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="60vh"
  >
    <CircularProgress />
  </Box>
);

// Layout wrapper to handle the main layout with suspense
const LayoutWrapper = () => (
  <MainLayout>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </MainLayout>
);

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Courses */}
        <Route path="courses">
          <Route index element={<CoursesPage />} />
          <Route path=":courseId" element={<CourseDetailPage />} />
          <Route path=":courseId/materials" element={<div>Course Materials</div>} />
          <Route path=":courseId/assignments" element={<div>Assignments</div>} />
          <Route path=":courseId/grades" element={<div>Grades</div>} />
        </Route>
        
        {/* Calendar */}
        <Route path="calendar" element={<CalendarPage />} />
        
        {/* Gamification */}
        <Route path="gamification" element={<GamificationPage />} />
        
        {/* Analytics */}
        <Route path="analytics" element={<AnalyticsPage />} />
        
        {/* Wellbeing */}
        <Route path="wellbeing" element={<WellbeingPage />} />
        
        {/* Documents */}
        <Route path="documents" element={<DocumentsPage />} />
        
        {/* Career */}
        <Route path="career" element={<CareerPage />} />
        
        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Settings */}
        <Route path="settings" element={<SettingsPage />}>
          <Route index element={<Navigate to="account" replace />} />
          <Route path="account" element={<div>Account Settings</div>} />
          <Route path="notifications" element={<div>Notification Settings</div>} />
          <Route path="privacy" element={<div>Privacy Settings</div>} />
        </Route>
        
        {/* 404 - Keep this at the end */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
      {/* Auth related routes */}
      <Route path="logout" element={<div>Logging out...</div>} />
    </Routes>
  );
};

export default StudentRoutes;