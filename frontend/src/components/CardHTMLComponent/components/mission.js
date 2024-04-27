class SuperMissionCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <div>Loading mission cards...</div>
        `;
        this.loadAndRenderCards();
    }

    loadAndRenderCards() {
        fetch('http://localhost:3000/api/cards')
            .then(response => response.json())
            .then(data => this.renderCards(data))
            .catch(error => console.error('Error:', error));
    }

    renderCards(missionCardData) {
        // get the card name from the HTML attribute
        let cardName = this.getAttribute('card-name').replace(/-/g, ' ').toLowerCase();
        let selectedCard = missionCardData.find(card => card['card-name'].toLowerCase() === cardName);

        if (!selectedCard) {
            console.error(`Card with name "${cardName}" not found.`);
            return;
        }
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
                    width: 200px;
                    height: 300px;
                    background-color: #FFEA94;
                    border: 7px solid #FCE18F;
                    cursor: pointer; 
                    position: relative; 
                    transition: all 0.2s;
                    overflow: hidden;
                    user-select: none;
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
                    display: block; 
                }
                .card:hover {
                    border-bottom-right-radius: 50px;
                    box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.45);
                }
            </style>
            <div class="card-container">
            
                <div class="card" data-card-image="${selectedCard["card-image"]}">
                    <div class="card-content">
                        <div class="card-header">${selectedCard["card-name"]}</div>
                        <div class="card-body">${selectedCard["card-description"].replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
            </div>
        `;
        this.shadowRoot.innerHTML = missionCardHTML;
        this.addClickEventToCards();
    }

    addClickEventToCards() {
        const cards = this.shadowRoot.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const content = card.querySelector('.card-content');
                const imageUrl = './assets/cards-png/SUPER cards poker size 061123178.png'; 
                // Check if the card is currently displaying the image or the text
                if (content) {
                    // Card is currently showing text, switch to image
                    const imageHtml = `<img src="${imageUrl}" alt="Card Image">`;
                    card.innerHTML = imageHtml;
                } else {
                    // Card is currently showing image, revert back to original text content
                    const originalContent = `
                        <div class="card-content">
                            <div class="card-header">${card.dataset.cardName}</div>
                            <div class="card-body">${card.dataset.cardDescription}</div>
                        </div>`;
                    card.innerHTML = originalContent;
                }
            });
            // Store the card's original content in dataset for easy revert
            card.dataset.cardName = card.querySelector('.card-header').innerText;
            card.dataset.cardDescription = card.querySelector('.card-body').innerHTML;
        });
    }
}

customElements.define('super-mission-card', SuperMissionCard);
