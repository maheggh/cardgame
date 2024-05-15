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
            this.loadAndRenderCards(); // This refreshes all cards
        });
   
        document.addEventListener('drawNewCard', (e) => {
            console.log("drawNewCard event received for category:", e.detail.category);
            if (e.detail.category === this.getAttribute('card-category') && e.detail.refresh) {
                this.loadAndRenderCards(); // This should reload the card
            }
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
 
        // Map the card-category attribute to readable format if needed
        let categoryMap = {
            "assessed": "Who is assessed",
            "assessor": "The assessor",
            "artefact": "Assessment artefact",
            "format": "Assessment format",
            "context": "Context",
            "timing": "Assessment timing"
        };
 
        let category = categoryMap[this.getAttribute('card-category')];
        if (!cardsByCategory[category]) {
            console.error(`Category ${category} not found in the data`);
            return;
        }
 
        // Randomly select a card
        let selectedCard = cardsByCategory[category][Math.floor(Math.random() * cardsByCategory[category].length)];
        this.displayCard(selectedCard);
    }
 
    displayCard(card) {
        let cardHTML = `
        <style>
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
            background-color: white;
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
    </style>
            <div class="card ${card["card-category"].replace(/\s+/g, '-').toLowerCase()}" >
                <img class="card-image" style="display: none;" src="./assets/cards-png/SUPER cards poker size ${"061123" + (card['card-id'] * 2)}.png">
                <div class="card-content">
                    <div class="cardCategory">${card["card-category"]}</div>
                    <div class="cardText">
                        <h2 class="card-name">${card['card-name']}</h2>
                        <p class="card-description">${card['card-description']}</p>
                        <p class="howortips">${["Who is assessed", "The assessor", "Assessment format"].includes(card['card-category']) ? 'HOW' : 'TIPS'}</p>
                        <p class="card-details">${card['card-details']}</p>
                    </div>
                    <div class="card-number">${card['card-id']}</div>
                </div>
            </div>
        `;
        this.shadowRoot.innerHTML = cardHTML;
        this.addClickEventToCards();
    }
 
    addClickEventToCards() {
        const cards = this.shadowRoot.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Check if an action is allowed before proceeding
                const canPerformAction = new CustomEvent('requestAction', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        actionType: 'flipCard'
                    }
                });
    
                // Dispatch the event and let the game logic decide if the action can proceed
                this.dispatchEvent(canPerformAction);
                
                // Assuming your game logic sets an attribute on the element or responds with another event indicating permission
                if (canPerformAction.defaultPrevented) {
                    console.log("Action prevented: another action has already been taken.");
                    return; // Exit if not allowed to perform the action
                }
    
                const cardContent = card.querySelector('.card-content');
                const cardImage = card.querySelector('.card-image');
                const cardId = card.getAttribute('data-card-id');
        
                // Compute image source based on cardId
                if (cardId && !isNaN(cardId)) {
                    const imageBackSrc = `./assets/cards-png/SUPER cards poker size 061123${cardId * 2}.png`;
                    cardImage.src = imageBackSrc;
                }
        
                // Only toggle display if the card content is currently visible
                if (cardContent.style.display !== 'none') {
                    cardContent.style.display = 'none';
                    cardImage.style.display = 'block';
        
                    // Dispatch event only if flipping to show the image (back of the card)
                    document.dispatchEvent(new CustomEvent('cardFlipped', {
                        detail: {
                            category: this.getAttribute('card-category'),
                            enableDraw: true
                        }
                    }));
        
                    // Notify the game that an action has been taken
                    document.dispatchEvent(new CustomEvent('actionTaken', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            actionType: 'flipCard'
                        }
                    }));
        
                    // Remove event listener to prevent flipping back
                    card.removeEventListener('click', arguments.callee);
                }
            });
        });
    }
   
}
 
customElements.define('super-assessment-card', SuperAssessmentCard);