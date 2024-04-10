import { useEffect, useState } from 'react';
import './style.css';
import { login, authorize } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../UserContext.jsx';
import SUPERMissionCard from './../../components/CardHTMLComponent/SUPER-mission-card.js';
import SUPERAssessmentCard from './../../components/CardHTMLComponent/SUPER-assessment-card.js';

function Game() {
    const { loginAuth, token } = useAuth();
    const cardOrder = ["Who is assessed", "The assessor", "Assessment artefact", "Assessment format", "Context", "Assessment timing"];
    const navigate = useNavigate();
    const [cardInfo, setCardInfo] = useState([]);
    const [favCards, setFavCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const missionCount = 3;
    const assessmentCount = 6;

        const getAllCards = async () => {
            try {
              const allCards = await authorize(token);
                setCardInfo(allCards);
                setLoading(true);
            if (cardInfo.length > 0) {
                    populateAssessments(assessmentCount);
                    populateMissions(missionCount);
            }
            } catch (err) {
                console.log(err);
            }

        }


    useEffect(() => {
        getAllCards()
        const copiedObj = JSON.parse(JSON.stringify(cardInfo));


    }, [loading])

        function getRandomItem(list){
            if ( list == undefined || list == null) return null;
            var randomIndex = Math.floor(Math.random() * list.length);
            const object = list[randomIndex];
            // remove card
            list.splice(randomIndex, 1);
            //console.log(list);
            return object;
        }

        function randomizeCards(){
            const copiedObj = JSON.parse(JSON.stringify(obj));

        }

        //creates each mission card as a custom component with randomly selected data from the database, then appends it to the document
        function populateMissions(count){
            const missionList = document.getElementById("mission-list");
            missionList.innerHTML = '';
            for (let i = 0; i < count; i++) {
                var missionItem;
                const missionObj = (cardInfo.length > 0) ? (getRandomItem(cardInfo.filter(card => card["card-type"] === "Mission"))) : ('') ;
                missionItem = document.createElement('super-mission-card');
                //sets each pair from the JSON as an attribute in the HTML
                var x;
                for (x in missionObj) {

                    missionItem.setAttribute(x, missionObj[x]);
                }

                //lastly, append to page
                missionList.appendChild(missionItem);
            }         
        }

        function populateAssessments(count){
            //define what the assessments will be added to
            const selectedCards = {};
            const assessmentList = document.getElementById("assessment-list");
            assessmentList.innerHTML = "";

            //finds cards that match each category of card
            cardOrder.forEach(category => {
                //finds matching cards in the specific category

                const matchingCards = (cardInfo.length > 0) ? cardInfo.filter(card => card["card-type"] === "Assessment").filter((card) => card['card-category'] == category) : ('');
                //gives random number for card within the ammount of cards in that category
                const randomIndex = Math.floor(Math.random() * matchingCards.length);
                selectedCards[category] = matchingCards[randomIndex];                
            });
            Object.values(selectedCards).forEach((element) => {
                var assessmentItem;
                assessmentItem = document.createElement('super-assessment-card');
                assessmentItem.id = (element != undefined) ? 'card_'+element['card-id'] : ('');
                //sets each pair from the JSON as an attribute in the HTML
                var x;
                for (x in element) {
                    assessmentItem.setAttribute(x, element[x]);
                }

                //lastly, append to page
                assessmentList.appendChild(assessmentItem);
            });
    
        }

    return (
        <div className="game-wrapper">
        <h1>the SUPER Assessor - Idea generator</h1>
        <p>SUPER Assessor, a game designed for educators, is the result of a research project undertaken by the Department of Design in Trondheim. Its primary objective is to aid educators in the development of unique assessment methods. These methods are intended to create innovative ways to evaluate and grade students.</p>
    <main>
            <h2>Mission cards (x3)</h2>
            <div className="card-container mission-cards" id="mission-list">
            </div>

            <h2>Assessment cards (x6)</h2>
            <div className="card-container assessment-cards" id="assessment-list">
            </div>
    </main>

    <aside>
        <h2>Favourite cards</h2>
        <ul id="favourite-cards-list">
        </ul>

        <h2>Control panel</h2>
        <p>Click the following button to extract random cards and display them in the main area.</p>
        <button type="button" onClick={randomizeCards}>Randomise</button>
    </aside>
        </div>
    );
}

export default Game;