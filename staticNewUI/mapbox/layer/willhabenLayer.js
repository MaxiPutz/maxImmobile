import { getWillhabenFeature, getWillhabenFiltedFeature } from "../inputParser/jsonToMapboxFeature.js";

/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addWillHabenLayer(map, info) {
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': getWillhabenFiltedFeature()
        }
    });



    map.addLayer({
        'id': info.layer,
        'type': 'symbol',
        'source': info.source,
        'layout': {
            'icon-image': 'custom-marker',
            'icon-size': [
                'interpolate', ['linear'], ['zoom'],
                0, 0.3,
                12, 0.5,
                16, 0.8
            ],
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
            'text-optional': true,
        }
    });

    map.isWillhabenLayerReady = true
}


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function reloadWillhabenLayer(map, info) {
    const newData = {
        'type': 'FeatureCollection',
        'features': getWillhabenFiltedFeature()
    }

    map.getSource(info.source).setData(newData);


    console.log("reloadWillhaben Layer", newData);
    console.log(info);


}