import React, { useState } from 'react';
import './style.css';

function ScoreScreen({ players, missionCards, onScoreChange, onSubmitScores }) {
  const [scores, setScores] = useState(
    players.map(player => ({
      playerName: player.name,
      missionScores: missionCards.map(() => 0)
    }))
  );

  const [showLeaderboard, setShowLeaderboard] = useState(false);

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

  const totalScores = scores.map(score => ({
    playerName: score.playerName,
    totalScore: score.missionScores.reduce((a, b) => a + b, 0)
  })).sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="score-screen">
      {!showLeaderboard ? (
        <>
          <h1>Final Scores</h1>
          <div className="mission-cards">
            {missionCards.map((card, index) => (
              <div key={index} className="mission-card">
                <h2>{card.name}</h2>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
          <ul>
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
          <button onClick={handleSubmitScores}>Submit Scores</button>
        </>
      ) : (
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          <ol>
            {totalScores.map((score, index) => (
              <li key={index}>
                {index === 0 && <img src="../../../assets/gamepage/gold.png" alt="Gold Medal" className="medal" />}
                {index === 1 && <img src="../../../assets/gamepage/silver.png" alt="Silver Medal" className="medal" />}
                {index === 2 && <img src="../../../assets/gamepage/bronze.png" alt="Bronze Medal" className="medal" />}
                <img src={`../../assets/avatars/${players.find(player => player.name === score.playerName).avatar}.png`} alt={score.playerName} className="leader-avatar" />
                <span>{score.playerName}</span>
                <span>{score.totalScore}</span>
              </li>
            ))}
          </ol>
          <img src="./../../assets/gamepage/confetti.png" alt="Confetti" className="confetti" />
        </div>
      )}
    </div>
  );
}

export default ScoreScreen;