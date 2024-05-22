import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import ErrorMessage from '../../components/ErrorMessage';
import { getAllCards } from '../../API/cards'; 

const Card = ({ card, navigateToEditPage }) => (
  <div className='card-page_card-container'>
        <div className='one-card'>
          <div className='one-card_upper'>
            <p><span>ID:</span> {card['card-id']}</p>
            <p><span>Type:</span> {card['card-type']}</p>
            <p><span>Category:</span> {card['card-category']}</p>
            <p><span>Name:</span> {card['card-name']}</p>
          </div>
          <div className='one-card-bottom'>
            <p><span>Description:</span> {card['card-description']}</p>
            <p><span>Details:</span> {card['card-details']}</p>
          </div>
        </div>
        <button onClick={() => navigateToEditPage(card['_id'])}>
          <i className="fa-solid fa-pencil" style={{color: "#FFF"}}/>
        </button>
  </div>
);

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const getCards = async () => {
      try {
       getAllCards().then(data => setCards(data));
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
      {isLoading === false ? (
        <>
          {cards.length > 0 ? (
            <>
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CardsPage;