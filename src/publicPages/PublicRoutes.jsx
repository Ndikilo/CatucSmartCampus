import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Library from '../features/library/Library';
import Finance from '../features/Finance';
import Academics from '../features/Academics';
import CyberCafe from '../features/cyber-cafe/CyberCafe';
import Exams from '../features/Exams';
import Admission from '../features/Admission';
import Events from '../features/Events';
import HelpAndSupport from '../features/HelpAndSupport';
import HelpCenter from '../pages/help/HelpCenter';
import ITHelpDesk from '../pages/help/ITHelpDesk';
import { Hostels } from '../features/hostels';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="library" element={<Library />} />
      <Route path="finance" element={<Finance />} />
      <Route path="academics" element={<Academics />} />
      <Route path="cyber-cafe" element={<CyberCafe />} />
      <Route path="exams" element={<Exams />} />
      <Route path="admissions" element={<Admission />} />
      <Route path="events" element={<Events />} />
      <Route path="help-support" element={<HelpAndSupport />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="it-help" element={<ITHelpDesk />} />
      <Route path="/hostels" element={<Hostels />} />
    </Routes>
  );
};

export default PublicRoutes;
