// File: src/roles/student/StudentRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import TimetablePage from './pages/TimetablePage';
import ResultsPage from './pages/ResultsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MessagesPage from './pages/MessagesPage';
import FeesPaymentPage from './pages/FeesPaymentPage';
import PersonalAccountsPage from './pages/PersonalAccountsPage';
import LibraryPage from './pages/LibraryPage';
import ITLabPage from './pages/ITLabPage';
import CanteenPage from './pages/CanteenPage';
import HealthComplexPage from './pages/HealthComplexPage';
import SportsComplexPage from './pages/SportsComplexPage';
import MarketPage from './pages/MarketPage';
import CommunityPage from './pages/CommunityPage';
import ThemeSettingsPage from './pages/ThemeSettingsPage';
import FontSettingsPage from './pages/FontSettingsPage';
import Logout from './pages/Logout';

const StudentRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<StudentDashboardPage />} />
    <Route path="courses" element={<CoursesPage />} />
    <Route path="courses/:id" element={<CoursePage />} />
    <Route path="timetable" element={<TimetablePage />} />
    <Route path="results" element={<ResultsPage />} />
    <Route path="assignments" element={<AssignmentsPage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="fees-payment" element={<FeesPaymentPage />} />
    <Route path="personal-accounts" element={<PersonalAccountsPage />} />
    <Route path="library" element={<LibraryPage />} />
    <Route path="it-lab" element={<ITLabPage />} />
    <Route path="canteen" element={<CanteenPage />} />
    <Route path="health-complex" element={<HealthComplexPage />} />
    <Route path="sports-complex" element={<SportsComplexPage />} />
    <Route path="market" element={<MarketPage />} />
    <Route path="community" element={<CommunityPage />} />
    <Route path="settings/theme" element={<ThemeSettingsPage />} />
    <Route path="settings/font" element={<FontSettingsPage />} />
    <Route path="logout" element={<Logout />} />
    <Route path="*" element={<div>Page Not Found</div>} />
  </Routes>
);
export default StudentRoutes;