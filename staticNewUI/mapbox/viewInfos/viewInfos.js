import { map } from "../mapboxComponent.js";
//import { map } from "../mapbox.js";


/**
 * @typedef {Object} Coords
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} Boundary
 * @property {Coords} bottomLeft
 * @property {Coords} topLeft 
 * @property {Coords} bottomRight 
 * @property {Coords} topRight 
 *  
 */

let customHeaderRender = undefined

/**
 * 
 * @param {Boundary} boundary 
 * @returns 
 */
let dispatchBoundaryParam = (boundary) => undefined

/**
 * 
 * @param {function (Boundary) } injectDisptachBoundaryParam 
 */
export function setDispatchBoundaryParam(injectDisptachBoundaryParam)  {
    dispatchBoundaryParam = injectDisptachBoundaryParam
}

export const setCustomHeaderRender = (render) => {
    customHeaderRender=  render
}

export const getCustomHeaderRender = () => {
    return customHeaderRender
}


let customRender = undefined

export const setCustomRender = (render) => {
    customRender=  render
}

export const getCustomRender = () => {
    return customRender
}

export let viewCoords = {
    bottomLeft: {
        lat: Infinity,
        lng: Infinity
    },
    topLeft: {
        lat: Infinity,
        lng: Infinity
    },    
    bottomRight: {
        lat: Infinity,
        lng: Infinity
    },
    topRight: {
        lat: Infinity,
        lng: Infinity
    },
}



let markCoords = {
    lat: Infinity,
    lng: Infinity
}

/**
 * @param {Object} coords 
 * @param {number} coords.lat
 * @param {number} coords.lng
 */
export function setMarkCoords(coords) {
    markCoords = {
        lat: coords.lat,
        lng: coords.lng
    }
    customHeaderRender()
}

export function getMarkCoords() {
    return markCoords
}

export const  setViewCoords = () =>  {
    const getBounds = map.getBounds()

    const bounds = map.getBounds();

    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const northWest = bounds.getNorthWest();
    const southEast = bounds.getSouthEast();

    
    viewCoords = {
        bottomLeft: {
            lat: southWest.lat,
            lng: southWest.lng
        },
        topLeft: {
            lat: northWest.lat,
            lng: northWest.lng
        },    
        bottomRight: {
            lat: southEast.lat,
            lng: southEast.lng
        },
        topRight: {
            lat: northEast.lat,
            lng: northEast.lng
        },
    }
    console.log("souchwest", viewCoords)


    dispatchBoundaryParam(viewCoords)
    if (customRender !== undefined) {
        customRender()
    }
}

export const  getViewCoords = () => {
    
    return viewCoords
}

export const isViewCoordsReady = () => {
    return viewCoords.bottomLeft.lat !== Infinity
}