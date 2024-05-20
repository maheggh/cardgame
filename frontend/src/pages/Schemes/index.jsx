import React, { useState, useEffect } from 'react';
import './style.css'
import { getTotalSchemes, getTotalCards, getTotalCardTypes } from '../../helpers/api.js'; 
import SchemeCard from '../../components/SchemeCard';

function SchemesPage() {
  const [schemes, setSchemes] = useState(null);

  useEffect(() => {
    getTotalSchemes()
      .then(data => setSchemes(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="title">Schemes</h1>
        {schemes.map(card => (
          <SchemeCard name={"New Name Scheme"} user={"John Doe"} rating={2.4}/>
        ))}
      
    </div>
  );
}

export default SchemesPage;