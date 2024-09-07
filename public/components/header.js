import { html, render, } from 'https://cdn.zywave.com/lit-html@2.1.1/lit-html.js';
import { styleMap } from "https://cdn.zywave.com/lit-html@2.1.1/directives/style-map.js"

import { getMarkCoords } from "../mapbox/viewInfos/viewInfos.js"
import { setSelectTransitIndex } from '../mapbox/inputParser/inputWrapper.js';
import { reloadTransitSquareLayer, reloadTransitLayer } from '../mapbox/layer/transitLayer.js';
import { map } from "../mapbox/mapbox.js"
import { mapId } from '../mapbox/staticNames.js';
import {transitOptions} from "../assets/transit/index.js"


const isochromeComponent = () => {

    return html` <label for="minutes">Time (minutes):</label>
    <input id="minutes" type="number" value="15" min="1" max="60">

    <label for="profile">Travel Mode:</label>
    <select id="profile">
        <option value="driving">Driving</option>
        <option value="driving-traffic">Driving-traffic</option>

        <option value="walking">Walking</option>
        <option value="cycling">Cycling</option>
    </select>

    <button id="getIsochrone">Get Isochrone</button>`
}


const menuComponent = () => {

    const coords = getMarkCoords()

    return html`<div>
            <div>
                <h4>Isochrone Settings: lat: ${coords.lat} lng: ${coords.lng}</h4>
            </div>
            ${isochromeComponent()}
            <div>
            <select name="cars" id="cars" @change=${event => {
                console.log("select",  event.target.value) 
                console.log("select", Number( event.target.value) )

                setSelectTransitIndex( Number(event.target.value))
                reloadTransitSquareLayer(map, mapId.transitSquareMap)
                reloadTransitLayer(map, mapId.transitText)

                }}>
                ${transitOptions.map((ele, i ) => html`<option value=${i}> ${ele} </option>`)}
            </select>
                </label>
            </div>
        </div>`
}



render(menuComponent(), document.querySelector("#header"))

export const customHeaderRender = () => {
    render(menuComponent(), document.querySelector("#header"))
}