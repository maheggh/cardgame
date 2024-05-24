import React from 'react';
import './style.css';

const RatingDisplay = ({rating}) => {

    const fullStars = Math.round(rating);
    const emptyStars = 5 - (fullStars ? fullStars : 0);

    const renderStars = () => {
        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i className="fa-solid fa-star" key={i} style={{color: '#056A92'}}/>);
        }


        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i className="fa-solid fa-star" key={`empty-${i}`} style={{color: '#d3d3d3'}}/>);
        }

        return stars;
    };

    return (
        <div className="star-rating">
            <span><b>{rating ? Math.round(rating * 10) / 10 : "-"}/5 </b></span>
            {renderStars()}
        </div>
    );
}

export default RatingDisplay;