// NOTE: same feedback as for the assessment card element
import { BaseCardComponent } from '../helpers/base-card.js';

class SuperMissionCard extends BaseCardComponent {
    constructor() {
        super();
        this.getCardInstance = document.createElement('get-card'); 
        this.shadowRoot.appendChild(this.getCardInstance);
    }

    connectedCallback() {
        this.getCardInstance.addEventListener('missionCardsFetched', (e) => {
            this.renderCards(e.detail); 
        });
    }
}

window.customElements.define('super-mission-card', SuperMissionCard);
