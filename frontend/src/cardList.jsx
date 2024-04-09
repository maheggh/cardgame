import React from 'react';

const CardsList = ({ cards }) => {
  return (
    <div className="cards-list">
      {cards.map((card) => (
        <div key={card['card-id']} className="card-item">
          <h3>{card['card-name']}</h3>
          
          {card['card-type'] === 'Assessment' && <p>Category: {card['card-category']}</p>}
          <p>Description: {card['card-description']}</p>
          {card['card-details'] && <p>Details: {card['card-details']}</p>}
        </div>
      ))}
    </div>
  );
};

export default CardsList;