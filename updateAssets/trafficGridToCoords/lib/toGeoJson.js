import { randomUUID } from "crypto";

/**
 * @param {Object} coords
 * @param {Number} coords.lat
 * @param {Number} coords.lng
 * @returns {Object}
 */
export function coordsToGeoJson (coords) {

    return {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [coords.lng, coords.lat]
            },
            "properties": {
            "name": `${randomUUID()}`
            }
      }
}