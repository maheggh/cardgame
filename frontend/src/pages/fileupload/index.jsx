import React, { useState, useEffect } from "react";
import CardsList from "../../cardList";
import FileUpload from "../../helpers/fileUpload.jsx";
import { generatePDF } from '/src/helpers/pdfGenerator.js'; // Adjust the import path as necessary
import "./style.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [selectedCardsForPDF, setSelectedCardsForPDF] = useState([]);

  // Function to handle card click (to toggle selection for PDF)
  const handleCardClick = (card) => {
    // Check if card is already selected
    const isCardSelected = selectedCardsForPDF.some(selectedCard => selectedCard['_id'] === card['_id']);
    if (isCardSelected) {
      // Deselect the card
      setSelectedCardsForPDF(selectedCardsForPDF.filter(selectedCard => selectedCard['_id'] !== card['_id']));
    } else {
      // Select the card
      setSelectedCardsForPDF([...selectedCardsForPDF, card]);
    }
  };

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

      <button onClick={() => generatePDF(selectedCardsForPDF)} className="button generate-pdf-button">
        Generate PDF
      </button>
    </div>
  );
};

export default App;
