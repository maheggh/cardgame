import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UserContext from './UserContext.js';
import Header from './components/Header/';
import Login from './pages/login/';
import Signup from './pages/signup/';
import Welcome from './pages/welcome/';
import Dashboard from './pages/dashboard/';
//import CardsList from "./cardList";
import FileUpload from "./pages/fileupload";
//import generatePDF from "./helpers/pdfGenerator";

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
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fileUpload" element={<FileUpload />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;