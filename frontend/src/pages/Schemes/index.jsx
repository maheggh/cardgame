import React, { useState, useEffect } from 'react';
import './style.css'
import { getAllSchemes, getTotalCards, getTotalCardTypes } from '../../helpers/api.js'; 
import SchemeCard from '../../components/SchemeCard';

function SchemesPage() {
  const [schemes, setSchemes] = useState(null);

  useEffect(() => {
    getAllSchemes()
      .then(data => setSchemes(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="title">Schemes</h1>
        {schemes ? schemes.map(card => (
          <SchemeCard props={card} rating={2.4} key={card._id}/>
        )) : (<></>)}
      
    </div>
  );
}

export default SchemesPage;