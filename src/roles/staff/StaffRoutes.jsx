// File: src/roles/staff/StaffRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import AssignmentsPage from './pages/AssignmentsPage';
import GradesPage from './pages/GradesPage';
import LibraryManagementPage from './pages/LibraryManagementPage';
import MessagesPage from './pages/MessagesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import Logout from './pages/Logout';

const StaffRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="schedule" element={<SchedulePage />} />
    <Route path="students" element={<StudentsPage />} />
    <Route path="attendance" element={<AttendancePage />} />
    <Route path="courses" element={<CoursesPage />} />
    <Route path="courses/:id" element={<CoursePage />} />
    <Route path="assignments" element={<AssignmentsPage />} />
    <Route path="grades" element={<GradesPage />} />
    <Route path="library" element={<LibraryManagementPage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="reports" element={<ReportsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="logout" element={<Logout />} />
    <Route path="*" element={<div>Page Not Found</div>} />
  </Routes>
);

export default StaffRoutes;