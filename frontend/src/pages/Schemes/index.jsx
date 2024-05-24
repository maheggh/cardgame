import React, { useState, useEffect } from 'react';
import './style.css';
import { getAllSchemes, deleteScheme, getAvgRating, isRated } from '../../helpers/api.js';
import SchemeCard from '../../components/SchemeCard';

function SchemesPage() {
    const [schemes, setSchemes] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    getSchemes();
  }, []);

    const getSchemes = async () =>{
          getAllSchemes()
      .then(data => setSchemes(data))
      .catch(error => console.error(error));  
    }

    const handleDelete = async (id) => {
        try {
            await deleteScheme(id);
            setSchemes(prevSchemes => prevSchemes.filter(scheme => scheme._id !== id));
        } catch (error) {
            console.error('Error deleting scheme:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content-wrapper">
            <h1 className="title">Schemes</h1>
            {schemes.length > 0 ? schemes.map(scheme => (
                <SchemeCard data={scheme} key={scheme._id} onDelete={handleDelete} />
            )) : (
                <div>No schemes available</div>
            )}
        </div>
    );
}

export default SchemesPage;
