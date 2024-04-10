import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const loginAuth = (newToken) => {
  	console.log(newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, loginAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
