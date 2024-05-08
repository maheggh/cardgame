const URL = 'http://localhost:3000/api/users/';


// Fetch user data
export const fetchUser = (userId) => {
  return fetch(`${URL}${userId}`, { credentials: 'include' })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};


// Update user data
export const updateUser = (userId, user) => {
  return fetch(`${URL}${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include' 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};

// Delete user
export const deleteUser = (userId) => {
  return fetch(`${URL}${userId}`, {
    method: 'DELETE',
    credentials: 'include' 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};