import React, { useState, useEffect } from "react";
import CardsList from "../../cardList";
import FileUpload from "../../helpers/fileUpload.jsx";
import generatePDF from "../../helpers/pdfGenerator";
import "./style.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);

  // Function that handles the PDF generation for selected cards
  const handleGeneratePDF = (selectedCards) => {
    generatePDF(selectedCards);
  };

  // Function to handle card click (future use for generating images)
  const handleCardClick = (card) => {
    console.log("Clicked card:", card);
    // You can set up logic here to generate or display the card's image
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
            <li key={card['_id']} onClick={() => handleCardClick(card)} style={{cursor: 'pointer'}}>
              {card['card-type']} - {card['card-category']}: {card['card-name']}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => handleGeneratePDF(cards)} className="button generate-pdf-button">
        Generate PDF
      </button>
    </div>
  );
};

export default App;
