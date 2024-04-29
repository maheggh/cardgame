import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserCard = ({ user }) => {
  const navigate = useNavigate(); // Get the navigate function

  const navigateToEditPage = () => {
    // Use user._id instead of user.id
    navigate(`/users/${user._id}/edit`);
  };

    return (
    <div className='users_screen_list_item'>
      <p><span className='bold'>Name:</span> {user.name}</p>
      <p><span className='bold'>Surname:</span> {user.surname}</p>
      <p><span className='bold'>Email:</span> {user.email}</p>
      <p><span className='bold'>University:</span> {user.university}</p>
      <p><span className='bold'>Department:</span> {user.department}</p>
      <p><span className='bold'>Position:</span> {user.position}</p>
      <button onClick={() => navigateToEditPage(user._id)}>
          
      <i className="fa-solid fa-pencil" style={{color: "#FFF"}}/>
      </button>
    </div>
    );
}

export default UserCard;