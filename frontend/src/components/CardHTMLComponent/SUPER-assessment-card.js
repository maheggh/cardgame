export default class SUPERAssessmentCard extends HTMLElement {
	
	static get observedAttributes (){
		return ["card-id", "card-type", "card-name", "card-description", "card-details", 'card-category', 'card-color'];
	};

	get cardId () {
		return this.getAttribute();
	}

	constructor() {
		super();
		this.isFav = false;
		this.isFlipped = false;
		this.shadow = this.attachShadow({
			mode: "open"
		});
	}

	connectedCallback() {
		this.render();
		this.checkIfFav();
	}

	attributeChangedCallback(name, oldValue, newValue){
		if (name == "card-color") {this.colorizeCard(this.getAttribute("card-color"));}
	}

	disconnectedCallback() {
		this.shadow.querySelector('.flip-button').removeEventListener('click', () => this.toggleFav());
		const breakdownButton = this.shadow.querySelectorAll('.flip-button');
		var div_list = this.shadow.querySelectorAll('.flip-button'); // returns NodeList
		var div_array = [...div_list]; // converts NodeList to Array
		div_array.forEach(div => {
			div.removeEventListener('click', () => this.flipCard());
		});
	}

	render() {
		this.shadow.innerHTML = this._getTemplate();
		this.renderCardImages();
		this.shadow.querySelector('.fav-button').addEventListener('click', () => this.toggleFav());		

		// code borrowed from https://stackoverflow.com/questions/51573435/want-to-add-addeventlistener-on-multiple-elements-with-same-class
		const breakdownButton = this.shadow.querySelectorAll('.flip-button');
		var div_list = this.shadow.querySelectorAll('.flip-button'); // returns NodeList
		var div_array = [...div_list]; // converts NodeList to Array
		div_array.forEach(div => {
			div.addEventListener('click', () => this.flipCard());
		});
	}


	_getTemplate() {
		const template = `
            <style>
            	*{
            		margin: 0;
            		padding: 0;
            	}

                #cardComponent {
				    min-width: 220px;
				    min-height: 300px;
				    max-width: 300px;
				    max-height: 400px;
				    line-height: 0;
				    user-select: none;
				    user-drag: none;
				    perspective: 700px;
				    padding: 4px;
				    background-color: var(--card-type-Assessment, #fff);
				    border-radius: 18px;
				}

				.card__inner {
				  width: 100%;
				  height: 100%;
				  transition: transform 1s;
				  transform-style: preserve-3d;
				  position: relative;
				  min-height: inherit;
				  transform: rotateY(-180deg);
				}

				.card__inner.is-flipped {
				  transform: rotateY(0);
				}


				.card__face {
				  position: absolute;
				  width: 100%;
				  height: 100%;
				  -webkit-backface-visibility: hidden;
				  backface-visibility: hidden;
				  overflow: hidden;
				  border-radius: 14px;
				}

				.card__face--front {
				  display: flex;
				  align-items: center;
				  justify-content: center;
				}

				.card__face--back {
				  transform: rotateY(180deg);
				}

				.card__face img{
					max-width: 100%;
				}
				.button{
					position: absolute;
				    width: 30px;
				    height: 30px;
				    color: white;
				    background-color: rgb(0 0 0 / 0.1);
				    border: none;
				    font-size: 20px;
				    cursor: pointer;
				    line-height: 0;
				    border-radius: 5px;
				    z-index: 1;
				}
				.button:hover{
					background-color: rgb(0 0 0 / 0.5);
				}
				.flip-button{
				    bottom: 0;
				    right: 0;
				}
				.fav-button{
				    top: 0;
				    right: 0;
				    font-size:25px;
				}
            </style>
			<div id="cardComponent">
				<div class="card__inner">
					<div class="card__face card__face--front">
						<button class="fav-button button">☆</button>
						<button class="flip-button button">⮌</button>
						<img src="" id="card_front_image"></img>
					</div>

					<div class="card__face card__face--back">
					<button class="flip-button button">⮌</button>
					<img src="" id="card_back_image"></img>
					</div>
				</div>
			</div>
        `;

		return template;
	}

	renderCardImages(){
		const cardId = parseInt(this.getAttribute("card-id"));
		const imageFront = this.shadow.getElementById("card_front_image");
		//ternary operator used for when the card lands on card 1, as there is no suffix on those
		imageFront.src = ("../../../public/cards-png/SUPER cards poker size 061123" + (cardId==1 ? "" : ( (cardId*2)-1)) + ".png");
		const imageBack = this.shadow.getElementById("card_back_image");
		imageBack.src = ("../../../public//cards-png/SUPER cards poker size 061123" + (cardId*2) + ".png");
	}

	flipCard(){
		this.isFlipped = !this.isFlipped;
		const card = this.shadow.querySelector(".card__inner");
		this.isFlipped ? card.classList.add("is-flipped") : card.classList.remove("is-flipped");	
	}

	checkIfFav(){
		const favList = JSON.parse(localStorage.getItem("FAVOURITE_CARDS_LIST_STORE"));
		if (favList.some(saved => saved['card-id'] == this.getAttribute("card-id"))) {
			this.isFav = true;
			this.shadow.querySelector('.fav-button').innerHTML = "★";
		}
	}

	toggleFav(){
		this.isFav = !this.isFav;

		//custom event to let the main file know when a card is favourited or unfavourited
		this.dispatchEvent(
			new CustomEvent("favourited", {
				bubbles: true,
				detail: { isFav: this.isFav, cardId: this.getAttribute("card-id") }
			})
		);
		
		if (this.isFav === true) {
			this.shadow.querySelector('.fav-button').innerHTML = "★";
		}
		else{
			this.shadow.querySelector('.fav-button').innerHTML = "☆";
		}
	}

	//hue from hex code slightly modified from here https://css-tricks.com/converting-color-spaces-in-javascript/
	hexToHSL(H) {
	  // Convert hex to RGB first
	  let r = 0, g = 0, b = 0;

	    r = "0x" + H.substring(1,3);
	    g = "0x" + H.substring(3,5);
	    b = "0x" + H.substring(5,7);
	  
	  // Then to HSL
	  r /= 255;
	  g /= 255;
	  b /= 255;
	  let cmin = Math.min(r,g,b),
	      cmax = Math.max(r,g,b),
	      delta = cmax - cmin,
	      h = 0,
	      s = 0,
	      l = 0;

	  if (delta == 0)
	    h = 0;
	  else if (cmax == r)
	    h = ((g - b) / delta) % 6;
	  else if (cmax == g)
	    h = (b - r) / delta + 2;
	  else
	    h = (r - g) / delta + 4;

	  h = Math.round(h * 60);

	  if (h < 0)
	    h += 360;

	  l = (cmax + cmin) / 2;
	  return h;
	}

	colorizeCard(hex){
		const hue = this.hexToHSL(hex);
		this.shadow.getElementById("card_front_image").style.filter = `grayscale(1) sepia(1) saturate(2) hue-rotate(${hue}deg)`;
		this.shadow.getElementById("card_back_image").style.filter = `grayscale(1) sepia(1) saturate(2) hue-rotate(${hue}deg)`;
	}
}


customElements.define("super-assessment-card", SUPERAssessmentCard);