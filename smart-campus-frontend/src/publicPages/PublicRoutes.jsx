import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Library from '../features/library/Library';
import Finance from '../features/Finance';
import Academics from '../features/Academics';
import ItLab from '../features/ItLab';
import Exams from '../features/Exams';
import Admission from '../features/Admission';
import Events from '../features/Events';
import HelpAndSupport from '../features/HelpAndSupport';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="library" element={<Library />} />
      <Route path="finance" element={<Finance />} />
      <Route path="academics" element={<Academics />} />
      <Route path="it-lab" element={<ItLab />} />
      <Route path="exams" element={<Exams />} />
      <Route path="admissions" element={<Admission />} />
      <Route path="events" element={<Events />} />
      <Route path="help-support" element={<HelpAndSupport />} />
    </Routes>
  );
};

export default PublicRoutes;
