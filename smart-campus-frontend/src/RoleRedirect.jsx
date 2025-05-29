// src/RoleRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './common/context/AuthContext';

const RoleRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    switch (user.role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'staff':
        navigate('/staff/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
    }
  }, [user, navigate]);

  return null;
};

export default RoleRedirect;
