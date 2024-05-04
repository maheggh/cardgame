import { useEffect } from "react";
import "./style.css";

function Game() {
  useEffect(() => {
    import("./../../components/MissionCard");
    import("./../../components/AssessmentCard");
    import("./../../components/DrawPile");
  }, []);

  
  const refreshAllCards = () => {
    const event = new CustomEvent('refreshCards', {
        bubbles: true, 
        composed: true 
    });
    document.querySelector('.gameBoard').dispatchEvent(event);
};


  return (
    <>
      <div className="game-container">
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
            <div className="mission-large">
              <draw-pile category="mission"></draw-pile>
            </div>
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
          <button className="randomize-button" onClick={refreshAllCards}>RANDOMIZE</button>
            <button className="endgame-button">END GAME</button>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Game;
