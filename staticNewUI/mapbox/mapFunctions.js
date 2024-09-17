/**
 * Generates a square polygon around a central coordinate.
 * 
 * @param {Object} centerCoords - The central coordinates.
 * @param {number} centerCoords.lat - The latitude of the center point.
 * @param {number} centerCoords.lng - The longitude of the center point.
 * @param {number} sideLength - The length of the square's side in meters.
 * @returns {Object} - A GeoJSON polygon representing the square.
 */
export function generateSquarePolygon(centerCoords, sideLength) {
    const halfSideLength = sideLength / 2;
    const earthRadius = 6371 * 1000; // Earth radius in meters

    const offsetCoords = [
        { x: -halfSideLength, y: halfSideLength },
        { x: halfSideLength, y: halfSideLength },
        { x: halfSideLength, y: -halfSideLength },
        { x: -halfSideLength, y: -halfSideLength }
    ];

    const coordinates = offsetCoords.map(offset => offsetToCoords(centerCoords, offset.x, offset.y, earthRadius));
    coordinates.push(coordinates[0]); // Close the polygon

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [coordinates.map(coord => [coord.lng, coord.lat])]
        },
        properties: {
            time: centerCoords.time // Assuming time is attached to centerCoords
        }
    };
}

/**
 * Converts x and y offsets in meters to geographical coordinates (lat, lng).
 * 
 * @param {Object} centerCoords - The central coordinates.
 * @param {number} offsetX - The offset in the east-west direction (positive is east).
 * @param {number} offsetY - The offset in the north-south direction (positive is north).
 * @param {number} earthRadius - The radius of the Earth in meters.
 * @returns {Object} - The geographical coordinates {lat, lng}.
 */
function offsetToCoords(centerCoords, offsetX, offsetY, earthRadius) {
    const latRadians = centerCoords.lat * (Math.PI / 180);
    const lngRadians = centerCoords.lng * (Math.PI / 180);

    const newLat = latRadians + (offsetY / earthRadius);
    const newLng = lngRadians + (offsetX / (earthRadius * Math.cos(latRadians)));

    return {
        lat: newLat * (180 / Math.PI),
        lng: newLng * (180 / Math.PI)
    };
}

// Example: Generate a GeoJSON FeatureCollection for squares
const squareSideLength = 1500; // 1.5 km square side length
const pointsData = [
    { lat: 48.1855, lng: 16.3781, time: 20 },
    // Add more points here
];

const squareFeatures = pointsData.map(point => generateSquarePolygon(point, squareSideLength));
const geoJsonSquares = {
    type: 'FeatureCollection',
    features: squareFeatures
};

console.log(geoJsonSquares.features.map(ele => JSON.stringify( ele.geometry.coordinates)));
