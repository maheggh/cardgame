import { BaseCardComponent } from '../helpers/base-card.js';

class SuperAssessmentCard extends BaseCardComponent {
    constructor() {
        // NOTE: the data are loaded twice: once in super() and once in document.createElement('get-card');  - this is redundant
        super();
        this.getCardInstance = document.createElement('get-card'); 
        this.shadowRoot.appendChild(this.getCardInstance);
    }

    connectedCallback() {
        // NOTE: you should addEventListener earlier - right after you create an element with document.createElement above - else you risk the event being fired before you get here (a source of confusing/hard to reproduce bugs)
        // NOTE: still not sure why you fetch/render everything twice
        this.getCardInstance.addEventListener('assessmentCardsFetched', (e) => {
            this.renderCards(e.detail);
        });
    }
}

window.customElements.define('super-assessment-card', SuperAssessmentCard);
