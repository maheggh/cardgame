const URL = 'http://localhost:3000/users/';

export const fetchUser = (userId, token2) => {
  return fetch(`${URL}${userId}`, {
    headers: {
      'auth-token': `Bearer ${token2}`, 
    },
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
};

export const updateUser = (userId, user, token2) => {
  return fetch(`${URL}${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': `Bearer ${token2}`,
    },
    body: JSON.stringify(user),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};

export const deleteUser = (userId, token2) => {
  return fetch(`${URL}${userId}`, {
    method: 'DELETE',
    headers: {
      'auth-token': `Bearer ${token2}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};