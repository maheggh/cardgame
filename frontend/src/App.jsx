import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/PrivateRoute/UserContext';
import Header from './components/Header/';
import Login from './pages/login/';
import Signup from './pages/signup/';
import Welcome from './pages/welcome/';
import DecksPage from './pages/Decks/';
import NoMatch from "./pages/NoMatch";
import UserDashboard from './pages/users/';
import Game from './pages/game/';
import EditUserPage from './pages/EditUserPage/';
import CardsPage from './pages/cards/';
import EditCardPage from './pages/EditCardPage/';
import OwnUserRedirect from './pages/OwnUserRedirect/';
import PrivateRoutes from './components/PrivateRoute/';

//fjern før levering: poenget med å ha filene som "index.jsx" inni mapper er for å slippe å skrive "index.jsx" i import. ser cleanere ut
// <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/dashboard" element={<Dashboard />} /></Route>
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<PrivateRoutes requiredRoles={["Admin"]}/>}> <Route path="/users" element={<UserDashboard />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/users/:userId/edit" element={<EditUserPage />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/game" element={<Game />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["Admin"]}/>}> <Route path="/cards" element={<CardsPage />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["Admin"]}/>}> <Route path="/cards/:cardId/edit" element={<EditCardPage />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/decks" element={<DecksPage />} /></Route>
          <Route element={<PrivateRoutes requiredRoles={["User", "Admin"]}/>}> <Route path="/account" element={<OwnUserRedirect />} /></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;