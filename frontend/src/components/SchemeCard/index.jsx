import React from 'react';
import RatingDisplay from '../RatingDisplay';
import './style.css';

const SchemeCard = (props) => {

    return (
        <div className="scheme-card">
            <div className="scheme-header">
                <div className="scheme-title">
                    <h1>{props.props['scheme-name'] ? props.props['scheme-name'] : ("--") }</h1>
                    <p className="scheme-creator">{2}</p>
                </div>
                <RatingDisplay rating={2}/>
            </div>
        </div>
    );
}

export default SchemeCard;