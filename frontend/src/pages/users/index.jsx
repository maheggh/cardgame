import React, { useState, useEffect } from 'react';
import { usersAuthorize } from '../../api/api.js';
import './style.css';
import EditIcon from'./editIcon.png'

function navigateToEditPage(userId) {
  // Navigate to the edit page for the user with the given ID
  // The exact code here will depend on how your routing is set up
  history.push(`/edit-user/${userId}`);
}

const User = ({ user }) => (
  <div className='users_screen_list_item'>
    <p><span className='bold'>Name:</span> {user.name}</p>
    <p><span className='bold'>Surname:</span> {user.surname}</p>
    <p><span className='bold'>Email:</span> {user.email}</p>
    <p><span className='bold'>University:</span> {user.university}</p>
    <p><span className='bold'>Department:</span> {user.department}</p>
    <p><span className='bold'>Position:</span> {user.position}</p>
    <button onClick={() => navigateToEditPage(user.id)}>
        <img src={EditIcon} alt="Edit" />
    </button>
  </div>
);

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
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;