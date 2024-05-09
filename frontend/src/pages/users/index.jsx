import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAllUsers } from '../../helpers/api.js';
import '../users/style.css';
import UserCard from '../../components/UserCard/';
import ErrorMessage from '../../components/ErrorMessage';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className='users_screen'>
      {isLoading==false ? (<>
        {users.length > 1 ? (<>
          <h1>Users</h1>
          <div className='users_screen_list'>
            {users.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </>) : (<ErrorMessage error="401" subtitle="Unauthorized" text="Sorry, you need to be authorized to access this information"/>)}
        </>
      ) : (<p>Loading...</p>)}
    </div>
  );
};

export default UserDashboard;