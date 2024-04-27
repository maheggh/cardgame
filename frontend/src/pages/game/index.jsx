import { useEffect } from 'react';
import './style.css';

function Game() {
    useEffect(() => {
        import('./../../components/CardHTMLComponent/components/mission.js');
        import('./../../components/CardHTMLComponent/components/assessment.js');
    }, []);

    return (
        <>
            <main>
                <h2>Mission cards (x3)</h2>
                <div class="card-container">
                    <super-mission-card card-name="counteract-cheating"></super-mission-card>
                    <super-mission-card card-name="authenticity"></super-mission-card>
                    <super-mission-card card-name="time-management"></super-mission-card>
                </div>
                <h2>Assessment cards (x6)</h2>
                <div class="card-container">
                    <super-assessment-card card-category="assessed"></super-assessment-card>
                    <super-assessment-card card-category="assessor"></super-assessment-card>
                    <super-assessment-card card-category="artefact"></super-assessment-card>
                    <super-assessment-card card-category="format"></super-assessment-card>
                    <super-assessment-card card-category="context"></super-assessment-card>
                    <super-assessment-card card-category="timing"></super-assessment-card>
                </div>
            </main>
        </>
    );
}

export default Game;