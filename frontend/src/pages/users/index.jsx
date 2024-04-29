import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { usersAuthorize } from '../../helpers/api.js';
import '../users/style.css';
import UserCard from '../../components/UserCard/';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth token found');
          return;
        }
        const allUsers = await usersAuthorize(authToken);
        setUsers(allUsers);
      } catch (error) {
        console.error('Error:', error);
        console.log(authToken);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div className='users_screen'>
      <h1>Users</h1>
      <div className='users_screen_list'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;