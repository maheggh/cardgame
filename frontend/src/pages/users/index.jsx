import React, { useState, useEffect } from 'react';
import { authorize } from '../../api/api.js';
import './style.css';

const User = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
    
  </div>
);

const UserDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await authorize('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE0MWEzNTllOTgwMWNmNTc5NzAzNDciLCJpYXQiOjE3MTI6ODgxNzUsImV4cCI6MTcxMjY4OTA3NX0.QeCek5tJ50Bgze2CmJ3m626a8UrHLRvzMdOhyMlMnn4');
        setUsers(allUsers);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
};

export default UserDashboard;