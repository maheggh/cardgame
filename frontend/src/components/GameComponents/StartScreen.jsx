// StartScreen.jsx
import React, { useState } from 'react';
import './style.css';  // Ensure your CSS supports this setup

const StartScreen = ({ onStartGame }) => {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    const addPlayer = () => {
        setErrorMessage('');
        if (!newPlayerName) {
            setErrorMessage('Please enter a name for the player.');
            return;
        } 
        if (!selectedAvatar) {
            setErrorMessage('Please select an avatar.');
            return;
        }
        setPlayers([...players, { name: newPlayerName, avatar: selectedAvatar }]);
        setNewPlayerName('');
        setSelectedAvatar(null);
    };
  
    const removePlayer = index => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
    };
  
    const handleAvatarSelect = (avatar) => {
      setSelectedAvatar(avatar);
    };
  
    return (
        <>
      <div className="start-screen">
        <div className="modal">
        <h2>Game Setup</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                <img src={`../../../assets/avatars/${player.avatar}.png`} alt="Avatar" className="avatar-small" />
                {player.name}
                <button onClick={() => removePlayer(index)} className="close-button">X</button>
              </li>
            ))}
          </ul>
          {players.length < 20 && ( // Assuming max 20 players
            <>
              <input
                type="text"
                placeholder="Enter player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
              />
              <div className="avatar-selection">
                {[...Array(31).keys()].map(num => (
                  <img
                    key={num}
                    src={`../../../assets/avatars/${num + 1}.png`}
                    alt={`Avatar ${num + 1}`}
                    className={`avatar ${selectedAvatar === num + 1 ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelect(num + 1)}
                  />
                ))}
              </div>
              <div className="selection-button-container">
              <button onClick={addPlayer} className="confirm-button">Add Player</button>
                <button onClick={() => onStartGame(players)} className="start-game-button" disabled={players.length === 0}>Start Game</button>
              </div>
              <div className="error-message">{errorMessage}</div>
            </>
          )}
          
        </div>
      </div>
      </>
    );
  };
  
  
  export default StartScreen;