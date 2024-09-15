import fs from "fs"
import { getCoordinates } from "./getCoordinates.js";

/**
 * @type {import("../../../static/mapbox/inputParser/inputWrapper").WillhabenJson []}
 */
const json = JSON.parse(fs.readFileSync("./result.json"))


console.log((json));


const postcodesObj = json.reduce((prev, cur) => {
    if (prev[cur.postcode] || cur.postcode === undefined) {
        return prev
    }
    return {
        ...prev,
        [cur.postcode]: true
    }

}, {})
const postcodes = Object.keys(postcodesObj)

fs.writeFileSync("postsCodes.json", JSON.stringify(postcodes, undefined, 4))
console.log(postcodes);



// Function to get coordinates for an array of postcodes
async function getCoordinatesForPostcodes(postcodes) {
    const coordinates = {};


    // Process all postcodes
    for (const postcode of postcodes) {
        const coords = await getCoordinates(postcode + ", AUT")

        if (coords) {
            coordinates[postcode] = coords;
            console.log(postcode)
        }
    }

    return coordinates;
}

const res = await getCoordinatesForPostcodes(postcodes)

fs.writeFileSync("postsCodesMap.json", JSON.stringify(res, undefined, 4))