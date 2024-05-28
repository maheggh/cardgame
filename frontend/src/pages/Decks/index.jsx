import React, { useState, useEffect } from 'react';
import './style.css';
// Importing API methods
import { getAllUserBookmarks } from '../../API/bookmarks';
import { getAllSchemes, deleteScheme, getSingleScheme } from '../../API/schemes';
import { getAvgRating, isRated } from '../../API/ratings';
// Importing DeckCard component
import DeckCard from '../../components/DeckCard';

function SchemesPage() {
    // State variables
    const [schemes, setSchemes] = useState([]);
    const [favSchemes, setFavSchemes] = useState([]);
    const [showBookmarked, setShowBookmarked] = useState (false);
    const [error, setError] = useState(null);

    // Fetching schemes and bookmarks on component mount
    useEffect(() => {
        getSchemes();
        getBookmarks();
    }, []);

    // Fetching all schemes
    const getSchemes = async () =>{
        getAllSchemes()
        .then(data => setSchemes(data))
        .catch(error => console.error(error));  
    }

    // Fetching all user bookmarks
    const getBookmarks = async () =>{
        getAllUserBookmarks()
        .then(data => setFavSchemes(data))
        .catch(error => console.error(error));  
    }

    // Deleting a scheme
    const handleDelete = async (id) => {
        try {
            await deleteScheme(id);
            setSchemes(prevSchemes => prevSchemes.filter(scheme => scheme._id !== id));
        } catch (error) {
            console.error('Error deleting scheme:', error);
        }
    };

    // If there's an error, render an error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handling bookmarking and unbookmarking
    const handleBookmark = ({data, bookmarked}) => {
        if(bookmarked){
            setFavSchemes([...favSchemes, data]);
        }
        if(!bookmarked){
            setFavSchemes(favSchemes.filter(item => item !== data));
            getSchemes();
        }
    }

    // Rendering the component
    return (
        <div className="content-wrapper">
            <h1 className="title title-with-buttons">Decks</h1>
            <div className="pill-box">
                <button className={`pill ${!showBookmarked ? 'active' : ''}`} onClick={() => setShowBookmarked(false)}>All decks</button>
                <button className={`pill ${showBookmarked ? 'active' : ''}`} onClick={() => setShowBookmarked(true)}>Bookmarks</button>
            </div>
            <div className={`schemecard-container ${!showBookmarked ? 'active' : ''}`}>
            {schemes.length > 0 ? schemes.map(scheme => (
                <DeckCard data={scheme} key={scheme._id} onDelete={handleDelete} onBookmark={handleBookmark}/>
            )) : (
                <div>No decks available</div>
            )}
            </div>
            <div className={`schemecard-container ${showBookmarked ? 'active' : ''}`}>
            {favSchemes.length > 0 ? favSchemes.map(scheme => (
                <DeckCard data={scheme} key={scheme._id} onDelete={handleDelete} onBookmark={handleBookmark}/>
            )) : (
                <div>No bookmarked decks</div>
            )}
            </div>
        </div>
    );
}

export default SchemesPage;