class SuperMissionCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `<div>Loading mission cards...</div>`;
        this.cardId = this.getAttribute('card-id');  // Use the provided card ID
        this.loadAndRenderCards();
    }

    connectedCallback() {
        document.addEventListener('refreshCards', () => {
            this.loadAndRenderCards();
        });

        document.addEventListener('drawNewCard', (event) => {
            if (event.detail.cardId === this.cardId) {
                this.loadAndRenderCards(); // Load a new card only if the event targets this card
            }
        });
    }

    loadAndRenderCards() {
        fetch("http://localhost:3000/api/cards")
            .then(response => response.json())
            .then(data => {
                const missionCardData = data.filter(card => card['card-type'] === 'Mission');
                if (missionCardData.length > 0) {
                    this.renderRandomCard(missionCardData);
                }
            })
            .catch(error => {
                console.error("Error fetching mission cards:", error);
            });
    }

    renderRandomCard(missionCardData) {
        const selectedCard = missionCardData[Math.floor(Math.random() * missionCardData.length)];
        this.renderCard(selectedCard);
    }

    renderCard(card) {
        let cardHTML = `
        <style>
            .card {
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
                display: none;  // Initially hidden
            }
            .card:hover {
                border-bottom-right-radius: 50px;
                box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.45);
            }
        </style>
        <div class="card">
            <div class="card-content">
                <div class="card-header">${card["card-name"]}</div>
                <div class="card-body">${card["card-description"].replace(/\n/g, "<br>")}</div>
            </div>
            <img src="./assets/cards-png/SUPER cards poker size 061123186.png" alt="Card Image">
        </div>
        `;
        this.shadowRoot.innerHTML = cardHTML;
        this.addClickEventToCard();
    }

    addClickEventToCard() {
        const card = this.shadowRoot.querySelector(".card");
        card.addEventListener("click", () => {
            const image = card.querySelector("img");
            const content = card.querySelector(".card-content");
            if (image.style.display === 'block') {
                image.style.display = 'none';
                content.style.display = 'block';
            } else {
                image.style.display = 'block';
                content.style.display = 'none';
                document.dispatchEvent(new CustomEvent('cardFlipped', {
                    detail: {
                        category: 'mission',
                        enableDraw: true,
                        cardId: this.cardId  
                    }
                }));
            }
        });
    }
}

customElements.define("super-mission-card", SuperMissionCard);
