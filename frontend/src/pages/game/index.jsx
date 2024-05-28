import React, { useState, useEffect } from 'react';
import StartScreen from '../../components/StartScreen/StartScreen';
import ScoreScreen from '../../components/ScoreScreen/ScoreScreen';
import { createScheme } from '../../API/schemes'; 
import './style.css';

function Game() {
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
    const [players, setPlayers] = useState([]); // State to store players
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // State to track the current player
    const [actionTaken, setActionTaken] = useState(false); // State to track if an action has been taken
    const [showTurnModal, setShowTurnModal] = useState(true); // State to show/hide the turn modal
    const [countdown, setCountdown] = useState(0); // State for action countdown
    const [interactionsDisabled, setInteractionsDisabled] = useState(false); // State to disable interactions
    const [gameEnded, setGameEnded] = useState(false); // State to track if the game has ended
    const [missionCards, setMissionCards] = useState([]); // State to store mission cards
    const [finalScheme, setFinalScheme] = useState([]); // State to store the final scheme
    const [schemeSubmitted, setSchemeSubmitted] = useState(false); // State to track if the scheme has been submitted

    // Function to start the game
    const startGame = (players) => {
        setPlayers(players);
        setGameStarted(true);
        setCurrentPlayerIndex(0);
        setShowTurnModal(true);
        setTimeout(() => setShowTurnModal(false), 3000); // Display modal for 3 seconds
    };

    // Function to end the game and gather mission and assessment cards
    const endGame = () => {
        const displayedMissionCards = Array.from(document.querySelectorAll('super-mission-card'))
            .filter(card => card.offsetParent !== null) // Check if the card is visible
            .map(card => {
                const cardId = card.getAttribute('data-card-id');
                console.log(`Mission Card ID: ${cardId}`);
                return cardId ? cardId : null;
            });
        setMissionCards(displayedMissionCards);

        const assessmentCards = Array.from(document.querySelectorAll('super-assessment-card'))
            .filter(card => card.offsetParent !== null) // Check if the card is visible
            .map(card => {
                const cardId = card.getAttribute('data-card-id');
                console.log(`Assessment Card ID: ${cardId}`);
                return cardId ? cardId : null;
            });

        const [cardWhoIs, cardAssessor, cardArtefact, cardFormat, cardContext, cardTiming] = assessmentCards;

        if (!cardWhoIs || !cardAssessor || !cardArtefact || !cardFormat || !cardContext || !cardTiming) {
            console.error('Some card IDs are missing.');
            return;
        }

        const schemeData = {
            'scheme-name': 'Example Scheme',
            'card-who-is': cardWhoIs,
            'card-assessor': cardAssessor,
            'card-artefact': cardArtefact,
            'card-format': cardFormat,
            'card-context': cardContext,
            'card-timing': cardTiming,
            'card-mission-one': displayedMissionCards[0],
            'card-mission-two': displayedMissionCards[1],
            'card-mission-three': displayedMissionCards[2]
        };

        console.log(missionCards);
        console.log(missionCards[0]);

        console.log('Submitting scheme: ', schemeData);

        setFinalScheme(schemeData);
        setGameEnded(true);
    };

    // Function to submit the scheme to the server
    const submitScheme = () => {
        createScheme(finalScheme)
            .then(data => {
                console.log('Successfully submitted scheme:', data);
                setSchemeSubmitted(true);
            });    
    }

    // Handle input changes for the scheme name
    const handleInput = (input) => {
        setFinalScheme(prevState => ({
            ...prevState,
            'scheme-name': input
        }));
    }

    // Function to move to the next player
    const nextPlayer = () => {
        const actionCooldown = 3; // 3 seconds cooldown
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setActionTaken(true);
        setInteractionsDisabled(true); // Disable interactions
        document.dispatchEvent(new Event('disableInteractions'));
        setShowTurnModal(true);
        setCountdown(actionCooldown);
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    setInteractionsDisabled(false); // Re-enable interactions
                    document.dispatchEvent(new Event('enableInteractions'));
                    setActionTaken(false);
                    setShowTurnModal(false);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    // Effect to import necessary components and handle custom events
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

    // Effect to move to the next player if an action has been taken
    useEffect(() => {
        if (actionTaken) {
            setTimeout(() => {
                nextPlayer();
                setActionTaken(false); // Reset action taken after moving to the next player
            }, 1000);
        }
    }, [actionTaken]); // Depend on actionTaken to trigger this effect

    // Render start screen if game hasn't started
    if (!gameStarted) {
        return <StartScreen onStartGame={startGame} />;
    }

    // Render score screen if game has ended
    if (gameEnded) {
        return <ScoreScreen 
            players={players} 
            missionCards={missionCards} 
            finalScheme={finalScheme} 
            onTextChange={(e) => {handleInput(e.target.value)}} 
            onScoreChange={() => {}} 
            onSubmitScores={() => {}} 
            onSubmitAndSave={submitScheme} 
        />;
    }

    // Function to refresh all cards
    const refreshAllCards = () => {
        const event = new CustomEvent('refreshCards', { bubbles: true, composed: true });
        document.querySelector('.gameBoard').dispatchEvent(event);
        handleAction();
    };

    // Handle an action being taken
    const handleAction = () => {
        if (!actionTaken) {
            setActionTaken(true);
        }
    };

    // Main game render
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
                    <h1 className="game-header">Mission cards</h1>
                    <div className="card-container">
                        <super-mission-card card-id="mission1"></super-mission-card>
                        <super-mission-card card-id="mission2"></super-mission-card>
                        <super-mission-card card-id="mission3"></super-mission-card>
                    </div>
                    <h1 className="game-header">Assessment cards </h1>
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
                    <h1 className="draw-pile-text">Draw pile</h1>
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
