import React from 'react';

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

export default Card;