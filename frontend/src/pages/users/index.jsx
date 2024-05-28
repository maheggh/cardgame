import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../helpers/api.js';
import '../users/style.css';
import UserCard from '../../components/UserCard/';
import ErrorMessage from '../../components/ErrorMessage';

const UserDashboard = () => {
  // State to store user data
  const [users, setUsers] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch all users
    const getUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        // Set the fetched users to the state
        setUsers(allUsers);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setIsLoading(false); // Set loading to false in case of error
        console.error('Error:', error);
      }
    };

    getUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className='users_screen'>
      {/* Conditional rendering based on loading status */}
      {isLoading == false ? (
        <>
          {/* Conditional rendering based on users length */}
          {users.length > 1 ? (
            <>
              <h1>Users</h1>
              <div className='users_screen_list'>
                {/* Render UserCard for each user */}
                {users.map((user, index) => (
                  <UserCard key={index} user={user} />
                ))}
              </div>
            </>
          ) : (
            // Render error message if users length is less than or equal to 1
            <ErrorMessage error="401" subtitle="Unauthorized" text="Sorry, you need to be authorized to access this information"/>
          )}
        </>
      ) : (
        // Render loading message while data is being fetched
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default UserDashboard;
