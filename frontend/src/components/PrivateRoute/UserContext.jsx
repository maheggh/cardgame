import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStatus, logout } from '../../helpers/api.js';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [role, setRole] = useState("");

//updates and saves token to cookies
  const loginAuth = () => {
    getStatus(setIsAuth);
  };

  const handleLogout = () => {
    logout();
    getStatus(setIsAuth);
  }

  useEffect(() => {
    getStatus(setIsAuth)
      .then(responseData => {
        setRole(responseData.userRole);
      });
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, loginAuth, handleLogout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
