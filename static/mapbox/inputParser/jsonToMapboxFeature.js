import { generateSquarePolygon } from "../mapFunctions.js";
import { willhabenJson, transitInfoJson, getWillhabenFilterJson, getSelectedTransitInfoJson } from "./inputWrapper.js";


export function getWillhabenFeature() {
    return willhabenJson.map(ele => ({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [ele.coords.longitude, ele.coords.latitude]
        },
        'properties': {
            'title': `${ele.destination}\n${ele.price}\n${ele.teaser.join("\n")}`,
            'url': ele.url,
        }
    }))
}

export function getWillhabenFiltedFeature() {
    return getWillhabenFilterJson().map(ele => ({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [ele.coords.longitude, ele.coords.latitude]
        },
        'properties': {
            'title': `${ele.destination}\n${ele.price}\n${ele.teaser.join("\n")}`,
            'url': ele.url,
        }
    }))
}

export function getTransitInfoFeature() {
    console.log("getTransitInfoFeature",getSelectedTransitInfoJson())
    return getSelectedTransitInfoJson().
    filter(ele => ele.speed < 210 )
    .map((ele) => ({time: ele.time, name: ele.startPoint.id, coords: { long: ele.startPoint.long, lat : ele.startPoint.lat }})) 
    .map(ele => ({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [ele.coords.long, ele.coords.lat]
        },
        'properties': {
            'title': `${ele.time}\n${ele.name}`,
            'time': ele.time
        }
    }))
}

/**
 * @param {number} sideLength
 * 
 * 
 */
export function getTransitInfoSquareFeature(sideLength) {
    console.log(getSelectedTransitInfoJson())
    return getSelectedTransitInfoJson().
    filter(ele => ele.speed < 210 )
    .map((ele) => ({time: ele.time, name: ele.startPoint.id, centerCoords: {time: ele.time, lng: ele.startPoint.long, lat : ele.startPoint.lat }})) 
    .map(ele => generateSquarePolygon(ele.centerCoords, sideLength))
}
