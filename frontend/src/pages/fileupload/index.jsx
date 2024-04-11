import React, { useState, useEffect } from "react";
import CardsList from "../../cardList";
import FileUpload from "../../helpers/fileUpload.jsx";
import "./style.css";
import { generatePDF } from './pdf-file/pdf-logic.jsx';

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);



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

  return (
    <div className="app-container">
      <h1 className="app-title">Cards Upload</h1>
      <FileUpload setCards={setCards} />
      
      {cards.length > 0 && (
        <CardsList cards={cards} setCards={setCards} className="cards-list" />
      )}

      {/* Display favorite cards */}
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

        <button onClick={generatePDF} className="button generate-pdf-button">
          Generate PDF
        </button>
      </div>
  );
};

export default App;
