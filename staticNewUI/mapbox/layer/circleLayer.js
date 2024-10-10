


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addCircleLayer(map, info) {
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    map.addLayer({
        'id': info.layer,
        'type': 'circle',
        'source': info.source,
        'paint': {
            'circle-radius': [
                'interpolate', ['linear'], ['zoom'],
                12, 5,  // Circle size at zoom 12
                16, 10  // Circle size at zoom 16
            ],
            'circle-color': '#FF4500',  // Set circle color (e.g., orange-red)
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
        },
        'layout': {
            'visibility': 'visible'
        }
    });

    map.isWillhabenLayerReady = true
}

/**
* @typedef {Object} LatLng
* @property {Number} lat
* @property {Number} lng
*/


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 * @param { import("../mapboxComponent").LatLng[]} feature 
 */
export function setCirclenLayer(map, info, feature) {
    const newData = {
        'type': 'FeatureCollection',
        'features': feature.map(coord => ({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [coord.lng, coord.lat]  // Convert LatLng to [lng, lat]
            },
            'properties': {
                'title': 'Custom Title'  // Optional: Add any properties you want to display in the layer
            }
        }))
    };

    map.getSource(info.source).setData(newData);


    console.log("reloadWillhaben Layer", newData);
    console.log(info);


}