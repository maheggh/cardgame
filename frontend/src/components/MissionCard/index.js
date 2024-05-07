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
                    display: block; 
                }
                .card:hover {
                    border-bottom-right-radius: 50px;
                    box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.45);
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
                const assessmentLogoSrc =  './assets/icons/Super_assessed.png';
                // Check if the card is currently displaying the image or the text
                if (content) {
                    // Card is currently showing text, switch to image
                    const imageHtml = `
                        <div class="card-background" >
                            <div class="card-background_topsection ">

                                <div class="card-category-text">Mission</div>
                            </div>
                            <div class="card-background_bottomsection">
                                <img src="${assessmentLogoSrc}" alt="Assessment card"></img>
                                <div class="card-gamename"><span>SUPER</span><br>ASSESSOR</div>
                            </div>
                        </div>
                    `;
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
