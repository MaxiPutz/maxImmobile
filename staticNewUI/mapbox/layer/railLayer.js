import { railStation } from "../../assets/publicStation/railStation.js";


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addRailStationLayer(map, info) {
    console.log("", info)
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': railStation.features
        }
    });



    map.addLayer({
        'id': info.layer,
        'type': 'symbol',
        'source': info.source,
        'layout': {
            'icon-image': 'rail-marker',
            'icon-size': [
                'interpolate', ['linear'], ['zoom'],
                0, 0.2, // Kleinere Größe bei Zoom-Level 0
                12, 0.3, // Moderate Größe bei Zoom-Level 12
                16, 0.4 // Größere Größe bei Zoom-Level 16
            ],
            'icon-allow-overlap': true,
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
            'text-optional': true,
        }
    });

    map.isWillhabenLayerReady = true
}


let isVisible = true
/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function toggleRailLayerVisible(map, info) {
    isVisible = !isVisible

    const newData = {
        'type': 'FeatureCollection',
        'features': isVisible ? railStation.features : []
    }

    map.getSource(info.source).setData(newData);


    console.log("reloadWillhaben Layer", newData);
    console.log(info);  
}