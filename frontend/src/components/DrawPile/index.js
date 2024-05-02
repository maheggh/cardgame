class DrawPile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                    aspect-ratio: 5 / 7;
                    drop-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
            </div>
        `;

        // Define category-specific images and titles
        this.categories = {
            "mission": { img: "./assets/cards-png/SUPER cards poker size 061123186.png", title: "Mission" },
            "assessed": { img: "./assets/cards-png/SUPER cards poker size 0611232.png", title: "Who is Assessed" },
            "assessor": { img: "./assets/cards-png/SUPER cards poker size 06112328.png", title: "The Assessor" },
            "artefact": { img: "./assets/cards-png/SUPER cards poker size 06112394.png", title: "Assessment Artefact" },
            "format": { img: "./assets/cards-png/SUPER cards poker size 061123116.png", title: "Assessment Format" },
            "context": { img: "./assets/cards-png/SUPER cards poker size 061123146.png", title: "Context" },
            "timing": { img: "./assets/cards-png/SUPER cards poker size 061123170.png", title: "Assessment Timing" }
        };
    }

    connectedCallback() {
        const category = this.getAttribute('category');
        const categoryInfo = this.categories[category];
        if (categoryInfo) {
            this.shadowRoot.getElementById('card-image').src = categoryInfo.img;
            this.shadowRoot.getElementById('card-image').alt = `${categoryInfo.title} Card`;
        }
    }
}

customElements.define('draw-pile', DrawPile);
