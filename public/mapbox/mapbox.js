import {mapboxglAccessToken} from "../private/token.js"
import { willhabenJson } from "./inputParser/inputWrapper.js";
import { getTransitInfoFeature, getWillhabenFeature, getTransitInfoSquareFeature } from "./inputParser/jsonToMapboxFeature.js"
import { addTransitCyrcleLayer, addTransitMarkerLayer, addTransitSquareLayer, addTransitTextLayer } from "./layer/transitLayer.js";
import { addWillHabenLayer } from "./layer/willhabenLayer.js";
import { logic } from "./logic.js";
import { mapId } from "./staticNames.js";
import { setViewCoords } from "./viewInfos/viewInfos.js";


mapboxgl.accessToken = mapboxglAccessToken;


export const map = new mapboxgl.Map({
    container: 'map',
    style: `mapbox://styles/mapbox/streets-v12`,
    center: [16.3738, 48.2082], // Centered on Vienna, Austria
    zoom: 12
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  });

map.addControl(geocoder, 'top-right');


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