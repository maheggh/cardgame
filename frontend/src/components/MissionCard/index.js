class SuperMissionCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `<div>Loading mission cards...</div>`;
        this.cardId = this.getAttribute('card-id');  // Unique identifier for each card
        this.loadAndRenderCards();
    }

    connectedCallback() {
        document.addEventListener('refreshCards', () => {
            console.log('Refreshing all mission cards');
            this.loadAndRenderCards();
        });

        document.addEventListener('drawNewCard', (event) => {
            console.log(`Received drawNewCard event for cardId: ${event.detail.cardId}, this cardId: ${this.cardId}`);
            if (event.detail.cardId === this.cardId) {
                console.log('Loading new card for this mission card');
                this.loadAndRenderCards();
            }
        });
    }

    loadAndRenderCards() {
        fetch("http://localhost:3000/api/cards")
            .then(response => response.json())
            .then(data => {
                const missionCardData = data.filter(card => card['card-type'] === 'Mission');
                console.log(`Mission cards fetched: ${missionCardData.length}`);
                if (missionCardData.length > 0) {
                    this.renderRandomCard(missionCardData);
                } else {
                    console.log('No mission cards available to display.');
                }
            })
            .catch(error => {
                console.error("Error fetching mission cards:", error);
            });
    }

    renderRandomCard(missionCardData) {
        const selectedCard = missionCardData[Math.floor(Math.random() * missionCardData.length)];
        console.log(`Rendering card: ${selectedCard['card-name']}`);
        this.renderCard(selectedCard);
    }

    renderCard(card) {
        let cardHTML = `
        <style>
            .card {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 220px;
                aspect-ratio: 5 / 7;
                border: 11px solid #FCE18F;
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
                overflow: hidden;
                user-select: none;
                box-sizing: border-box;
                border-radius: 14px;
                background-color: white;
            }
            .card-header {
                font-size: 18px;
                font-weight: bold;
                margin: 10px 20px 0;
            }
            .card-body {
                margin: 10px 20px;
            }
            .card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: none;
            }
            .card:hover {
                border-bottom-right-radius: 50px;
                box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.45);
            }
            button.replace-button {
                width: calc(100% - 22px);
                padding: 5px 10px;
                font-size: 16px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin: 10px auto;
                display: block;
            }
        </style>
        <div class="card">
            <div class="card-content">
                <div class="card-header">${card["card-name"]}</div>
                <div class="card-body">${card["card-description"].replace(/\n/g, "<br>")}</div>
            </div>
        </div>
        <button class="replace-button">Replace</button>
        `;
        this.shadowRoot.innerHTML = cardHTML;
        this.addClickEventToCard();
    }

    addClickEventToCard() {
        const card = this.shadowRoot.querySelector(".card");
        const replaceButton = this.shadowRoot.querySelector(".replace-button");

        replaceButton.addEventListener("click", (e) => {
            e.stopPropagation();  // Prevent the card click event from firing
            this.loadAndRenderCards();  // Reload a new mission card
        });
    }
}

customElements.define("super-mission-card", SuperMissionCard);
