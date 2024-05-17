import React, { useState, useEffect } from 'react';
import StartScreen from '../../components/GameComponents/StartScreen';  
import './style.css';

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actionTaken, setActionTaken] = useState(false);
  const [showTurnModal, setShowTurnModal] = useState(false);

  const startGame = (players) => {
    setPlayers(players);
    setGameStarted(true);
    setCurrentPlayerIndex(0);
    setShowTurnModal(true);
    setTimeout(() => setShowTurnModal(false), 3000); // Display modal for 3 seconds
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setActionTaken(false);
    setShowTurnModal(true);
    setTimeout(() => setShowTurnModal(false), 3000); // Display modal for 3 seconds
  };

  useEffect(() => {
    import("./../../components/MissionCard");
    import("./../../components/AssessmentCard");
    import("./../../components/DrawPile");
  }, []);

  //if (!gameStarted) {
  //  return <StartScreen onStartGame={startGame} />;
  //}
  
  const refreshAllCards = () => {
    const event = new CustomEvent('refreshCards', { bubbles: true, composed: true });
    document.querySelector('.gameBoard').dispatchEvent(event);
    handleAction();
  };

  const handleAction = () => {
    setActionTaken(true);
    setTimeout(nextPlayer, 1000); 
  };

return (
  <>
    <div className="game-container">
      {showTurnModal && (
        <div className="turn-modal">
          <img src={`../../assets/avatars/${players[currentPlayerIndex].avatar}.png`} alt="Current Player" className="player-avatar" />
          <h2>{players[currentPlayerIndex].name}'s Turn</h2>
        </div>
      )}
      <main className="gameBoard">
        <h1>Mission cards (x3)</h1>
        <div className="card-container">
          <super-mission-card card-id="mission1"></super-mission-card>
          <super-mission-card card-id="mission2"></super-mission-card>
          <super-mission-card card-id="mission3"></super-mission-card>
        </div>
        <h1>Assessment cards (x6)</h1>
        <div className="card-container">
          <super-assessment-card card-category="assessed"></super-assessment-card>
          <super-assessment-card card-category="assessor"></super-assessment-card>
          <super-assessment-card card-category="artefact"></super-assessment-card>
          <super-assessment-card card-category="format"></super-assessment-card>
          <super-assessment-card card-category="context"></super-assessment-card>
          <super-assessment-card card-category="timing"></super-assessment-card>
        </div>
      </main>
      <aside className="draw-container">
        <h1 className="draw-pile-text">Draw Pile:</h1>
        <div className="draw-pile-container">
          <div className="draw-pile-right">
            <draw-pile category="assessed"></draw-pile>
            <draw-pile category="assessor"></draw-pile>
            <draw-pile category="artefact"></draw-pile>
            <draw-pile category="format"></draw-pile>
            <draw-pile category="context"></draw-pile>
            <draw-pile category="timing"></draw-pile>
          </div>
        </div>
        <div className="playbutton-container">
          <button className="randomize-button" onClick={refreshAllCards} disabled={actionTaken}>Refresh Cards</button>
          <button className="endgame-button">END GAME</button>
        </div>
      </aside>
    </div>
  </>
);
}

export default Game;
