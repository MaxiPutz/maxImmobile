import {accessTokenObject} from "../../../static/private/token.js"
import { coordsToGeoJson } from "./toGeoJson.js"
import fs from "fs"



/**
 * Generates a grid of points around a central coordinate within a square of a given length.
 * 
 * @param {Object} centerCoords - The central coordinates of the grid.
 * @param {number} centerCoords.lat - The latitude of the center point.
 * @param {number} centerCoords.lng - The longitude of the center point.
 * @param {number} squareLength - The length of the square's side in meters.
 * @param {number} gridDistance - The distance between each point in the grid in meters.
 * @returns {Array<Object>} - An array of objects containing the coordinates {lat, lng} of each grid point.
 */
export function generateGrid(centerCoords, squareLength, gridDistance) {
    const earthRadius = 6371 * 1000; // Earth radius in meters

    const halfSquareLength = squareLength / 2;
    const numPointsPerSide = Math.floor(squareLength / gridDistance) + 1;
    const gridPoints = [];

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            const offsetX = (i * gridDistance) - halfSquareLength;
            const offsetY = (j * gridDistance) - halfSquareLength;

            const point = offsetToCoords(centerCoords, offsetX, offsetY, earthRadius);
            console.log(i, j);
            
            gridPoints.push(point);
        }
    }

    return gridPoints;
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


export function recursiveWayToR(centerLat, centerLng, radius, numPoints, deltaM, curObj = {
    centerLat,
    centerLng,
    dist: 0,
    curLat: centerLat,
    curLng: centerLng,
    minAngle: undefined,
    maxAngle: undefined
}) {

    const lastState = JSON.parse(JSON.stringify(curObj))

    const deltaAlpha = Math.PI * 2 / numPoints
    let deltaPoints = []
    for (let i = 0; i < numPoints; i++) {
    
        const minAngle =  i * deltaAlpha - deltaAlpha/2 
        const maxAngle  =  i * deltaAlpha + deltaAlpha/2 
        
        deltaPoints.push({
            deltaM: deltaM,
            deltaAlpha: i * deltaAlpha,
            minAngle: curObj.minAngle === undefined ? minAngle : curObj.minAngle  ,
            maxAngle: curObj.maxAngle === undefined ? maxAngle : curObj.maxAngle ,
        })
    }
    
    deltaPoints = deltaPoints.map(ele => ({
        ...curObj,
        ...calculateEndpoint({lat: curObj.curLat, lng: curObj.curLng}, {
            deltaAlpha: ele.deltaAlpha,
            deltaM: ele.deltaM,
        } ),
        minAngle: ele.minAngle,
        maxAngle: ele.maxAngle
    }) ).map(ele => ({...ele, curLat: ele.lat,  curLng: ele.lng}))
    .map( ele => ({
        ...ele,
        endPointdist: distCoordsToMeter({lat: ele.centerLat, lng: ele.centerLng}, {lat: ele.lat, lng: ele.lng}),
        endPointAngle : destCoordsToAngle({lat: ele.centerLat, lng: ele.centerLng}, {lat: ele.lat, lng: ele.lng})
    }))


    console.log(deltaPoints)
    console.log(JSON.stringify( deltaPoints.map( ele => coordsToGeoJson(ele))  ));
    result.push(...deltaPoints.map(ele => coordsToGeoJson(ele)))

    for (let ele of deltaPoints) {
        if (lastState.minAngle === undefined || lastState.maxAngle === undefined) {
            recursiveWayToR(centerLat, centerLng, radius, numPoints, deltaM, ele)
        } else if (
            lastState.endPointAngle > ele.minAngle && 
            lastState.endPointAngle < ele.maxAngle && 
            lastState.endPointdist < ele.endPointdist && 
            ele.endPointdist < radius  ) {
            recursiveWayToR(centerLat, centerLng, radius, numPoints, deltaM, ele)
            
        }

    }

}


/**
 * Calculates the endpoint given a start coordinate and a polar coordinate delta.
 * 
 * @param {Object} startCoords - The starting coordinates.
 * @param {number} startCoords.lat - The latitude of the starting point.
 * @param {number} startCoords.lng - The longitude of the starting point.
 * @param {Object} delta - The polar coordinate delta.
 * @param {number} delta.deltaM - The distance in meters.
 * @param {number} delta.deltaAlpha - The angle in radians (clockwise from north).
 * @returns {Object} The endpoint coordinates {lat, lng}.
 */
function calculateEndpoint(startCoords, delta) {
    const earthRadius = 6371 * 1000; // Earth radius in meters

    const lat1 = startCoords.lat * (Math.PI / 180); // Convert latitude to radians
    const lng1 = startCoords.lng * (Math.PI / 180); // Convert longitude to radians

    const angularDistance = delta.deltaM / earthRadius; // Angular distance in radians
    const bearing = delta.deltaAlpha; // Bearing angle in radians

    console.log("bearing", bearing);
    

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) +
                           Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing));

    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
                                   Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));

    console.log("lng2", lng2);
    
    // Convert the endpoint from radians to degrees
    const endLat = lat2 * (180 / Math.PI); // Correct conversion to degrees
    const endLng = lng2 * (180 / Math.PI); // Correct conversion to degrees



    return {
        lat: endLat,
        lng: endLng
    };
}

/**
 * Calculates the bearing (azimuth) angle in radians from a start coordinate to an end coordinate.
 * 
 * @param {Object} startCoords - The starting coordinates.
 * @param {number} startCoords.lat - The latitude of the starting point.
 * @param {number} startCoords.lng - The longitude of the starting point.
 * @param {Object} endCoords - The ending coordinates.
 * @param {number} endCoords.lat - The latitude of the ending point.
 * @param {number} endCoords.lng - The longitude of the ending point.
 * @returns {number} The bearing angle in radians (clockwise from north).
 */
function destCoordsToAngle(startCoords, endCoords) {
    const lat1 = startCoords.lat * (Math.PI / 180); // Convert latitude to radians
    const lng1 = startCoords.lng * (Math.PI / 180); // Convert longitude to radians
    const lat2 = endCoords.lat * (Math.PI / 180); // Convert latitude to radians
    const lng2 = endCoords.lng * (Math.PI / 180); // Convert longitude to radians

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x); // Bearing in radians

    // Normalize the bearing to be within the range of 0 to 2π
    if (bearing < 0) {
        bearing += 2 * Math.PI;
    }

    return bearing;
}


/**
 * Calculates the distance in meters between two geographical coordinates.
 * 
 * @param {Object} startCoords - The starting coordinates.
 * @param {number} startCoords.lat - The latitude of the starting point.
 * @param {number} startCoords.lng - The longitude of the starting point.
 * @param {Object} endCoords - The ending coordinates.
 * @param {number} endCoords.lat - The latitude of the ending point.
 * @param {number} endCoords.lng - The longitude of the ending point.
 * @returns {number} The distance between the two coordinates in meters.
 */
export function distCoordsToMeter(startCoords, endCoords) {
    const earthRadius = 6371 * 1000; // Earth radius in meters

    const lat1 = startCoords.lat * (Math.PI / 180);
    const lng1 = startCoords.lng * (Math.PI / 180);
    const lat2 = endCoords.lat * (Math.PI / 180);
    const lng2 = endCoords.lng * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
}

export function getRandomPoints(centerLat, centerLng, radius, numPoints) {
    const points = [];
    const earthRadius = 6371; // Radius der Erde in km

    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.sqrt(Math.random()) * radius;

        const offsetLat = distance * Math.cos(angle) / earthRadius * (180 / Math.PI);
        const offsetLng = distance * Math.sin(angle) / (earthRadius * Math.cos(centerLat * Math.PI / 180)) * (180 / Math.PI);

        const pointLat = centerLat + offsetLat;
        const pointLng = centerLng + offsetLng;

        points.push({ lat: pointLat, lng: pointLng });
    }

    return points;
}

export function getHomogeneousPoints(centerLat, centerLng, radius, numPoints) {
    const points = [];
    const earthRadius = 6371; // Radius of the Earth in km

    // Calculate angle increment and distance increment
    const angleIncrement = (2 * Math.PI) / numPoints;
    const distance = radius; // All points will be at the same distance from the center

    for (let i = 0; i < numPoints; i++) {
        // Calculate the angle for the current point
        const angle = i * angleIncrement;

        // Calculate the offset in latitude and longitude
        const offsetLat = distance * Math.cos(angle) / earthRadius * (180 / Math.PI);
        const offsetLng = distance * Math.sin(angle) / (earthRadius * Math.cos(centerLat * Math.PI / 180)) * (180 / Math.PI);

        // Calculate the position of the point
        const pointLat = centerLat + offsetLat;
        const pointLng = centerLng + offsetLng;

        points.push({ lat: pointLat, lng: pointLng });
    }

    return points;
}


async function getTravelTime(originLat, originLng, destinationLat, destinationLng, accessToken) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/transit/${originLng},${originLat};${destinationLng},${destinationLat}?access_token=${accessToken}&geometries=geojson`;

    try {
        const response = await fetch(url);

        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();

        console.log("jsonRes", jsonResponse);

        if (jsonResponse.routes && jsonResponse.routes.length > 0) {
            const travelTime = jsonResponse.routes[0].duration / 60; // in Minuten
            return travelTime;
        } else {
            console.warn("Die Antwort enthält keine erwarteten Routen.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching travel time:", error);
        return null;
    }
}

async function main() {
    const wienerHauptbahnhofLat = 48.1852;
    const wienerHauptbahnhofLng = 16.3766;
    const radius = 30; // Radius in km
    const numPoints = 10; // Anzahl der Punkte (auf 10 gesetzt, um die API-Nutzung zu minimieren)

    const points = getRandomPoints(wienerHauptbahnhofLat, wienerHauptbahnhofLng, radius, numPoints);

    console.log(points);

    const accessToken = accessTokenObject.token; // Hier dein Mapbox Access Token eingeben

    for (const point of points) {
        const travelTime = await getTravelTime(point.lat, point.lng, wienerHauptbahnhofLat, wienerHauptbahnhofLng, accessToken);
        console.log(`Reisezeit von Punkt (${point.lat}, ${point.lng}) zum Wiener Hauptbahnhof: ${travelTime} Minuten`);
    }

    async function checkTransitAvailability(originLat, originLng, destinationLat, destinationLng, accessToken) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/transit/${originLng},${originLat};${destinationLng},${destinationLat}?access_token=${accessToken}&geometries=geojson`;
    
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const jsonResponse = await response.json();
    
            if (jsonResponse.routes && jsonResponse.routes.length > 0) {
                const travelTime = jsonResponse.routes[0].duration / 60; // in Minuten
                console.log(`Reisezeit: ${travelTime} Minuten`);
            } else {
                console.log("Keine Transitrouten verfügbar für diese Strecke.");
            }
        } catch (error) {
            console.error("Fehler bei der Abfrage der Transitverfügbarkeit:", error);
        }
    }    
}



async function checkTransitAvailability(originLat, originLng, destinationLat, destinationLng, accessToken) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/transit/${originLng},${originLat};${destinationLng},${destinationLat}?access_token=${accessToken}&geometries=geojson`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();

        if (jsonResponse.routes && jsonResponse.routes.length > 0) {
            const travelTime = jsonResponse.routes[0].duration / 60; // in Minuten
            console.log(`Reisezeit: ${travelTime} Minuten`);
        } else {
            console.log("Keine Transitrouten verfügbar für diese Strecke.");
        }
    } catch (error) {
        console.error("Fehler bei der Abfrage der Transitverfügbarkeit:", error);
    }
}


