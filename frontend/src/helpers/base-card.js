// NOTE: very good idea to extract shared behavior in BaseCardComponent. Well done.
export class BaseCardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // NOTE: better to either @import or <link> styles - cleaner code
    this.shadowRoot.innerHTML = `
      <div id="cards-container"></div>
      <style>
      #cards-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        justify-content: center;
      }
      
      .card-container {
        perspective: 1000px;
        width: 20rem;
        height: 30rem;
        display: grid;
      }

      .card-back-bottom-half {
        width: 100%;
      }

      .card-back-container {
        display: grid;
        grid-template-rows: 60% 40%;
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 0; 
        padding: 20px;
      }

      .card-back-top-half {
        display: grid;
        justify-items: center;
        align-items: center;
        width: 100%;
      }

      .card-back-name {
        line-height: 1.2;
        text-align: center;
        font-size: 40px;
        color: white;
        font-weight: bold;
      }



      .mission-icon {
        max-width: 20%; 
        height: auto;
      }

      .assessment-icon {
        width: 100px;
      }


      .card-box-mission {
        background-color: white;
        padding: 20px;
        height: 80%;
        border-color: red;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }

      .mission-card-back-text {
        color: #3f90ce;
      }

      .mission-back-container {
        background-color: #fbdc80; 
        display: grid;
        grid-template-rows: 60% 40%;
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 0; 
      }
      
      .card-box-mission-back {
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      
      .mission-card-back-super-assessor-text {
        line-height: 1.2;
        color: #7271a6;
        text-align: center;
      }

      .mission-icon {
        max-width: 20%; 
        height: auto;
        margin:
      }

      .mission-card-back-super-assessor {
        background-color: #ffea8f;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      
      
      .card-box {
        background-color: white;
        height: 85%;
        position: relative; 
        padding-left: 5px;
        padding-right: 5px;
      }
      
      .card-name {
        color: white;
      }


      .card-id {
        position: absolute; 
        bottom: 0; 
        right: 0; 
        margin: 0;
        padding: 1rem; 
      }

      .card-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        cursor: pointer;
      }

      .card-description, .card-category {
        color: black;
        text-align: left;
        overflow-wrap: break-word;
        max-height: 3em; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .mission-back {
        color:white;
      }
      
      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        padding: 1rem;
        box-sizing: border-box;
      }

      .card-box-header {
        display: grid;
        grid-template-columns: 1fr 5fr;
        justify-content: center;
        align-items: center;
        
      }

      .icon {
        height: 40px;
      }
      
      .card-back {
        transform: rotateY(180deg);
      }
      
      .card-name, .card-description, .card-details, .card-id {
        color: black;
        text-align: left;
      }
      
      .card-category {
        font-size: 1.5rem;
        color: white;
        margin: 0;
        padding: 5px;
      }

      .how {
        color: grey;
        font-style: italic;
      }
      
      .card-name {
        overflow: hidden;
        font-size: 1.2rem; 
        line-height: 1.2; 
        text-overflow: ellipsis;
      }

      .card-name, .card-description, .card-details {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card-front, .card-back {
        background-color: #006a91;
      }
      
      .the-assessor-front, .the-assessor-back {
        background-color: #7d5ea5;
      }
      
      .assessment-artefact-front, .assessment-artefact-back {
        background-color: #d11f44;
      }

      .assessment-format-front, .assessment-format-back {
        background-color: #91cd90;
      }
      
      .context-front, .context-back {
        background-color: #f17299;
      }
      
      .assessment-timing-front, .assessment-timing-back {
        background-color: #f0861e;
      }
      
      .mission-front, .mission-back {
        background-color: #fff2bb;
      }
      
      .flip-hint, .bookmark-icon {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px;
        border-radius: 5px;
        font-size: 0.8rem;
        user-select: none;
        z-index: 2;
        display: none;
      }
      
      .flip-hint {
        right: 10px;
        bottom: 10px;
      }
      
      .bookmark-icon {
        top: 10px;
        right: 10px;
        font-size: 2rem;
      }
      
      .card-container:hover .flip-hint,
      .card-container:hover .bookmark-icon {
        display: block;
      }
      
      .card-container.flipped .card-inner {
        transform: rotateY(180deg);
      }
</style>
    `;
  }

  async connectedCallback() {
    await this.loadCardsData();
    this.renderCards([]);
  }

  async loadCardsData() {
    try {
      /** NOTE: this loads all of the data on all of the cards every time a card is created - this is redundant and counter-intuitive.
       * Better load data once somewhere else (e.g., in a Board component), and pass a piece of the data to the component to render.
       */
      // NOTE: the no-leading-slash relative URLs are resolved relative to the path in the browser, not relative to this file location on file system during development (like, node.js would)
      const response = await fetch('assets/cards-db/SUPER-db.json');
      const data = await response.json();
      this.cardsData = data;
    } catch (error) {
      console.error('Failed to load card data:', error);
    }
  }

  addFlipEventListeners() {
    this.shadowRoot.querySelectorAll('.card-container').forEach(cardContainer => {
      cardContainer.addEventListener('click', () => cardContainer.classList.toggle('flipped'));
    });
  }

  addBookmarkEventListeners() {
    this.shadowRoot.querySelectorAll('.bookmark-icon').forEach(icon => {
      icon.addEventListener('click', e => {
        e.stopPropagation();
        const cardId = e.target.dataset.cardId;
        this.toggleBookmark(cardId, e.target);
      });
    });
  }

  toggleBookmark(cardId, icon) {
    let bookmarkedCards = JSON.parse(localStorage.getItem('FAVOURITE_CARDS_LIST_STORE')) || [];
    let isBookmarked;
    if (bookmarkedCards.includes(cardId)) {
      bookmarkedCards = bookmarkedCards.filter(id => id !== cardId);
      icon.innerHTML = '&#9734;';
      isBookmarked = false;
    } else {
      bookmarkedCards.push(cardId);
      icon.innerHTML = '&#9733;';
      isBookmarked = true;
    }
    localStorage.setItem('FAVOURITE_CARDS_LIST_STORE', JSON.stringify(bookmarkedCards));
    const eventDetail = { cardId, isBookmarked };
    const bookmarkEvent = new CustomEvent('bookmarkChange', { detail: eventDetail, bubbles: true, composed: true });
    this.dispatchEvent(bookmarkEvent);
  }
  renderCards(cards) {
    const cardsContainer = this.shadowRoot.querySelector('#cards-container');
    // NOTE: this component doesn't represent a card; it represents an entire board - you render all of the cards here. This is inconsistent with the naming and the task description.
    cardsContainer.innerHTML = cards.map(card => {
      const categoryClass = card["card-type"] === "Mission" ? 'mission' : card['card-category'].toLowerCase().replace(/\s+/g, '-');
      const cardContentFront = this.getCardContentHTML(card, 'front');
      const cardContentBack = this.getCardContentHTML(card, 'back'); 
  
      return `
        <div class="card-container ${categoryClass}">
          <div class="card-inner">
            <div class="card-front ${categoryClass}-front">${cardContentFront}</div>
            <div class="card-back ${categoryClass}-back">${cardContentBack}</div> <!-- Updated to use cardContentBack -->
          </div>
          <div class="flip-hint">Click to flip</div>
          <div class="bookmark-icon" data-card-id="${card["card-id"]}">&#9734;</div>
        </div>
      `;
    }).join('');
  
    this.addFlipEventListeners();
    this.addBookmarkEventListeners();
  }
  
  
  
  // NOTE: consider using templates and slots instead of long strings with HTML - cleaner code (more maintainable, easier to read, fewer chances for bugs)
  getCardContentHTML(card, side) {
    if (card["card-type"] === "Mission") {
      return side === 'front' ? `
        <div class="card-box-mission">
          <h1>MISSION</h1>
          <h1 class="card-name">${card["card-name"]}</h1>
          <h2>Your mission is</h2>
          <p class="card-description">${card["card-description"].replace(/\\r\\n/g, "<br>")}</p>
          <p class="card-id">${card["card-id"]}</p>
        </div>
      ` : `
        <div class="mission-back-container">
          <div class="card-box-mission-back">
            <h1 class="mission-card-back-text">MISSION</h1>
          </div>
          <div class="mission-card-back-super-assessor">
            <img src="./assets/icons/Super_assessed.png" class="mission-icon"></img>
            <h1 class="mission-card-back-super-assessor-text">Super<br> Assessor</h1>
          </div>
        </div>
      `;
    } else {
      const categoryImageSrc = `./assets/icons/${card["card-category"]}.png`;
      return side === 'front' ? `
        <div class="card-box-header">
          <img src="${categoryImageSrc}" class="icon"></img>
          <h1 class="card-category">${card["card-category"]}</h1>
        </div>
        <div class="card-box">
          <h2 class="card-name">${card["card-name"]}</h2>
          <p class="card-description">${card["card-description"]}</p>
          ${side === 'back' ? `<h1 class="card-category">${card["card-category"]}</h1>` : ''}
          <h2 class="how">HOW?</h2>
          <p class="card-details">${card["card-details"]}</p>
          <p class="card-id">${card["card-id"]}</p>
        </div>
      ` : `
        <div class="card-back-container">
        <div class="card-back-top-half">
        <img src="${categoryImageSrc}" class="assessment-icon"></img>
        <div class="card-back-name">${card["card-category"]}</div>
        </div>
        <div class="card-back-bottom-half">
        <div class="mission-card-back-super-assessor">
        <img src="./assets/icons/Super_assessed.png" class="mission-icon"></img>
        <h1 class="mission-card-back-super-assessor-text">Super<br> Assessor</h1>
      </div>
        </div>
        </div>
      `;
    }
  }
}