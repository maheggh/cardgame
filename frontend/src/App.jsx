import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './UserContext.jsx';
import Header from './components/Header/';
import Login from './pages/login/';
import Signup from './pages/signup/';
import Welcome from './pages/welcome/';
import Dashboard from './pages/dashboard/';
import FileUpload from "./pages/fileupload";
import PrivateRoutes from './helpers/PrivateRoute.jsx';
import UserDashboard from './pages/users/index.jsx';
import Game from './pages/game/';
import EditUserPage from './pages/EditUserPage/index.jsx';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/dashboard" element={<Dashboard />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["Admin"]}/>}> <Route path="/cards" element={<Dashboard />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["Admin"]}/>}> <Route path="/users" element={<UserDashboard />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/edit-user/:userId" element={<EditUserPage />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/game" element={<Game />} /></Route>
          <Route path="/fileUpload" element={<FileUpload />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;