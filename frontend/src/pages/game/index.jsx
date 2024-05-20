import React, { useState, useEffect } from 'react';
//import StartScreen from '../../components/StartScreen/StartScreen';
//import ScoreScreen from '../../components/ScoreScreen/ScoreScreen';
import './style.css';

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actionTaken, setActionTaken] = useState(false);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [interactionsDisabled, setInteractionsDisabled] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [missionCards, setMissionCards] = useState([]);

  const startGame = (players) => {
    setPlayers(players);
    setGameStarted(true);
    setCurrentPlayerIndex(0);
    setShowTurnModal(true);
    setTimeout(() => setShowTurnModal(false), 3000); // Display modal for 3 seconds
  };

  const endGame = () => {
    // Capture the mission cards being displayed
    const displayedMissionCards = Array.from(document.querySelectorAll('super-mission-card')).map(card => ({
      name: card.shadowRoot.querySelector('.card-header')?.innerText,
      description: card.shadowRoot.querySelector('.card-body')?.innerText
    }));
    setMissionCards(displayedMissionCards);
    setGameEnded(true);
  };

  const nextPlayer = () => {
    const actionCooldown = 3; // 3 seconds cooldown
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setActionTaken(true);
    setInteractionsDisabled(true); // Disable interactions
    setShowTurnModal(true);
    setCountdown(actionCooldown);
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setInteractionsDisabled(false); // Re-enable interactions
          setActionTaken(false);
          setShowTurnModal(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    import("./../../components/MissionCard");
    import("./../../components/AssessmentCard");
    import("./../../components/DrawPile");

    const handleActionTaken = () => {
      if (!actionTaken) { // Ensures that only one action can be taken at a time
        setActionTaken(true);
      }
    };

    // Listen for the custom event from the DrawPile component
    document.addEventListener('actionTaken', handleActionTaken);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('actionTaken', handleActionTaken);
    };
  }, [actionTaken]); // Re-run effect if actionTaken changes

  useEffect(() => {
    if (actionTaken) {
      setTimeout(() => {
        nextPlayer();
        setActionTaken(false); // Reset action taken after moving to the next player
      }, 1000);
    }
  }, [actionTaken]); // Depend on actionTaken to trigger this effect

  if (!gameStarted) {
    return <StartScreen onStartGame={startGame} />;
  }

  if (gameEnded) {
    return <ScoreScreen players={players} missionCards={missionCards} onScoreChange={() => {}} onSubmitScores={() => {}} />;
  }

  // Logic for refreshing all cards
  const refreshAllCards = () => {
    const event = new CustomEvent('refreshCards', { bubbles: true, composed: true });
    document.querySelector('.gameBoard').dispatchEvent(event);
    handleAction();
  };

  const handleAction = () => {
    if (!actionTaken) {
      setActionTaken(true);
    }
  };

  return (
    <>
      <div className={`game-container ${interactionsDisabled ? 'disabled-interactions' : ''}`}>
        {showTurnModal && (
          <div className="turn-modal">
            <img src={`../../assets/avatars/${players[currentPlayerIndex].avatar}.png`} alt="Current Player" className="player-avatar" />
            <h2>{players[currentPlayerIndex].name}'s Turn</h2>
            {countdown > 0 && <p>Next action in {countdown} seconds...</p>}
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
            <button className="endgame-button" onClick={endGame}>END GAME</button>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Game;
