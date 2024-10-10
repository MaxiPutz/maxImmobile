


/**
 * Adds a line layer to the map.
 * 
 * @param {*} map - The Mapbox map instance
 * @param {object} info - Information about the source and layer
 * @param {string} info.source - The source ID to use
 * @param {string} info.layer - The layer ID to use
 */
export function addLineLayer(map, info) {
    // Add a GeoJSON source for the line
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    // Add a line layer for the paths
    map.addLayer({
        'id': info.layer,
        'type': 'line',
        'source': info.source,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#0074D9',  // Blue line color
            'line-width': 4,          // Set the line width
            'line-opacity': 0.8       // Slightly transparent
        }
    });

    map.isLineLayerReady = true;  // Assuming you have logic dependent on this
}


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 * @param { import("../mapboxComponent").LatLng[]} feature 
 */
export function setLineLayer(map, info, feature) {
   
    if (feature.length !== 2) {
        console.error("Feature array must contain exactly 2 entries for a line");
        return;
    }

    // Construct the LineString with two coordinates
    const newData = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [feature[0].lng, feature[0].lat],  // First point
                        [feature[1].lng, feature[1].lat]   // Second point
                    ]
                }
            }
        ]
    };

    map.getSource(info.source).setData(newData);


    console.log("reloadWillhaben Layer", newData);
    console.log(info);


}