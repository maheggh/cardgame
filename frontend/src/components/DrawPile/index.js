class DrawPile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #4CAF50;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 10px;
                    transition: background-color 0.3s;
                }
                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                    aspect-ratio: 5 / 7;
                }
                .card img {
                    width: 200px; 
                    height: auto;
                    border-radius: 14px;
                }
                .card:hover {
                    transform: scale(1.02);
                }
            </style>
            <div class="card">
                <img id="card-image" src="" alt="Card Image">
                <button id="draw-button" disabled>Draw New Card</button>
            </div>
        `;

        this.button = this.shadowRoot.querySelector('#draw-button');
        this.img = this.shadowRoot.querySelector('#card-image');
    }

    connectedCallback() {
        document.addEventListener('cardFlipped', (event) => {
            if (event.detail.category === this.getAttribute('category') && event.detail.enableDraw) {
                this.button.disabled = false;
            }
        });
        this.button.addEventListener('click', () => {
            console.log("Attempting to dispatch drawNewCard event for category:", this.getAttribute('category'));
            if (!this.button.disabled) {
                // Dispatch the drawNewCard event with the necessary details
                document.dispatchEvent(new CustomEvent('drawNewCard', {
                    bubbles: true, // Ensure the event bubbles up through the DOM
                    detail: {
                        category: this.getAttribute('category'),
                        refresh: true // Added refresh flag for clarity
                    }
                }));
                this.button.disabled = true; // Disable button to prevent multiple draws
            }
        });

        this.updateCardDetails();
    }
    
    updateCardDetails() {
        const category = this.getAttribute('category');
        const categoryInfo = {
            "assessed": { img: "./assets/cards-png/SUPER cards poker size 0611232.png", title: "Who is Assessed" },
            "assessor": { img: "./assets/cards-png/SUPER cards poker size 06112328.png", title: "The Assessor" },
            "artefact": { img: "./assets/cards-png/SUPER cards poker size 06112394.png", title: "Assessment Artefact" },
            "format": { img: "./assets/cards-png/SUPER cards poker size 061123116.png", title: "Assessment Format" },
            "context": { img: "./assets/cards-png/SUPER cards poker size 061123146.png", title: "Context" },
            "timing": { img: "./assets/cards-png/SUPER cards poker size 061123170.png", title: "Assessment Timing" }
        }[category];

        if (categoryInfo) {
            this.img.src = categoryInfo.img;
            this.img.alt = `${categoryInfo.title} Card`;
        }
    }
}

customElements.define('draw-pile', DrawPile);
