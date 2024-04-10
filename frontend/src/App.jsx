import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
//import UserContext from './UserContext.js';
import Header from './components/Header/';
import Login from './pages/login/';
import Signup from './pages/signup/';
import Welcome from './pages/welcome/';
import Dashboard from './pages/dashboard/';
//import CardsList from "./cardList";
import FileUpload from "./pages/fileupload";
//import generatePDF from "./helpers/pdfGenerator";
import PrivateRoutes from './helpers/PrivateRoute.jsx';

const handleGeneratePDF = (selectedCards) => {
  generatePDF(selectedCards);
};

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  });

  return (
    
      <Router>
        <Header isLoggedIn={user}/>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes token={user}/>}> <Route path="/dashboard" element={<Dashboard />} /></Route>
          <Route path="/fileUpload" element={<FileUpload />} />
        </Routes>
      </Router>
    
  );
}

export default App;