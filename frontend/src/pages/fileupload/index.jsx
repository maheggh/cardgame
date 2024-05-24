import React, { useState, useEffect } from "react";
import CardsList from "../../cardList";
import FileUpload from "./fileUpload.jsx";
import "./style.css";
import MakePDF from './pdf-file/pdf-logic.jsx';

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [selectedCardsForPDF, setSelectedCardsForPDF] = useState([]);

  useEffect(() => {
    // Load favorite cards from local storage
    const loadFavoriteCards = () => {
      const storedFavorites = localStorage.getItem('FAVOURITE_CARDS_LIST_STORE');
      if (storedFavorites) {
        setFavoriteCards(JSON.parse(storedFavorites));
      }
    };

    loadFavoriteCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCardsForPDF(prevCards => {
      if (prevCards.some(selectedCard => selectedCard['_id'] === card['_id'])) {
        return prevCards.filter(selectedCard => selectedCard['_id'] !== card['_id']);
      } else {
        return [...prevCards, card];
      }
    });
  };

  return (
    <div className="content-wrapper uploadWrapper">
      <h1 className="app-title">Cards Upload</h1>
      <FileUpload setCards={setCards} />
      
      {cards.length > 0 && (
        <CardsList cards={cards} setCards={setCards} className="cards-list" />
      )}

      <div className="favorite-cards-container">
        <h2>Favorite Cards</h2>
        <ul>
          {favoriteCards.map((card) => (
            <li 
              key={card['_id']} 
              onClick={() => handleCardClick(card)} 
              style={{cursor: 'pointer', backgroundColor: selectedCardsForPDF.some(selectedCard => selectedCard['_id'] === card['_id']) ? '#DDD' : 'transparent'}}
            >
              {card['card-id']}: {card['card-type']}: {card['card-category']}: {card['card-name']}
            </li>
          ))}
        </ul>
      </div>

      <MakePDF />
    </div>
  );
};

export default App;
