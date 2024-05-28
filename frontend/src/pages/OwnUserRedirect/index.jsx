import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';
import StatCounter from '../../components/StatCounter/';
import { getUserId } from '../../API/users';  

function OwnUserRedirect() {
  const navigate = useNavigate(); // Initialize useNavigate hook to programmatically navigate

  useEffect(() => {
    // Fetch user ID and navigate to the user's edit page
    getUserId()
      .then(data => navigate(`/users/${data._id}/edit`)) // Navigate to user's edit page
      .catch(error => console.error(error)); 
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <></> // Return an empty fragment as this component only handles redirection
  );
}

export default OwnUserRedirect;
