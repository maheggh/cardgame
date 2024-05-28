const API_URL = '/api';

//gets all cards
export async function getAllCards(token){
    const response = await fetch(`${API_URL}/cards`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function getTotalCards() {
    const response = await fetch(`${API_URL}/cards/total`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total cards');
    }

    const totalCards = await response.json();
    return totalCards.toString();
}

export async function getTotalCardTypes() {
    const response = await fetch(`${API_URL}/cards/types`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total card types');
    }

    const totalCardTypes = await response.json();
    return totalCardTypes.toString();
}

export async function getSingleCard(id) {
    const response = await fetch(`${API_URL}/cards/${id}`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total schemes');
    }

    return response.json();
}

export const updateCard = (cardId, card) => {
  return fetch(`${API_URL}/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
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

export const deleteCard = (cardId) => {
  return fetch(`${API_URL}/cards/${cardId}`, {
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
