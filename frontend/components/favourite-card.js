export default class favouriteCard extends HTMLElement {
	
	static get observedAttributes (){
		return ["card-id"];
	};

	get cardId () {
		return this.getAttribute();
	}

	constructor() {
		super();
		this.shadow = this.attachShadow({
			mode: "open"
		});
	}

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {
	}

	render() {
		this.shadow.innerHTML = this._getTemplate();
		this.renderCardImages();
	}


	_getTemplate() {
		const template = `
            <style>
            	*{
            		margin: 0;
            		padding: 0;
            	}

                #cardComponent {
				    min-width: 138px;
				    min-height: 188px;
				    line-height: 0;
				    user-select: none;
				    user-drag: none;
				    perspective: 700px;
				}

				.card__inner {
				  width: 100%;
				  height: 100%;
				  transition: transform 1s;
				  transform-style: preserve-3d;
				  position: relative;
				  min-height: inherit;
				}

				.card__face {
				  position: absolute;
				  width: 100%;
				  height: 100%;
				  -webkit-backface-visibility: hidden;
				  backface-visibility: hidden;
				  overflow: hidden;
				  border-radius: 7px;
				}

				.card__face--front {
				  display: flex;
				  align-items: center;
				  justify-content: center;
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
						<img src="" id="card_front_image"></img>
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
		imageFront.src = ("assets/cards-png/SUPER cards poker size 061123" + (cardId==1 ? "" : ( (cardId*2)-1)) + ".png");
	}
}


customElements.define("favourite-card", favouriteCard);