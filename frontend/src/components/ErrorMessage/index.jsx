import React from 'react';
import './style.css';

const ErrorMessage = (props) => {

    return (
        <div className="errorMessage">
          <h1 className="errorTitle">{props.error}</h1>
          <p className="errorSubTitle">{props.subtitle}</p>
          <p className="errorText">Sorry, you need to be authorized to access this information</p>
          <a href="/" className="centerText">back to homepage</a>
        </div>
    );
}

export default ErrorMessage;