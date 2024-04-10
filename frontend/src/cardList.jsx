import React, { useState } from 'react';

const CardsList = ({ cards }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  // Handle checkbox change
  const handleSelectCard = (cardId) => {
    setSelectedCards(prevSelectedCards =>
      prevSelectedCards.includes(cardId)
        ? prevSelectedCards.filter(id => id !== cardId)
        : [...prevSelectedCards, cardId]
    );
  };

  // Assuming you have a generatePDF function
  const handleGeneratePDF = () => {
    // Filter cards that are selected
    const cardsToGenerate = cards.filter(card => selectedCards.includes(card['card-id']));
    generatePDF(cardsToGenerate);
  };

  return (
    <div className="cards-list">
      {cards.map((card) => (
        <div key={card['card-id']} className="card-item">
          <input
            type="checkbox"
            checked={selectedCards.includes(card['card-id'])}
            onChange={() => handleSelectCard(card['card-id'])}
          />
          <h3>{card['card-name']}</h3>
          {card['card-type'] === 'Assessment' && <p>Category: {card['card-category']}</p>}
          <p>Description: {card['card-description']}</p>
          {card['card-details'] && <p>Details: {card['card-details']}</p>}
        </div>
      ))}
      <button onClick={handleGeneratePDF}>Generate PDF from Selected</button>
    </div>
  );
};

export default CardsList;
