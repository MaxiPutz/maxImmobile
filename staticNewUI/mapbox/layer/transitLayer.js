import { getTransitInfoFeature, getTransitInfoSquareFeature } from "../inputParser/jsonToMapboxFeature.js";
/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addTransitMarkerLayer (map, info) {
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': getTransitInfoFeature()
        }
    });
   
    map.addSource('squares', {
        type: 'geojson',
        data: geoJsonSquares
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
            ]
        }
    });
}



/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addTransitTextLayer (map, info) {
    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': getTransitInfoFeature()
        }
    });

    map.addLayer({
        'id': info.layer,
        'type': 'symbol',
        'source': info.source,
        'minzoom': 12,
        'layout': {
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
            'text-optional': false,
        }
    });
}




/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addTransitCyrcleLayer (map, info) {

    map.addSource(info.source, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': getTransitInfoFeature()
        }
    });

    map.addLayer({
        'id': info.layer,
        'type': 'circle',
        'source': info.source,
        'paint': {
            // Set a uniform radius for all circles
            'circle-radius': 30,
        
            // Interpolate the color of the circle based on the 'time' property
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'time'],
                0, 'green',     // Low time = green
                90, 'red'       // High time = red
            ],
        
                // Optionally adjust the circle opacity for better visibility
                'circle-opacity': 0.7,
            }
    });
}


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function addTransitSquareLayer(map, info) {
    
    const test = getTransitInfoSquareFeature(1000)

    const geoJsonPolygon = {
        "type": "FeatureCollection",
        "features": test
    };

   
    console.log("reloadTransitLaxer Layer", geoJsonPolygon);

    map.addSource(info.source, {
        'type': 'geojson',
        'data':  geoJsonPolygon 
    });

    // Add a fill layer to visualize the polygon
    map.addLayer({
        'id': info.layer,
        'type': 'fill',
        'source': info.source,
        'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'time'],
                0, 'green',
                90, 'red'
            ],
            'fill-opacity': 0.2,
            'fill-outline-color': 'black'
        }
    });
    
}


/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function reloadTransitSquareLayer(map, info) {
    const newData = {
        'type': 'FeatureCollection',
        'features': getTransitInfoSquareFeature(1000)
    }

    map.getSource(info.source).setData(newData);
    

    console.log("reloadTransitLaxer Layer", newData);
    console.log(info);
    
    
}

/**
 * 
 * @param {*} map 
 * @param {object} info
 * @param {string} info.source 
 * @param {string} info.layer 
 */
export function reloadTransitLayer(map, info) {
    const newData = {
        'type': 'FeatureCollection',
        'features': getTransitInfoFeature()
    }

    map.getSource(info.source).setData(newData);
    

    console.log("reloadTransitText Layer", newData);
    console.log(info);
    
    
}