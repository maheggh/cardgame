import { BaseCardComponent } from '../helpers/base-card.js';

class FavoriteCard extends BaseCardComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback(); 
  //  this.setupRandomButton();
  }
  
  /* removed temporarily because it looks ugly :()
  setupRandomButton() {
    const randomiseButton = document.getElementById('randomise-button');
    if (randomiseButton) {
      randomiseButton.addEventListener('click', async () => {
        try {
          const randomCard = await this.getRandomFavoriteCard();
          this.renderCards([randomCard]); 
        } catch (error) {
          console.error('Error fetching random favorite card:', error);
        }
      });
    } else {
      console.error('Randomise button not found');
    }
  }
  */

  async getRandomFavoriteCard() {
    if (!this.cardsData) {
      await this.loadCardsData();
    }

    const bookmarkedCards = JSON.parse(localStorage.getItem('FAVOURITE_CARDS_LIST_STORE')) || [];
    if (bookmarkedCards.length === 0) {
      throw new Error('No favorite cards to display.');
    }
    
    const combinedCards = [
      ...this.cardsData["Assessment cards"],
      ...this.cardsData["Missions"],
    ];

    const favoriteCards = combinedCards.filter(card => 
      bookmarkedCards.includes(card['card-id'].toString())
    );

    const randomIndex = Math.floor(Math.random() * favoriteCards.length);
    return favoriteCards[randomIndex];
  }

}

window.customElements.define('favorite-card', FavoriteCard);
