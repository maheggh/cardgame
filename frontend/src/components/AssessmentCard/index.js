class SuperAssessmentCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isVisible = false;  // Added to track visibility
        this.shadowRoot.innerHTML = `
            <div>Loading mission card...</div>
        `;
        this.loadAndRenderCards();
    }

    connectedCallback() {
        this.boundRefreshCards = () => this.loadAndRenderCards();
        this.boundDrawNewCard = (e) => {
            if (e.detail.category === this.getAttribute('card-category')) {
                if (!this.isVisible) {
                    this.isVisible = true;
                    this.loadAndRenderCards();
                } else {
                    this.loadAndRenderCards();
                }
            }
        };
        this.boundDisableInteractions = () => this.interactionsDisabled = true;
        this.boundEnableInteractions = () => this.interactionsDisabled = false;

        document.addEventListener('refreshCards', this.boundRefreshCards);
        document.addEventListener('drawNewCard', this.boundDrawNewCard);
        document.addEventListener('disableInteractions', this.boundDisableInteractions);
        document.addEventListener('enableInteractions', this.boundEnableInteractions);
    }

    disconnectedCallback() {
        document.removeEventListener('refreshCards', this.boundRefreshCards);
        document.removeEventListener('drawNewCard', this.boundDrawNewCard);
        document.removeEventListener('disableInteractions', this.boundDisableInteractions);
        document.removeEventListener('enableInteractions', this.boundEnableInteractions);
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        const card = this.shadowRoot.querySelector('.card');
        if (card) {
            card.style.display = this.isVisible ? 'block' : 'none';
        }
    }

    loadAndRenderCards() {
        fetch('http://localhost:3000/api/cards')
            .then(response => response.json())
            .then(data => {
                this.renderCards(data);
            })
            .catch(error => console.error('Error:', error));
    }

    renderCards(assessmentCardData) {
        let cardsByCategory = {};
        for (let card of assessmentCardData) {
            if (!cardsByCategory[card["card-category"]]) {
                cardsByCategory[card["card-category"]] = [];
            }
            cardsByCategory[card["card-category"]].push(card);
        }

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

        let selectedCard = cardsByCategory[category][Math.floor(Math.random() * cardsByCategory[category].length)];
        this.setAttribute('data-card-id', selectedCard._id); // Set data-card-id attribute
        this.displayCard(selectedCard);
    }

    displayCard(card) {
        let displayStyle = this.isVisible ? 'block' : 'none';
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
            display: ${displayStyle};
        }

        .who-is-assessed .cardCategory {
            background-color: var(--who-is-assessed-color);
        }

        .the-assessor .cardCategory {
            background-color: var(--the-assessor-color);
        }

        .assessment-artefact .cardCategory {
            background-color: var(--assessment-artefact-color);
        }

        .assessment-format .cardCategory {
            background-color: var(--assessment-format-color);
        }

        .context .cardCategory {
            background-color: var(--context-color);
        }

        .assessment-timing .cardCategory {
            background-color: var(--assessment-timing-color);
        }

        .cardCategory {
            color: white;
            font-size: 18px;
            font-weight: bold;
            padding: 6px;
            height: 38px;
            line-height: 20px;
            text-transform: uppercase;
            align-content: center;
            margin-bottom: 4px;
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

        .cardText {
            padding: 6px;
        }

        .card:hover {
            border-bottom-right-radius: 50px;
            box-shadow: 80px 90px 28px -90px rgba(0, 0, 0, 0.65);
        }

        .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        h2 {
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

        .card:hover .card-number {
            transform: skewX(-30deg);
        }
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .card{
                width: 160px;
                margin: 5px;
            }
            .cardCategory{
                font-size: 16px;
                margin-bottom: 0;
            }
            .cardText{
                font-size: 12px;
                padding: 5px;
            }
            .card-name, .card-description{
                font-size: 10px; 
            }
            .button-wrap {
                width: 100%;
                display: flex;
                justify-content: center;
                align-content: center;
                margin-top: 10px;
            }
            button.replace-button{
                margin: 0;
            }
            p{
                margin: 4px 0;
                font-size: 10px;
            }
        }
    </style>
            <div class="card ${card["card-category"].replace(/\s+/g, '-').toLowerCase()}" data-card-id="${card._id}">
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
                if (this.interactionsDisabled) {
                    console.log("Interactions are disabled during the countdown.");
                    return;
                }

                const canPerformAction = new CustomEvent('requestAction', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        actionType: 'flipCard'
                    }
                });

                this.dispatchEvent(canPerformAction);

                if (canPerformAction.defaultPrevented) {
                    console.log("Action prevented: another action has already been taken.");
                    return;
                }

                const cardContent = card.querySelector('.card-content');
                const cardImage = card.querySelector('.card-image');
                const cardId = card.getAttribute('data-card-id');

                if (cardId && !isNaN(cardId)) {
                    const imageBackSrc = `./assets/cards-png/SUPER cards poker size 061123${cardId * 2}.png`;
                    cardImage.src = imageBackSrc;
                }

                if (cardContent.style.display !== 'none') {
                    cardContent.style.display = 'none';
                    cardImage.style.display = 'block';

                    document.dispatchEvent(new CustomEvent('cardFlipped', {
                        detail: {
                            category: this.getAttribute('card-category'),
                            enableDraw: true
                        }
                    }));

                    document.dispatchEvent(new CustomEvent('actionTaken', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            actionType: 'flipCard'
                        }
                    }));

                    card.removeEventListener('click', arguments.callee);
                }
            });
        });
    }
}

customElements.define('super-assessment-card', SuperAssessmentCard);
