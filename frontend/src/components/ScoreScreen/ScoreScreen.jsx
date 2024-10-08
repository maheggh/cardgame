import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import MiniCard from '../MiniCard';
import './style.css';


function ScoreScreen({ players, missionCards, finalScheme, onScoreChange, onSubmitScores, onSubmitAndSave, onTextChange }) {
  const [scores, setScores] = useState(
    players.map(player => ({
      playerName: player.name,
      missionScores: missionCards.map(() => 0)
    }))
  );

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScoreChange = (playerIndex, missionIndex, score) => {
    const newScores = [...scores];
    newScores[playerIndex].missionScores[missionIndex] = score;
    setScores(newScores);
    onScoreChange(newScores);
  };

  const handleSubmitScores = () => {
    setShowLeaderboard(true);
    onSubmitScores(scores);
  };

  const handleSubmitAndSave = () => {
    setShowLeaderboard(true);
    onSubmitAndSave();
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const totalScores = scores.map(score => ({
    playerName: score.playerName,
    totalScore: score.missionScores.reduce((a, b) => a + b, 0)
  })).sort((a, b) => b.totalScore - a.totalScore);

  return (
    <>
      {showLeaderboard && <Confetti width={windowSize.width} height={windowSize.height} />}
      <div className="score-page">
        <h1>Score participants</h1>
        <div className="score-screen">
          {!showLeaderboard ? (
            <>
              <h1 className="title">Assement cards</h1>
              <div className="mission-cards">

                <MiniCard cardId={finalScheme['card-artefact']} type={'artefact'}/>
                <MiniCard cardId={finalScheme['card-assessor']} type={'assessor'}/>
                <MiniCard cardId={finalScheme['card-context']} type={'context'}/>
                <MiniCard cardId={finalScheme['card-format']} type={'format'}/>
                <MiniCard cardId={finalScheme['card-timing']} type={'timing'}/>
                <MiniCard cardId={finalScheme['card-who-is']} type={'who'}/>            
              </div>
              <h1 className="title">Missions</h1>
              <div className="mission-cards">
                {missionCards.map((card, index) => (
                  <MiniCard cardId={card}type={'mission'} key={index}/>
                ))}              
              </div>
              <h1  className="title">Rate player performance</h1>
              <ul>
                {players.map((player, playerIndex) => (
                  <li key={playerIndex}>
                    <div className="player-info">
                      <img src={`../../assets/avatars/${player.avatar}.png`} alt={player.name} className="player-avatar" />
                      <span>{player.name}</span>
                    </div>
                    <div className="player-scores">
                      {missionCards.map((_, missionIndex) => (
                        <div key={missionIndex} className="mission-score">
                          <label>Mission {missionIndex + 1}: </label>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span
                              key={star}
                              className={`star ${scores[playerIndex].missionScores[missionIndex] >= star ? 'selected' : ''}`}
                              onClick={() => handleScoreChange(playerIndex, missionIndex, star)}
                            ><i className="fa-solid fa-star" /></span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <p>Name your Scheme:</p>
                <input
                type="text"
                placeholder={finalScheme['scheme-name']}
                value={finalScheme['scheme-name']}
                onChange={(e) => onTextChange(e.target.value)}
              />
              <button className="submit-button" onClick={handleSubmitScores}>Submit Scores only</button>
              <button className="submit-button" onClick={handleSubmitAndSave}>Submit Scores and Save scheme</button>
            </>
          ) : (
            <>
              <Confetti width={windowSize.width} height={windowSize.height} />
              <div className="leaderboard">
                <h1>Leaderboard</h1>
                <div className="podium">
                  {totalScores[1] && (
                    <div className="user-places second-place">
                      <div className="podium-platform podium-platform-2">2</div>
                      <div className="player-info">
                        <img src={`../../assets/avatars/${players.find(player => player.name === totalScores[1].playerName).avatar}.png`} alt={totalScores[1].playerName} className="player-avatar" />
                        <img src="../../../assets/scorescreen/silver.png" alt="Silver Medal" className="medal" />
                        <span>{totalScores[1].playerName}</span>
                        <span>{totalScores[1].totalScore}</span>
                      </div>
                    </div>
                  )}
                  {totalScores[0] && (
                    <div className="user-places first-place">
                      <div className="podium-platform podium-platform-1">1</div>
                      <div className="player-info">
                        <img src={`../../assets/avatars/${players.find(player => player.name === totalScores[0].playerName).avatar}.png`} alt={totalScores[0].playerName} className="player-avatar" />
                        <img src="../../../assets/scorescreen/gold.png" alt="Gold Medal" className="medal" />
                        <span>{totalScores[0].playerName}</span>
                        <span>{totalScores[0].totalScore}</span>
                      </div>
                    </div>
                  )}
                  {totalScores[2] && (
                    <div className="user-places third-place">
                      <div className="podium-platform podium-platform-3">3</div>
                      <div className="player-info">
                        <img src={`../../assets/avatars/${players.find(player => player.name === totalScores[2].playerName).avatar}.png`} alt={totalScores[2].playerName} className="player-avatar" />
                        <img src="../../../assets/scorescreen/bronze.png" alt="Bronze Medal" className="medal" />
                        <span>{totalScores[2].playerName}</span>
                        <span>{totalScores[2].totalScore}</span>
                      </div>
                    </div>
                  )}
                </div>
                <h2 className='other-text'>Other Participants</h2>
                <ul className="other-participants">
                  {totalScores.slice(3).map((score, index) => (
                    <li key={index} className="participant">
                      <span>{index + 4}. {score.playerName} - {score.totalScore}</span>
                    </li>
                  ))}
                </ul>
                <button className="play-again-button" onClick={handlePlayAgain}>Play Again</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ScoreScreen;
