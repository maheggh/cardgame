import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style.css'
import StatCounter from '../../components/StatCounter/';
import { getUserId } from '../../API/users';  

function OwnUserRedirect() {
  const navigate = useNavigate(); 
  useEffect(() => {
    getUserId()
      .then(data => navigate(`/users/${data._id}/edit`))
      .catch(error => console.error(error));
  }, []);

  return (
    <></>
  );
}

export default OwnUserRedirect;