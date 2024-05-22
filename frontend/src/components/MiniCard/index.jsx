import React, { useState, useEffect } from 'react';
import './style.css';
import { getSingleCard } from '../../helpers/api.js'; 

const MiniCard = ({cardId, type}) => {
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    getSingleCard(cardId).then(data => setCardInfo(data));
  }, []);

    if (cardInfo != null) {
        return (
            <div className={`mini-card ${type}`}>
                <div className="mini-card-header">{type!="mission" ? cardInfo['card-category'] : "MISSION" }</div>
                <div className="mini-card-content">
                    <h1>{cardInfo['card-name']}</h1>
                    <p>{cardInfo['card-description']}</p>
                    {type!="mission" ? (
                    <>
                    <h2>How?</h2>
                    <p>{cardInfo['card-details']}</p>    
                    </>) : (<></>)}
                </div>
            </div>
        );
    }
    return <></>;
}

export default MiniCard;