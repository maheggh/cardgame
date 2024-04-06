class PointToken extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<h3>Hello world, I am custom<h3>`
    }
}

element.attachShadow({mode: open})

window.customElements.define("point-token", PointToken)