import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

//handles changes to localstorage
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

//saves token to localstorage
  const loginAuth = (newToken) => {
  	console.log(newToken);
    setToken(newToken);
  };

//deletes token from localstorage
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
