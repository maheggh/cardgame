import React, { useState, useEffect } from 'react';
import './style.css';
import { getAllSchemes, deleteScheme, getAvgRating, isRated } from '../../helpers/api.js';
import DeckCard from '../../components/DeckCard';

function SchemesPage() {
    const [schemes, setSchemes] = useState([]);
    const [favSchemes, setFavSchemes] = useState([]);
    const [showBookmarked, setShowBookmarked] = useState (false);
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
            <h1 className="title title-with-buttons">Decks</h1>
            <div className="pill-box">
                <button className={`pill ${!showBookmarked ? 'active' : ''}`} onClick={() => setShowBookmarked(false)}>All decks</button>
                <button className={`pill ${showBookmarked ? 'active' : ''}`} onClick={() => setShowBookmarked(true)}>Bookmarks</button>
            </div>
            <div className={`schemecard-container ${!showBookmarked ? 'active' : ''}`}>
            {schemes.length > 0 ? schemes.map(scheme => (
                <DeckCard data={scheme} key={scheme._id} onDelete={handleDelete} />
            )) : (
                <div>No decks available</div>
            )}
            </div>
            <div className={`schemecard-container ${showBookmarked ? 'active' : ''}`}>
            {favSchemes.length > 0 ? favSchemes.map(scheme => (
                <DeckCard data={scheme} key={scheme._id} onDelete={handleDelete} />
            )) : (
                <div>No bookmarked decks</div>
            )}
            </div>
        </div>
    );
}

export default SchemesPage;
