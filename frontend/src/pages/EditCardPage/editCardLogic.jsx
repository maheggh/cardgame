const URL = 'http://localhost:3000/api/cards/';

export const useFetchCard = ( cardId ) => {
  const fetchCard = (cardId) => {
    console.log('Inside fetchCard, cardId:', cardId); // Log inside fetchCard
    return fetch(`${URL}${cardId}`, { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching card:', error);
        throw error;
      });
  };
  return { fetchCard };
};

export const updateCard = (cardId, card) => {
  return fetch(`${URL}${cardId}`, {
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
  return fetch(`${URL}${cardId}`, {
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
