class SuperAssessmentCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <div>Loading mission card...</div>
        `;
        this.loadAndRenderCards();
    }

    connectedCallback() {
        document.addEventListener('refreshCards', () => {
            // Refresh the cards when the event is heard
            this.loadAndRenderCards();
        });
    }

    loadAndRenderCards() {
        fetch('http://localhost:3000/api/cards')
            .then(response => response.json())
            .then(data => this.renderCards(data))
            .catch(error => console.error('Error:', error));
    }


    renderCards(assessmentCardData) {
        // group the cards by category
        let cardsByCategory = {};
        for (let card of assessmentCardData) {
            if (!cardsByCategory[card["card-category"]]) {
                cardsByCategory[card["card-category"]] = [];
            }
            cardsByCategory[card["card-category"]].push(card);
        }

        // had to have different html tag than the card-category in JSON so i mapped them like this so that i could connect them
        let categoryMap = {
            "assessed": "Who is assessed",
            "assessor": "The assessor",
            "artefact": "Assessment artefact",
            "format": "Assessment format",
            "context": "Context",
            "timing": "Assessment timing"
        };

        // get the category from the HTML tag
        let category = categoryMap[this.getAttribute('card-category')];

        // check if the category exists in the data
        if (!cardsByCategory[category]) {
            console.error(`Category ${category} not found in the data`);
            return;
        }

        // select a card from the category defined in html atribute randomly
        let selectedCard = cardsByCategory[category][Math.floor(Math.random() * cardsByCategory[category].length)];


        let missionCardHTML = `
            <style>
                .card-container {
                    max-width: 700px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: .5em;
                    justify-content: center;
                }
                .card {
                    width: 220px;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                    overflow: hidden;
                    user-select: none;
                    aspect-ratio: 5 / 7;
                    box-sizing: border-box;
                    border: 11px solid;
                    border-radius: 14px;
                }

                .who-is-assessed .cardCategory{
                    background-color: var(--who-is-assessed-color);
                }

                .the-assessor .cardCategory{
                    background-color: var(--the-assessor-color);
                }

                .assessment-artefact .cardCategory{
                    background-color: var(--assessment-artefact-color);
                }

                .assessment-format .cardCategory{
                    background-color: var(--assessment-format-color);
                }

                .context .cardCategory{
                    background-color: var(--context-color);
                }
                
                .assessment-timing .cardCategory{
                    background-color: var(--assessment-timing-color);
                }

                .cardCategory{
                    color: white;
                    font-size:18px;
                    font-weight:bold;
                    padding: 6px;
                    height: 38px;
                    line-height: 20px;
                    text-transform: uppercase;
                    align-content: center;
                    margin-bottom:4px;
                }

                .card.who-is-assessed {
                    border-color: var(--who-is-assessed-border-color);
                }

                .card.the-assessor {
                    border-color: var(--the-assessor-border-color);
                }

                .card.assessment-artefact {
                    border-color: var(--assessment-artefact-border-color);
                }

                .card.assessment-format {
                    border-color: var(--assessment-format-border-color);
                }

                .card.context {
                    border-color: var(--context-border-color);
                }

                .card.assessment-timing {
                    border-color: var(--assessment-timing-border-color);
                }

                .cardText{
                    padding: 6px;
                }

                .card:hover {
                    border-bottom-right-radius: 50px;
                    box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.65);
                }

                .card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                h2{
                    font-size: 16px;
                    margin: 0;
                }

                p {
                    font-size: 12px;
                }

                .card-number {
                    position: absolute;
                    bottom: 5px;
                    right: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    transition: all 0.2s;
                }

                /* make the card number skew to create illusion of 3D effect bending */
                .card:hover .card-number { 
                    transform: skewX(-30deg);
                }

                .star {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 40px;
                    height: 50px;
                    z-index: 999;
                    font-size: 40px;
                    visibility: hidden;
                }

                .star::before {
                    position: absolute;
                    top: 1px;
                    right: 5px;
                    width: 40px;
                    height: 40px;
                    z-index: 999;
                    font-size: 40px;
                    content: '★';
                    color: gray;
                    visibility: visible;
                }

                .star.active::before {
                    color: gold;
                }
            </style>

                ${this.renderCard(selectedCard)}

        `;
        this.shadowRoot.innerHTML = missionCardHTML;
        this.addClickEventToCards();
    }

    renderCard(card) {
        let cardId = Number(card["card-id"]);
        let cardCategory = card["card-category"].replace(/\s+/g, '-').toLowerCase();

        return `
            <div class="card ${cardCategory}" >
                <button class="star" data-card-id="${card['card-id']}" data-card-name="${card['card-name']}"></button>
                <img class="card-image" style="display: none;" data-card-id="${card['card-id']}">
                <div class="card-content">
                    <div class="cardCategory">${card["card-category"]}</div>
                    <div class="cardText">
                        <h2 class="card-name">${card['card-name']}</h2>
                        <p class="card-description">${card['card-description']}</p>
                        <p class="howortips">${["Who is assessed", "The assessor", "Assessment format"].includes(card['card-category']) ? 'HOW' : 'TIPS'}</p>
                        <p class="card-details">${card['card-details']}</p>
                    </div>
                    <div class="card-number">${cardId}</div>
                </div>
            </div>
        `;
    }


    

    

    addClickEventToCards() {
        const cards = this.shadowRoot.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const cardContentElement = card.querySelector('.card-content');
                const imageElement = card.querySelector('.card-image');
                const cardId = imageElement.getAttribute('data-card-id');


                // find the image for back of the card
                const imageBackSrc = `./assets/cards-png/SUPER cards poker size ${"061123" + (cardId * 2)}.png`;

                // Check if the card is currently displaying the text content or the back image and update accordingly
                if (cardContentElement.style.display === 'none') {
                    // If the text content is hidden, show it and hide the back image
                    cardContentElement.style.display = 'block';
                    imageElement.style.display = 'none';
                } else {
                    // If the text content is shown, hide it and show the back image
                    cardContentElement.style.display = 'none';
                    imageElement.style.display = 'block';
                    imageElement.setAttribute('src', imageBackSrc);
                }
            });
 
            const starButton = card.querySelector('.star');
            starButton.addEventListener('click', (event) => {
                event.stopPropagation();

                // Toggle the 'active' class on the star button
                starButton.classList.toggle('active');

                // Dispatch different events based on whether the star is active or not
                let customEventName;
                let customEventDetail;
                if (starButton.classList.contains('active')) {
                    customEventName = 'clickStar';
                    customEventDetail = { 
                        cardName: starButton.getAttribute('data-card-name')
                    };
                } else {
                    // Remove active class when clicked again
                    customEventName = 'unclickStar';
                    customEventDetail = { 
                        cardName: starButton.getAttribute('data-card-name')
                    };
                }

                const customEvent = new CustomEvent(customEventName, {
                    bubbles: true,
                    composed: true,
                    detail: customEventDetail
                });

                this.dispatchEvent(customEvent);
                console.log(customEvent);
            });
        });
        
    }
    
}

customElements.define('super-assessment-card', SuperAssessmentCard);