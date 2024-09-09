import { transitOptions } from "../../assets/transit/index.js"
/**
 * @typedef {Object} WillhabenJson
 * @property {string} price - The price of the property.
 * @property {string[]} teaser - An array of strings providing a short description of the property.
 * @property {string} destination - The address of the property.
 * @property {string} url - The URL link to the property listing.
 * @property {Object} coords - The geographical coordinates of the property.
 * @property {number} coords.latitude - The latitude of the property location.
 * @property {number} coords.longitude - The longitude of the property location.
 * @property {number} coords.lat - The latitude of the property location.
 * @property {number} coords.lng - The longitude of the property location.
 */


/**
 * An array of properties available for rent or sale.
 * @type {WillhabenJson[]}
 */
export const willhabenJson = (await (await fetch("../../assets/input.json")).json()).map(ele =>  {
    const tmp = parseFloat( ele.price.split(" ")[1].split(",")[0])
    const squareMeters = parseFloat( ele.teaser.filter(ele => ele.includes("m²"))[0].split("m²")[0])

    console.log(ele);
    
    console.log(ele.coords);
    
    return ({
    ...ele,
    squareMeters,
    price: tmp,
    coords: {
        ...ele.coords,
        lat: ele.coords.latitude,
        lng: ele.coords.longitude,
    }
})})
console.log(willhabenJson);



/**
 * Represents a journey between two points.
 * @typedef {Object} Journey
 * @property {number} time - The duration of the journey in minutes.
 * @property {Object} startPoint - The starting point of the journey.
 * @property {number} startPoint.lat - The latitude of the starting point.
 * @property {number} startPoint.long - The longitude of the starting point.
 * @property {string} startPoint.name - The name of the starting point.
 * @property {string} startPoint.id - The ID of the starting point.
 * @property {Object} endPoint - The ending point of the journey.
 * @property {number} endPoint.lat - The latitude of the ending point.
 * @property {number} endPoint.lng - The latitude of the ending point.
 * @property {number} endPoint.long - The longitude of the ending point.
 * @property {string} endPoint.name - The name of the ending point.
 * @property {string} endPoint.id - The ID of the ending point.
 * @property {number} endPointDist - The distance to the end point in meters.
 * @property {number} speed - The speed of the journey in km/h.
 * @property {number} distToStation - The distance to the next station in meters.
 */


const transitPath = "../../assets/transit/"
let transitCollector = await Promise.all( transitOptions.map(ele => transitPath + ele).map( ele => fetch(ele) )) 
console.log("transitCollecotr", transitCollector);

transitCollector = await Promise.all(transitCollector.map(ele => ele.json()))

console.log("transitCollecotr", transitCollector);


/**
 * An array of properties available for rent or sale.
 * @type {Journey[]}
 */
export const transitInfoJson = transitCollector.map((ele) => ele.map((ele)=>({
    ...ele,
    startPoint : {
        ...ele.startPoint,
        lng: ele.startPoint.long
    },
    endPoint : {
        ...ele.endPoint,
        lng: ele.endPoint.long
    },
})))



let selectTransitIndex = 0 

export const setSelectTransitIndex = (num) => {
    console.log("selected Index", num);
    
    selectTransitIndex = num
}

export const getSelectedTransitInfoJson = () =>   {
    
    return transitInfoJson[selectTransitIndex]
}

/**
 * An array of properties available for rent or sale.
 * @type {WillhabenJson[]}
 */
let willhabenJsonFiltered = willhabenJson

/**
 * An array of properties available for rent or sale.
 * @param {WillhabenJson[]} arr
 */
export function setWillhabenFilter (arr) {
    willhabenJsonFiltered = arr
    console.log("willhabenJsonFilterd", willhabenJsonFiltered);
    //customRender()
    
}

export function getWillhabenFilterJson() {
    console.log("this is witten", willhabenJsonFiltered);
    
    return willhabenJsonFiltered
}

