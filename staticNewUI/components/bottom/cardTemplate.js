import { html } from "lit"




/**
 * @param {object} cardInfo
 * @param {string} cardInfo.squareMeters
 * @param {string} cardInfo.price
 * @param {string} cardInfo.destination
 * @param {string} cardInfo.url
 * @param {function () } callback
 * @returns {html}
 */
export const cardtemplateComponent = (cardInfo, callback) => {


    return html`
    <div class="card" @click=${callback}>
        <div class="card1">
            <div class="card-title">${cardInfo.squareMeters} m^2</div>
            <div class="card-subtitle">${cardInfo.destination}</div>
            <hr class="card-divider">
            <div class="card-footer">
                <div class="card-price"><span>€</span> ${cardInfo.price}</div>
            </div>
        </div>
    </div>
`
}