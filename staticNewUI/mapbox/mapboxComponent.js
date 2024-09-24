import { getMainSize } from "../components/main/main.js";
import { mapboxglAccessToken } from "../private/token.js"
import { willhabenJson } from "./inputParser/inputWrapper.js";
import { getTransitInfoFeature, getWillhabenFeature, getTransitInfoSquareFeature } from "./inputParser/jsonToMapboxFeature.js"
import { addTransitCyrcleLayer, addTransitMarkerLayer, addTransitSquareLayer, addTransitTextLayer } from "./layer/transitLayer.js";
import { addWillHabenLayer } from "./layer/willhabenLayer.js";
import { logic } from "./logic.js";
import { mapId } from "./staticNames.js";
import { setViewCoords } from "./viewInfos/viewInfos.js";
import { LitElement, html, css } from "lit"


let map = {}
const defaultLat = 48.2082
const defaultLng = 16.3738

map.isWillhabenLayerReady = false

let width = 100
let height = 100

let myReload = () => {
    console.log("default funcito");

}

/**
 * 
 * @param {Object} calback 
 * @param {number} calback.width
 * @param {number} calback.height
 */
export let dispatchSlotSize = (calback) => {
    width = calback.width
    height = calback.height

    myReload()
}


class MapBox extends LitElement {

    static styles = css`
    :host{        
        height: 90vh;
    }
    
    .mapboxgl-ctrl-attrib.mapboxgl-compact {
            display: none;
        }
    
    .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl{
        transform: scale(0.75);
        margin-right: -25px;
    }
   

    `


    constructor() {
        super();
        this.accessToken = mapboxglAccessToken; // Set your Mapbox token here or pass it as a property
        this.lat = 48.2082; // Default latitude (Vienna)
        this.lng = 16.3738; // Default longitude (Vienna)
        this.zoom = 12;     // Default zoom level
        this.markers = [];  // Default empty markers array
        this.map = undefined


    }


    firstUpdated() {

        myReload = () => {
            console.log("will it works");
            this.requestUpdate();

            setTimeout(() => {
                this.map.resize()
            }, 1000);

        }

        mapboxgl.accessToken = this.accessToken;


        this.map = new mapboxgl.Map({
            container: this.shadowRoot.getElementById('map'),
            style: `mapbox://styles/mapbox/streets-v12`,
            center: [16.3738, 48.2082], // Centered on Vienna, Austria
            zoom: 12
        });

        map = this.map

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });

        map.addControl(geocoder, 'bottom-right');



        map.on('load', () => {
            map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
                if (error) {
                    console.error('Error loading image:', error);
                    return;
                }
                map.addImage('custom-marker', image);

                addTransitSquareLayer(map, mapId.transitSquareMap)

                addTransitTextLayer(map, mapId.transitText)

                addWillHabenLayer(map, mapId.willhaben)

                //addTransitCyrcleLayer(map, mapId.transitCyrcle)

                setViewCoords()


                logic(map)



            });

        });

        map.on('moveend', () => {
            setViewCoords();
        });





    }

    render() {



        let getStyle = () => css`
        #map {
            top: 0;
            bottom: 0;
            height: ${height}px;
            width: ${width}px;
            z-index: 0;
        }

        button {
            position: fixed;
            z-index: 999;
        }
        .mapboxgl-ctrl-attrib.mapboxgl-compact {
            display: none;
        }
        `

        let style = html`
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet">
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css" type="text/css">
        <style>
            ${getStyle()}
        </style>
        `


        return html`
        ${style}
        <div id="map">

        </div>
        `
    }
}

customElements.define("map-box", MapBox)

export { map }