import { html, LitElement, render } from "lit"
import { cardStyle, flipIcon, gridStyle } from "./styleCardComponent.js"
import { changeDisable, changeEnable, favoriteDisable, favoriteEnable, hideDisable, hideEnable, openDisable, openEnable } from "./svg.js"

let dispatchFavoritList = () => undefined
export function setDispatchFavoritList(injectDispatchFavoritList) {

    dispatchFavoritList = injectDispatchFavoritList
}


/**
 * @typedef {object} CardInfo
 * @property {string} cardInfo.squareMeters
 * @property {string} cardInfo.price
 * @property {string} cardInfo.destination
 * @property {string} cardInfo.teaser
 * @property {string} cardInfo.url
 * @property {function () } callback
 * @property {?string} cardInfo.id
 */

export class CardComponent extends LitElement {

    static styles = [cardStyle, flipIcon, gridStyle]

    /**
     * @param {CardInfo} cardInfo
     * @param {boolean?} isHideListDisplayed
     */
    constructor(cardInfo, isHideListDisplayed) {
        super()

        this.cardInfo = cardInfo
        this.cardInfo.id = cardInfo.url
        this.favoriteIdMap = getFavoritIdMap()
        this.hideIdMap = getHideIdMap()

        this.isHideListDisplayed = isHideListDisplayed ? true : false


    }

    render() {


        let isDisplayed = this.isHideListDisplayed || (this.hideIdMap[this.cardInfo.id] ? false : true)

        console.log("isDisplayed", isDisplayed);
        
        return html`
        <!-- Outer card flipping checkbox -->
        <label class="card-label ${isDisplayed ? "" : "hide"}">
            <input class="checkbox-card" type="checkbox" />
            <div class="flip-card ">
                <div class="flip-card-inner">
                    <!-- Front of the card -->
                    <div class="flip-card-front ${this.favoriteIdMap[this.cardInfo.id] ? "fav-card" : ""}">
                        <p class="title">${this.cardInfo.squareMeters} m²</p>
                        <p class="teaser">${this.cardInfo.teaser}</p>
                        <p class="price">${this.cardInfo.price} €</p>
                        <p class="destination">${this.cardInfo.destination}</p>
                    </div>
                    <div class="flip-card-back">
        ${backCard(this.cardInfo, this.favoriteIdMap, this.hideIdMap, this.isHideListDisplayed)}
                    </div>
                </div>
            </div>
        </label>

        `
    }
}

customElements.define("card-component", CardComponent)


/*

render(html`${new CardComponent({
    callback: () => console.log("callback"),
    destination: "weiden",
    price: 4500,
    squareMeters: 45,
    url: "https://fonts.google.com/icons?selected=Material+Symbols+Outlined:swap_vert:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=sort&icon.size=24&icon.color=%23000000&icon.platform=web"

})}`, document.getElementById("app"))
*/


/**
* @param {CardInfo} cardInfo
* @param {object} favoriteIdMap
* @param {object} hideIdMap
* @param {boolean} isHideListDisplayed
*/
function backCard(cardInfo, favoriteIdMap, hideIdMap, isHideListDisplayed) {
    cardInfo.id = cardInfo.url



    return html`
    <div class="grid-container">
                        <div class="fav">
                            <label class="icon-label"> 
                                <input class="icon-checkbox" type="checkbox"  .checked=${favoriteIdMap[cardInfo.id]}
                                @change=${(e) => {
            const isChecked = e.target.checked
            if (isChecked) {
                pushToLocalStorageFavoritList(cardInfo)
            } else {
                removeFromLocalStorageFavoritList(cardInfo)
            }

            console.log("interest", getFavoritListFromLocalStorage());

            console.log(isChecked);


            dispatchFavoritList()
        }
        } >
                                <div class= "fav-bgc">
                                    <div class="icon-container">
                                        <div class="icon-disable">${favoriteDisable}</div>
                                        <div class="icon-enable">${favoriteEnable}</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="opn">
                            <label class="icon-label"> 
                            <input class="icon-checkbox" type="checkbox" @change=${() => {
            const url = cardInfo.url
            window.open(url, '_blank');
        }} >
                                <div class= "opn-bgc">
                                    <div class="icon-container">
                                        <div class="icon-disable">${openDisable}</div>
                                        <div class="icon-enable">${openEnable}</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="hid">
                            <label class="icon-label"> 
                            <input class="icon-checkbox" type="checkbox" .checked=${hideIdMap[cardInfo.id]}  @change=${(e) => {

            const isChecked = e.target.checked
            if (isChecked) {
                pushToLocalStorageHideList(cardInfo)
            } else {
                removeFromLocalStorageHideList(cardInfo)
            }

            console.log("interest", getHideListFromLocalStorage());

            console.log(isChecked);


            dispatchFavoritList()
        }}>
                                <div class="hid-bgc">
                                    <div class="icon-container">
                                        <div class="icon-disable">${hideDisable}</div>
                                        <div class="icon-enable">${hideEnable}</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="cfp">
                            <div class="icon-label"> 
                                <input class="icon-checkbox" type="checkbox" >
                                    <div class="cfp-bgc">
                                        <div class="icon-container">
                                            <div class="icon-disable">${changeDisable}</div>
                                            <div class="icon-enable">${changeEnable}</div>
                                        </div>
                                    </div>
                            </div>
                        </div>
    </div>


    `
}




/**
 * 
 * @param {CardInfo} cardInfo 
 */
export function pushToLocalStorageFavoritList(cardInfo) {
    cardInfo.id = cardInfo.url
    cardInfo.shortId = cardInfo.url.slice(-4)
    let favoritList = getFavoritListFromLocalStorage();

    console.log(favoritList)

    if (favoritList.some(ele => ele.id === cardInfo.id)) {
        return
    }
    favoritList.push(cardInfo);

    const favoriteIdMap = getFavoritIdMap()
    favoriteIdMap[cardInfo.id] = true

    localStorage.setItem('favoritList', JSON.stringify(favoritList));
    localStorage.setItem("favoriteIdMap", JSON.stringify(favoriteIdMap))
}
/**
 * @returns {CardInfo []}
 */
export function getFavoritListFromLocalStorage() {
    let favoritList = localStorage.getItem('favoritList');
    console.log(favoritList);

    return favoritList ? JSON.parse(favoritList) : [];
}


export function getFavoritIdMap() {
    let favoriteIdMap = localStorage.getItem("favoriteIdMap")
    return favoriteIdMap ? JSON.parse(favoriteIdMap) : {}
}


/**
 * @param {CardInfo} cardInfo
 */
function removeFromLocalStorageFavoritList(cardInfo) {
    cardInfo.id = cardInfo.url
    cardInfo.shortId = cardInfo.url.slice(-4)

    const oldList = getFavoritListFromLocalStorage()
    const newList = oldList.filter(ele => ele.id !== cardInfo.id)

    console.log("delete", oldList.length, newList.length);


    const favoriteIdMap = getFavoritIdMap()
    favoriteIdMap[cardInfo.id] = undefined

    localStorage.setItem('favoritList', JSON.stringify(newList));
    console.log("short id", cardInfo.shortId);
    localStorage.setItem("favoriteIdMap", JSON.stringify(favoriteIdMap))


}





/**
 * 
 * @param {CardInfo} cardInfo 
 */
function pushToLocalStorageHideList(cardInfo) {
    cardInfo.id = cardInfo.url
    cardInfo.shortId = cardInfo.url.slice(-4)
    let hideList = getHideListFromLocalStorage();

    console.log(hideList)

    if (hideList.some(ele => ele.id === cardInfo.id)) {
        return
    }
    hideList.push(cardInfo);

    const hideIdMap = getHideIdMap()
    hideIdMap[cardInfo.id] = true

    localStorage.setItem('hideList', JSON.stringify(hideList));
    localStorage.setItem("hideIdMap", JSON.stringify(hideIdMap))
}
/**
 * @returns {CardInfo []}
 */
export function getHideListFromLocalStorage() {
    let hideList = localStorage.getItem('hideList');
    console.log(hideList);

    return hideList ? JSON.parse(hideList) : [];
}


function getHideIdMap() {
    let hideIdMap = localStorage.getItem("hideIdMap")
    return hideIdMap ? JSON.parse(hideIdMap) : {}
}


/**
 * @param {CardInfo} cardInfo
 */
function removeFromLocalStorageHideList(cardInfo) {
    cardInfo.id = cardInfo.url
    cardInfo.shortId = cardInfo.url.slice(-4)

    const oldList = getHideListFromLocalStorage()
    const newList = oldList.filter(ele => ele.id !== cardInfo.id)

    console.log("delete", oldList.length, newList.length);


    const hideIdMap = getHideIdMap()
    hideIdMap[cardInfo.id] = undefined

    localStorage.setItem('hideList', JSON.stringify(newList));
    console.log("short id", cardInfo.shortId);
    localStorage.setItem("hideIdMap", JSON.stringify(hideIdMap))
}