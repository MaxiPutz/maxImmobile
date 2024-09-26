import { html, LitElement, render } from "lit";
import { CardComponent, getFavoritListFromLocalStorage, getHideListFromLocalStorage } from "../../bottom/cardComponent/CardComponent.js";
import { styleFavoritList } from "./styleFavoritList.js";
import { favoriteDisable, favoriteEnable } from "../../bottom/cardComponent/svg.js";
import { closeIcon } from "./closeSvg.js";
import { generateUrlWithIds } from "../../../urlController.js";

console.log("call list");

/**
 * @typedef {Object} Dispose
 * @property {function () : Number} dispose
 */

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {Object} state
 */

/**
 * @typedef {(function (Action): Dispose )} EventObject
 */


/**
 * @typedef {Object} EventListener
 * @property { (EventObject) [] } listeners
 */

/**
 * @type {EventListener}
 */
let eventListener = {
    listeners: []
}


export let dispatchFavoritList = () => {
    eventListener.listeners.forEach(ele => ele({ state: {}, type: "updateOverLayList" }))
}



export class FavoritList extends LitElement {

    static styles = [styleFavoritList]

    /**
     * @param {LitElement} litTemplate
     * @param {function () : import("../../bottom/cardComponent/CardComponent.js").CardInfo[] } listCallback 
     */
    constructor(litTemplate, listCallback) {
        super()
        this.isCecked = false
        this.favoritList = listCallback()
        this.listCallback = listCallback

        this.litTemplate = litTemplate
        /**
         * @type {EventObject}
         */
        this.disposeEvent = (action) => () => ({
            dispose: () => -1
        })

    }

    firstUpdated() {
        /**
         * @type {EventObject}
         */
        this.disposeEvent = (action) => {
            console.log(action);
            if (this.isCecked) {
                return
            }
            this.favoritList = this.listCallback()
            this.requestUpdate()

            const index = eventListener.listeners.length
            return {
                dispose: () => {
                    eventListener.listeners = eventListener.listeners.filter(ele => ele !== this.disposeEvent)
                    return index
                }
            }
        }
        eventListener.listeners.push(this.disposeEvent)



    }

    disconnectedCallback() {
        this.disposeEvent({ state: {}, type: "delete" }).dispose()

    }



    render() {
        console.log("call render", this.favoritList.length);
        console.log("call render", this.favoritList.length);

        

        return html`
        <div class="container">
            <label class="favorit-label">
                <input class="favort-input" type="checkbox" @change=${(e) => {
                this.isCecked = e.target.checked

                console.log("this.isCecked", this.isCecked);
                if (!this.isCecked) {
                    console.log("shoud the list shoud be updated");
                    this.favoritList = this.listCallback()
                    this.requestUpdate()
                }

            }
            }>
                <span> ${this.litTemplate} ${this.favoritList.length} Elements</span>
                <div class="open-list">
                    ${this.favoritList.map(ele => new CardComponent(ele, true))}

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


                const csvList = this.favoritList.map((ele) => `${ele.price}€;${ele.squareMeters}m^2;${ele.destination};${ele.teaser};${ele.url}`).join("\n")

                try {
                    navigator.clipboard.writeText(csvList)
                        .then(() => {
                            alert("favorites are in clipboard")
                        })
                        .catch(err => {
                            console.error("Failed to copy text: ", err);
                            alert("http allows no clipbard copy you will forwart to a new tab with the csv")
                            const newWindow = window.open('', '_blank');
                            newWindow.document.write(html`<div>${csvList}</div>`);
                            newWindow.document.close()

                        });
                } catch {
                    alert("http allows no clipbard copy you will forwart to a new tab with the csv")
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write("<div>" + csvList + "</div>");
                    newWindow.document.close()
                }


            }
            }> copy to Clipboard</button>

<button @click=${() => {
                console.log(this.favoritList);


                const csvList = generateUrlWithIds()

                try {
                    navigator.clipboard.writeText(csvList)
                        .then(() => {
                            alert("url is in clipboard")
                        })
                        .catch(err => {
                            console.error("Failed to copy text: ", err);
                            alert("http allows no clipbard copy you will forwart to a new tab with the csv")
                            const newWindow = window.open('', '_blank');
                            newWindow.document.write(html`<div>${csvList}</div>`);
                            newWindow.document.close()

                        });
                } catch {
                    alert("http allows no clipbard copy you will forwart to a new tab with the csv")
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write("<a href='" + csvList + "'>"  + csvList + "</a>");
                    newWindow.document.close()
                }


            }
            }> copy shareLink to Clipboard</button>

            <div class="close-button">
                ${closeIcon}
            </div>
                </div>
            </label>

           
        </div>
        `
    }
}

customElements.define("favorit-list", FavoritList)

