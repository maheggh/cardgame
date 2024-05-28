import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './style.css';
import ErrorMessage from '../../components/ErrorMessage'; 
import FileUpload from '../../components/FileUpload'; 
import { getAllCards } from '../../API/cards'; 
import Card from '../../components/CardInfo'; 

const CardsPage = () => {
  const [cards, setCards] = useState([]); // State for storing cards
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  // Fetching all cards on component mount
  useEffect(() => {
    const getCards = async () => {
      try {
        const allCards = await getAllCards();
        setCards(allCards);
        setIsLoading(false); // Set loading status to false after fetching
      } catch (error) {
        setIsLoading(false); // Set loading status to false even if there's an error
        console.error('Error fetching data: ', error);
      }
    };

    getCards();
  }, []);

  const navigate = useNavigate(); // Hook for navigation

  // Function for navigating to the edit page of a card
  const navigateToEditPage = (id) => {
    navigate(`/cards/${id}/edit`);
  };

  // Rendering the component
  return (
    <div className='cards_screen'>
      {isLoading == false ? (
        <>
          {cards.length > 1 ? (
            <>
              <h1>Cards</h1>
              <FileUpload/>
              <div className='cards_screen_list'>
                {cards.map(card => (
                  <Card key={card['_id']} card={card} navigateToEditPage={navigateToEditPage} />
                ))}
              </div>
            </>
          ) : (
            <ErrorMessage error="401" subtitle="Unauthorized" text="Sorry, you need to be authorized to access this information"/>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default CardsPage;