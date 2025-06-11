// src/roles/staff/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@common/context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/auth/login');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/auth/login');
      }
    };

    performLogout();
  }, [navigate, logout]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div>Logging out...</div>
      <div className="spinner"></div>
    </div>
  );
};

export default Logout;
