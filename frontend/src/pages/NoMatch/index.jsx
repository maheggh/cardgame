import React from 'react';
import './style.css'

function NoMatch() {
  return (
    <div className="content-wrapper">
      <h1 className="title jumbo centerText">OOPS! ¯\_(ツ)_/¯</h1>
      <p className="l-text centerText"> The page you're looking for is long gone. Sorry about that!</p><br/>
      <a href="/" className="centerText">back to homepage</a>
    </div>
  );
}

export default NoMatch;