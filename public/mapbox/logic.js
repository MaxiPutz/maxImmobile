import { mapId } from "./staticNames.js";
import {mapboxglAccessToken} from "../private/token.js"

export function logic(map) {
    map.on('click', mapId.willhaben.layer, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const url = e.features[0].properties.url;
        window.open(url, '_blank');
    });

    map.on('mouseenter', mapId.willhaben.layer, () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', mapId.willhaben.layer, () => {
        map.getCanvas().style.cursor = '';
    });
}

export function getIsochrone(map, lng, lat, minutes, profile) {
    const url = `https://api.mapbox.com/isochrone/v1/mapbox/${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxglAccessToken}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            if (map.getSource('isochrone')) {
                map.getSource('isochrone').setData(data);
            } else {
                map.addSource('isochrone', {
                    'type': 'geojson',
                    'data': data
                });
                map.addLayer({
                    'id': 'isochrone-layer',
                    'type': 'fill',
                    'source': 'isochrone',
                    'layout': {},
                    'paint': {
                        'fill-color': '#5a3fc0',
                        'fill-opacity': 0.3
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching isochrone data:', error);
        });
}