// src/roles/student/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // perform logout logic
    localStorage.clear();
    navigate('/auth/login');
  }, [navigate]);
  return null;
};

export default Logout;