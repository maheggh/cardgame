import React, { useState, useEffect } from "react";
import CardsList from "../../cardList";
import FileUpload from "../../helpers/fileUpload.jsx";
import "./style.css";
import { generatePDF } from './pdf-file/pdf-logic.jsx';

const App = () => {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);



  useEffect(() => {
    // Assume favorite card IDs are stored in local storage
    const updateFavorites = () => {
      const storedFavorites = localStorage.getItem('FAVOURITE_CARDS_LIST_STORE');
      if (storedFavorites) {
        setFavoriteCards(JSON.parse(storedFavorites));
      }
    };

    // Call updateFavorites to initialize favorite cards list
    updateFavorites();

    // Optional: Listen for changes in favorites and update accordingly
    window.addEventListener('favoriteChanged', updateFavorites);

    return () => {
      window.removeEventListener('favoriteChanged', updateFavorites);
    };
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
        {favoriteCards.map(cardId => (
          <favourite-card key={cardId} card-id={cardId}></favourite-card>
        ))}
      </div>

        <button onClick={generatePDF} className="button generate-pdf-button">
          Generate PDF
        </button>
      </div>
  );
};

export default App;
