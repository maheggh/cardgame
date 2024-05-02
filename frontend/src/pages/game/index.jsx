import { useEffect } from 'react';
import './style.css';

function Game() {
    useEffect(() => {
        import('./../../components/MissionCard');
        import('./../../components/AssessmentCard');
    }, []);

    return (
        <>
        <div className="game-container">
            <main className="gameBoard">
                <h1>Mission cards (x3)</h1>
                <div className="card-container">
                    <super-mission-card card-name="counteract-cheating"></super-mission-card>
                    <super-mission-card card-name="authenticity"></super-mission-card>
                    <super-mission-card card-name="time-management"></super-mission-card>
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
                    <h1> Draw Pile:</h1>
                    <div className="playbutton-container">
                        <button className="randomize-button">RANDOMIZE</button>
                        <button className="endgame-button">END GAME</button>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Game;