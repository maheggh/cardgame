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
                margin-top: 10px;
                padding: 5px 10px;
                font-size: 16px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 75px;
            }
            .card-background {
                height: 100%;
                position: relative;
            }
            .card-background_topsection {
                height: 55%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .card-background_topsection .card-category-text {
                font-size: 165%;
                font-weight: bold;
                margin-top: 5px;
                margin: 0 30px;
                text-align: center;
                color: #3f90ce;
            }
            .card-background_bottomsection {
                background-color: #ffe784;
                height: 45%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            .card-background_bottomsection img {
                width: 40px;
                height: 40px;
                display: block;
            }
            .card-background .card-gamename {
                background: linear-gradient(90deg, #3d4ca0, #47a0d9);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 100%;
            }
            .card-background .card-gamename span {
                font-weight: bold;
                font-size: 160%;
            }
        </style>
        <div class="card">
            <div class="card-content">
                <div class="card-header">${card["card-name"]}</div>
                <div class="card-body">${card["card-description"].replace(/\n/g, "<br>")}</div>
            </div>
            <div class="card-background" style="display: none;">
                <div class="card-background_topsection">
                    <div class="card-category-text">Mission</div>
                </div>
                <div class="card-background_bottomsection">
                    <img src="../../assets/icons/Super_assessed.png" alt="Assessment card"></img>
                    <div class="card-gamename"><span>SUPER</span><br>ASSESSOR</div>
                </div>
            </div>
        </div>
        <button class="replace-button">Replace</button>
        `;
        this.shadowRoot.innerHTML = cardHTML;
        this.addClickEventToCard();
        import("../../assets/icons/Super_assessed.png");
    }
 
    addClickEventToCard() {
        const card = this.shadowRoot.querySelector(".card");
        const imageElement = card.querySelector(".card-background");
        const contentElement = card.querySelector(".card-content");
        const replaceButton = this.shadowRoot.querySelector(".replace-button");
   
        card.addEventListener("click", () => {
            if (imageElement.style.display === 'block') {
                imageElement.style.display = 'none';
                contentElement.style.display = 'block';
            } else {
                imageElement.style.display = 'block';
                contentElement.style.display = 'none';
            }
        });
   
        replaceButton.addEventListener("click", (e) => {
            e.stopPropagation();  
            this.loadAndRenderCards();  
        });
    }
}
 
customElements.define("super-mission-card", SuperMissionCard);