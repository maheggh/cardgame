class SuperMissionCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `<div>Loading mission cards...</div>`;
      this.loadAndRenderCards();
    }
  
    connectedCallback() {
      document.addEventListener('refreshCards', () => {
        console.log('Refresh event heard by SuperMissionCard');
        this.loadAndRenderCards();
      });
    }
  
    loadAndRenderCards() {
      fetch("http://localhost:3000/api/cards")
        .then((response) => response.json())
        .then((data) => {
          const missionCardData = data.filter(card => card['card-type'] === 'Mission');
          console.log("Filtered mission card data:", missionCardData);
          this.renderRandomCard(missionCardData);
        })
        .catch((error) => {
          console.error("Error fetching mission cards:", error);
        });
    }
  
    renderRandomCard(missionCardData) {
      if (missionCardData.length > 0) {
        const selectedCard = missionCardData[Math.floor(Math.random() * missionCardData.length)];
        console.log("Selected random mission card:", selectedCard);
  
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
                    display: none; 
                }
                .card:hover {
                    border-bottom-right-radius: 50px;
                    box-shadow: 80px 90px 28px -90px rgba(0,0,0,0.45);
                }
            </style>
            <div class="card">
                <div class="card-content">
                    <div class="card-header">${selectedCard["card-name"]}</div>
                    <div class="card-body">${selectedCard["card-description"].replace(/\n/g, "<br>")}</div>
                </div>
                <img src="./assets/cards-png/SUPER cards poker size 061123186.png" alt="Card Image">
            </div>
        `;
        this.shadowRoot.innerHTML = missionCardHTML;
        this.addClickEventToCard();
      } else {
        console.error('No mission cards available to display.');
      }
    }
  
    addClickEventToCard() {
      const card = this.shadowRoot.querySelector(".card");
      const imageElement = card.querySelector("img");
      const contentElement = card.querySelector(".card-content");
      card.addEventListener("click", () => {
        if (imageElement.style.display === 'block') {
          imageElement.style.display = 'none';
          contentElement.style.display = 'block';
        } else {
          imageElement.style.display = 'block';
          contentElement.style.display = 'none';
        }
      });
    }
  }
  
  customElements.define("super-mission-card", SuperMissionCard);
  