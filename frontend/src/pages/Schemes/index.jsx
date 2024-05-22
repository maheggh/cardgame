import React, { useState, useEffect } from 'react';
import './style.css';
import { getAllSchemes, deleteScheme } from '../../helpers/api.js'; 
import SchemeCard from '../../components/SchemeCard';

function SchemesPage() {
  const [schemes, setSchemes] = useState(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = () => {
    getAllSchemes()
      .then(data => setSchemes(data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    deleteScheme(id)
      .then(() => {
        setSchemes(prevSchemes => prevSchemes.filter(scheme => scheme._id !== id));
      })
      .catch(error => console.error('Error deleting scheme:', error));
  };

  return (
    <div className="content-wrapper">
      <h1 className="title">Schemes</h1>
      {schemes ? schemes.map(scheme => (
        <SchemeCard data={scheme} key={scheme._id} onDelete={handleDelete} />
      )) : (<></>)}
    </div>
  );
}

export default SchemesPage;
