import { getMainSize } from "../components/main/main.js";
import { mapboxglAccessToken } from "../private/token.js"
import { willhabenJson } from "./inputParser/inputWrapper.js";
import { getTransitInfoFeature, getWillhabenFeature, getTransitInfoSquareFeature } from "./inputParser/jsonToMapboxFeature.js"
import { addBusStationLayer } from "./layer/busLayer.js";
import { addCircleLayer, setCirclenLayer } from "./layer/circleLayer.js";
import { addLineLayer, setLineLayer } from "./layer/lineLayer.js";
import { addRailStationLayer } from "./layer/railLayer.js";
import { addTransitCyrcleLayer, addTransitMarkerLayer, addTransitSquareLayer, addTransitTextLayer } from "./layer/transitLayer.js";
import { addWillHabenLayer } from "./layer/willhabenLayer.js";
import { logic } from "./logic.js";
import { mapId } from "./staticNames.js";
import { measureIcon } from "./svg/icon.js";
import { setViewCoords } from "./viewInfos/viewInfos.js";
import { LitElement, html, css } from "lit"
/**
* @typedef {Object} LatLng
* @property {Number} lat
* @property {Number} lng
*/


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
   
    .hide {
        display: none;
        position: fixed;
    }

    input:not(:checked) ~ .icon {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        opacity: 0.7;
    }

    input:checked ~ .icon {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        opacity: 1;
    }

    .button {
        position: absolute;
        width: 100vw;
        z-index: 1000000000;

    }

    .white {
        background-color: white;
    }

    `


    constructor() {
        super();
        this.accessToken = mapboxglAccessToken; // Set your Mapbox token here or pass it as a property
        this.lat = 48.2082; // Default latitude (Vienna)
        this.lng = 16.3738; // Default longitude (Vienna)
        this.zoom = 10.5;     // Default zoom level
        this.markers = [];  // Default empty markers array
        this.map = undefined

        this.draw = undefined

        this.measureElement = undefined

        this.latLngMeasure = []

        this.measureString = ""
    }


    firstUpdated() {
        this.measureElement = this.shadowRoot.querySelector("input") 

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
            zoom: this.zoom
        });

        map = this.map

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        map.addControl(geocoder, 'bottom-right');



        map.on('load', () => {

            map.loadImage("https://img.icons8.com/ios-filled/50/000000/bus.png" , (err, img) => {
                map.addImage("bus-marker", img)
                addBusStationLayer(map, mapId.publicBusStation)
                
            })
        
            map.loadImage("https://img.icons8.com/ios-filled/50/000000/train.png" , (err, img) => {
                map.addImage("rail-marker", img)
                addRailStationLayer(map, mapId.publicRailStation)
            })
        

            map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
                if (error) {
                    console.error('Error loading image:', error);
                    return;
                }
                map.addImage('custom-marker', image);
         
                addTransitSquareLayer(map, mapId.transitSquareMap)

                addTransitTextLayer(map, mapId.transitText)

                addWillHabenLayer(map, mapId.willhaben)

                addCircleLayer(map, mapId.circle)

                addLineLayer(map, mapId.line)

                console.log("railStation");
        
                

                //addTransitCyrcleLayer(map, mapId.transitCyrcle)

                setViewCoords()


                logic(map)



            });

        });

        map.on('moveend', () => {
            setViewCoords();
        });


        map.on("click", (e) => {
            console.log("event from clickeing", e);
            if (this.measureElement.checked) {
                
                /**
                 * @type {LatLng[]}
                 */
                this.latLngMeasure;

                
                this.latLngMeasure.push(e.lngLat)

                setCirclenLayer(map, mapId.circle, this.latLngMeasure)
                if (this.latLngMeasure.length === 2) {
                    setLineLayer(map, mapId.line, this.latLngMeasure)
                        // Create a GeoJSON LineString from the two points

                    this.latLngMeasure = this.latLngMeasure.map(ele => [ele.lng, ele.lat])
                    const line = turf.lineString([this.latLngMeasure[0], this.latLngMeasure[1]]);
                    
                    // Calculate the distance between the two points in kilometers
                    const distance = turf.length(line, { units: 'meters' });

                    console.log(this.latLngMeasure);
                    
                    console.log(`Distance: `, distance);
                    
                    console.log(`Distance: ${distance.toFixed(2)} m`);
                 

                    // Reset the points after calculating the distance
                    this.measureString = distance.toFixed(2) + " m"
                    this.requestUpdate()
                    this.latLngMeasure = [];
                    this.measureElement.checked = false

                }
            }
            
        })


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

        <div>
            <label class="button">
                <input class="hide" type="checkbox" @change=${(e) => {
                    this.latLngMeasure = []
                }}>
                <div class="icon">
                    <div></div>
                    <div class="white">
                        ${measureIcon}
                    </div>
                    <div class="white" >${this.measureString}</div>
                    <div></div>
                </div>
            </label>
        </div>
        <div id="map">

        </div>
        `
    }
}

customElements.define("map-box", MapBox)

export { map }