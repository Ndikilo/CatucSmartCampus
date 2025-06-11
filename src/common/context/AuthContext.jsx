// src/common/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('smartcampus-user')) || null
  );

  const login = (role) => {
    const dummyUser = { username: 'John Doe', role };
    setUser(dummyUser);
    localStorage.setItem('smartcampus-user', JSON.stringify(dummyUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartcampus-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
