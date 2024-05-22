import React, { useState, useEffect } from 'react';
import RatingDisplay from '../RatingDisplay';
import MiniCard from '../MiniCard';
import { getAvgRating, getUserName, rateScheme, isRated } from '../../helpers/api.js'; 
import './style.css';

const SchemeCard = ({ data, onDelete }) => {
  const [rating, setRating] = useState('');
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [ratedByUser, setRatedByUser] = useState(false);

  useEffect(() => {
    getAvgRating(data._id).then(data => setRating(data));
    getUserName(data.creator).then(data => setUsername(data));
    isRated(data._id).then(data => {
      setRatedByUser(true);
      setUserRating(data.score);
    });
  }, [ratedByUser]);

  const handleSubmitRating = () => {
    const score = userRating;
    const schemeId = data._id;
    if (!userRating) {
      alert("No rating has been registered");
    }
    if (userRating) {
      rateScheme(score, schemeId).then(setRatedByUser(true));
    }
  };

  return (
    <div className="scheme-card">
      <div className="scheme-header">
        <div className="scheme-title">
          <h1>{data['scheme-name'] ? data['scheme-name'] : ("--") }</h1>
          <p className="scheme-creator">{username ? (username.name + " " + username.surname) : "Unknown user"}</p>
        </div>
        {rating ? <RatingDisplay rating={rating.averageRating}/> : <p className="not-rated">No ratings yet</p>}
      </div>
      <div className="card-holder">
        <MiniCard cardId={data['card-artefact']} type={'artefact'}/>
        <MiniCard cardId={data['card-assessor']} type={'assessor'}/>
        <MiniCard cardId={data['card-context']} type={'context'}/>
        <MiniCard cardId={data['card-format']} type={'format'}/>
        <MiniCard cardId={data['card-timing']} type={'timing'}/>
        <MiniCard cardId={data['card-who-is']} type={'who'}/>
        <MiniCard cardId={data['card-mission-one']} type={'mission'}/>
        <MiniCard cardId={data['card-mission-two']} type={'mission'}/>
        <MiniCard cardId={data['card-mission-three']} type={'mission'}/>
      </div>
      <div className="scheme-buttons">
        <p><b>{ratedByUser ? "Your rating:" : "You haven't rated this yet!"}</b></p>
        <div className="star-holder">
          {[...Array(5)].map((star, i) => {
            const ratingVal = i + 1;
            return <i className={ratedByUser ? "fa-solid fa-star rating-star disabled" : "fa-solid fa-star rating-star"} style={ratingVal <= (userRating || hover) ? { color: '#056A92'} : { color: '#d3d3d3'}} key={i} onClick={() => {!ratedByUser ? setUserRating(ratingVal) : ""}} onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}/>
          })}
        </div>
        <button onClick={() => handleSubmitRating()} disabled={ratedByUser}>Rate!</button>
        <button className="delete-button" onClick={() => onDelete(data._id)}>Delete</button>
      </div>
    </div>
  );
}

export default SchemeCard;
