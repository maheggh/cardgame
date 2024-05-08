import React from 'react';
import './style.css';

const StatCounter = (props) => {

    return (
        <div className="info-card">
            <p className="number">{props.number ? props.number : ("??") }</p>
            <p className="subtitle">{props.title}</p>
        </div>
    );
}

export default StatCounter;