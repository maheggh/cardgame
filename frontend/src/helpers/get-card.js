/** NOTE: this component incapsulates some logic, but doesn't render anything - it should not be a component. It's a module.
 */

class GetCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('assets/cards-db/SUPER-db.json');
            // NOTE: response.json(); isn't asynchronous - no need for await
            const data = await response.json();
        
            const assessmentCards = data["Assessment cards"];
            const selectedAssessmentCards = this.selectOneCardPerCategory(assessmentCards); 
            
            const missionCards = data["Missions"]; 
            const selectedMissionCards = this.selectRandomCards(missionCards, 3); 

            this.dispatchEvent(new CustomEvent('assessmentCardsFetched', { detail: selectedAssessmentCards }));
            this.dispatchEvent(new CustomEvent('missionCardsFetched', { detail: selectedMissionCards }));

        } catch (error) {
            console.error('Failed to fetch data:', error);
            this.shadowRoot.innerHTML += '<p>Error loading data.</p>';
        }
    }

    selectOneCardPerCategory(cards) {
        const categoryMap = {};
        cards.forEach(card => {
            if (!categoryMap[card["card-category"]]) {
                categoryMap[card["card-category"]] = [];
            }
            categoryMap[card["card-category"]].push(card);
        });

        const selectedCards = [];
        Object.keys(categoryMap).forEach(category => {
            const cardsInCategory = categoryMap[category];
            const randomIndex = Math.floor(Math.random() * cardsInCategory.length);
            selectedCards.push(cardsInCategory[randomIndex]);
        });

        return selectedCards;
    }

    selectRandomCards(cards, count) {
        const selectedCards = [];
        const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
        for (let i = 0; i < count && i < shuffledCards.length; i++) {
            selectedCards.push(shuffledCards[i]);
        }
        return selectedCards;
    }
}

window.customElements.define('get-card', GetCard);
