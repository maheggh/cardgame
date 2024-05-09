import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStatus, logout } from '../../helpers/api.js';
import { useLocation } from 'react-router-dom'

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

  const getLocation = () =>{
    console.log(location.pathname)
  }

useEffect(() => {
  getStatus(setIsAuth)
  .then(responseData =>{
    setRole(responseData.userRole);
  })
},[]);

  return (
    <AuthContext.Provider value={{ isAuth, loginAuth, handleLogout, getLocation, role }}>
      {children}
    </AuthContext.Provider>
  );
};
