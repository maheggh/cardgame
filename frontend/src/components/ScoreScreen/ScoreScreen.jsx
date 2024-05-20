import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import './style.css';

function ScoreScreen({ players, missionCards, onScoreChange, onSubmitScores }) {
  const [scores, setScores] = useState(
    players.map(player => ({
      playerName: player.name,
      missionScores: missionCards.map(() => 0)
    }))
  );

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const navigate = useNavigate();

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

  const handlePlayAgain = () => {
    window.location.reload();
  };
  
  const totalScores = scores.map(score => ({
    playerName: score.playerName,
    totalScore: score.missionScores.reduce((a, b) => a + b, 0)
  })).sort((a, b) => b.totalScore - a.totalScore);

  const particlesOptions = {
    particles: {
      number: {
        value: 200,
      },
      size: {
        value: 5,
        random: true,
      },
      move: {
        direction: "bottom",
        outMode: "out",
      },
      shape: {
        type: ["circle", "star"],
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <>
    <div className="score-page">
    <h1>Score participants</h1>
    <div className="score-screen">
        
      {!showLeaderboard ? (
        <>
          <h2>Missions</h2>
          <div className="mission-cards">
            {missionCards.map((card, index) => (
              <div key={index} className="mission-card">
                <h2>{card.name}</h2>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
          <ul>
            <h1>Rate player performance</h1>
            {players.map((player, playerIndex) => (
              <li key={playerIndex}>
                <img src={`../../assets/avatars/${player.avatar}.png`} alt={player.name} className="player-avatar" />
                <span>{player.name}</span>
                <div className="player-scores">
                  {missionCards.map((_, missionIndex) => (
                    <div key={missionIndex} className="mission-score">
                      <label>Mission {missionIndex + 1}: </label>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`star ${scores[playerIndex].missionScores[missionIndex] >= star ? 'selected' : ''}`}
                          onClick={() => handleScoreChange(playerIndex, missionIndex, star)}
                        >☆</span>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button className="submit-button" onClick={handleSubmitScores}>Submit Scores</button>
        </>
      ) : (
        <>
          <Particles options={particlesOptions} className="particles" />
          <div className="leaderboard">
            <h1>Leaderboard</h1>
            <ol>
              {totalScores.map((score, index) => (
                <li key={index}>
                  {index === 0 && <img src="../../../assets/scorescreen/gold.png" alt="Gold Medal" className="medal" />}
                  {index === 1 && <img src="../../../assets/scorescreen/silver.png" alt="Silver Medal" className="medal" />}
                  {index === 2 && <img src="../../../assets/scorescreen/bronze.png" alt="Bronze Medal" className="medal" />}
                  <img src={`../../assets/avatars/${players.find(player => player.name === score.playerName).avatar}.png`} alt={score.playerName} className="leader-avatar" />
                  <span>{score.playerName}</span>
                  <span>{score.totalScore}</span>
                </li>
              ))}
            </ol>
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
