import React from 'react';
import RatingDisplay from '../RatingDisplay';
import './style.css';

const SchemeCard = ({ name, user, rating }) => {

    return (
        <div className="scheme-card">
            <div className="scheme-header">
                <div className="scheme-title">
                    <h1>{name ? name : ("--") }</h1>
                    <p className="scheme-creator">{user}</p>
                </div>
                <RatingDisplay rating={rating}/>
            </div>
        </div>
    );
}

export default SchemeCard;