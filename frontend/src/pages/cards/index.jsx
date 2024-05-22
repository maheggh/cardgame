import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import ErrorMessage from '../../components/ErrorMessage';
import { getAllCards } from '../../API/cards'; 
import Card from '../../components/CardInfo';

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCards = async () => {
      try {
      const allCards = await getAllCards();
       setCards(allCards);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data: ', error);
      }
    };

    getCards();
  }, []);

  const navigate = useNavigate(); 

  const navigateToEditPage = (id) => {
    console.log(id);
    navigate(`/cards/${id}/edit`);
  };

  return (
    <div className='cards_screen'>
      {isLoading == false ? (<>
          {cards.length > 1 ? (<>
              <h1>Cards</h1>
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