import { html, LitElement, render } from "lit";
import { CardComponent, getFavoritListFromLocalStorage } from "../../bottom/cardComponent/CardComponent.js";
import { styleFavoritList } from "./styleFavoritList.js";
import { favoriteDisable, favoriteEnable } from "../../bottom/cardComponent/svg.js";

console.log("call list");

let dispatchFavoritListChain = () => undefined
export let dispatchFavoritList = () => {
    dispatchFavoritListChain()
}



export class FavoritList extends LitElement {

    static styles = [styleFavoritList]

    constructor() {
        super()
        this.isCecked = false
        this.favoritList = getFavoritListFromLocalStorage()

    }

    firstUpdated() {


        dispatchFavoritListChain = () => {
            console.log("from chain");

            if (this.isCecked) {
                return
            }
            this.favoritList = getFavoritListFromLocalStorage()
            this.requestUpdate()
        }
    }

    render() {
        console.log("call render");

        return html`
        <div class="container">
            <label class="favorit-label">
                <input class="favort-input" type="checkbox" @change=${(e) => {
                this.isCecked = e.target.checked

                console.log("this.isCecked", this.isCecked);

            }
            }>
                <span> ${favoriteEnable} ${this.favoritList.length} Elements</span>
                <div class="open-list">
                    ${this.favoritList.map(ele => new CardComponent(ele))}

                    <button @click=${() => {
                console.log(this.favoritList);

                this.favoritList.forEach((ele) => {
                    const url = ele.url
                    console.log(ele.url);

                    window.open(url, '_blank', 'noopener,noreferrer');
                })
            }
            }> open all</button>

                    <button @click=${() => {
                console.log(this.favoritList);


                const csvList = this.favoritList.map((ele) => `${ele.price}€,${ele.squareMeters}m^2,${ele.destination},${ele.teaser},${ele.url}`).join("\n")
                navigator.clipboard.writeText(csvList)
                    .then(() => {
                        alert("favorites are in clipboard")
                    })
                    .catch(err => {
                        console.error("Failed to copy text: ", err);
                    });

            }
            }> copy to clipboard</button>
                </div>
            </label>
        </div>
        `
    }
}

customElements.define("favorit-list", FavoritList)

