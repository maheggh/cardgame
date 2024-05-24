import React, { useState, useEffect } from 'react';
import RatingDisplay from '../RatingDisplay';
import ConfirmationDialog from '../ConfirmationDialog';

import MiniCard from '../MiniCard';
import { getAvgRating, rateScheme, isRated } from '../../API/ratings'; 
import { deleteScheme } from '../../API/schemes'; 
import { getUserName } from '../../API/users'; 
import './style.css';

const SchemeCard = ({data, onDelete}) => {
  const [rating, setRating] = useState('');
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [ratedByUser, setRatedByUser] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
      if(!userRating){
          alert("No rating has been registered");
      }
      if(userRating){
          rateScheme(score, schemeId).then(setRatedByUser(true));
      }
  }

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleShowConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    handleDelete(data._id);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };


    return (
        <div className="scheme-card">
            {showConfirmDialog && (
                <ConfirmationDialog
                message="Are you sure you want to delete this scheme?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                />
            )}
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
                <MiniCard cardId={data['card-mission-one']}type={'mission'}/>
                <MiniCard cardId={data['card-mission-two']}type={'mission'}/>
                <MiniCard cardId={data['card-mission-three']}type={'mission'}/>
            </div>

            <div className="buttons">
                <button className='delete-button' type="button" onClick={handleShowConfirmDialog}><i className="fa-solid fa-trash"/> Delete</button>
                <p><b>{ratedByUser ? "Your rating:" : "You haven't rated this yet!"}</b></p>
                <div className="star-holder">
                {[...Array(5)].map((star, i) => {
                    const ratingVal = i + 1;
                    return <i className={ratedByUser ? "fa-solid fa-star rating-star disabled" : "fa-solid fa-star rating-star"} style={ratingVal <= (userRating || hover) ? { color: '#056A92'} : { color: '#d3d3d3'}} key={i} onClick={() => {!ratedByUser ? setUserRating(ratingVal) : ""}} onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}/>
                })}                
                </div>
                <button onClick={() => handleSubmitRating()} disabled={ratedByUser}>Rate!</button>
            </div>
        </div>
    );
}

export default SchemeCard;