import {getFavoritIdMap, pushToLocalStorageFavoritList} from "./components/bottom/cardComponent/CardComponent.js"
import { willhabenJson } from "./mapbox/inputParser/inputWrapper.js";
import {} from "./components/bottom/cardComponent/CardComponent.js"

function getShortFavIds () {
    const favMap =  getFavoritIdMap()

    console.log("favMap", favMap);

    const favList = Object.keys(favMap)
    console.log("favMap", favList);

    const shortIdList = favList.map( ele => {

        if (ele.includes("willhaben.at")) {
            const len = ele.split("-").length
            return ele.split("-")[len-1].replace("/", "")
        } else if (ele.includes("immobilienscout24.at")) {
            const len = ele.split("/").length

            return  ele.split("/")[len-1].replace("/", "")
        }
        return false
    }).filter(ele => ele)

    console.log("favMap", shortIdList);

    return shortIdList
}

/**
 * @param {string[]} shortIdList 
 * @returns {import("./mapbox/inputParser/inputWrapper.js").WillhabenJson []}
 */
function collectWillhabenJSONFromShortId(shortIdList) {
    const cardList = willhabenJson
    console.log("favMap",willhabenJson);
    
    const collectedWillhabenList = shortIdList.map(ele => ({
        ...cardList.find(e => e.url.includes(ele)),
        shortId: ele
    }))
    .map(ele => ({
        ...ele,
        id: ele.url,
    })).filter(ele => ele.id)

    return collectedWillhabenList
}




/**
 * Generates a URL with short IDs appended to the current page URL as query parameters
 * 
 * @returns {string} - The generated URL with IDs
 */
export function generateUrlWithIds() {
    const ids = getShortFavIds()
    const currentUrl = window.location.origin + window.location.pathname;

    const separator = ';';
    const idString = ids.join(separator);

    const url = `${currentUrl}?ids=${encodeURIComponent(idString)}`;

    return url;
}


const generatedUrl = generateUrlWithIds(getShortFavIds());

console.log("favMap", generatedUrl);


/**
 * Extracts the IDs from the URL query parameter 'ids'
 * 
 * @returns {string[]} - An array of the short IDs
 */
function extractIdsFromUrl() {
 // Get the query string from the current page's URL
 const urlParams = new URLSearchParams(window.location.search);
    
 // Get the 'ids' parameter from the query string
 const idsString = urlParams.get('ids');
 
 // Check if 'ids' exists in the URL
 let idsArray = [];
 if (idsString) {
     // Split the string by semicolons to get an array of IDs
     idsArray = idsString.split(';');
 }
 
 // Remove the query string from the URL, leaving only the host and pathname
 const currentUrlBase = window.location.origin + window.location.pathname;
 
 // Use history.replaceState to modify the URL without reloading the page
 window.history.replaceState({}, document.title, currentUrlBase);
 
 // Return the extracted IDs
 return idsArray;
}


function saveURLProperties() {
    const ids = extractIdsFromUrl()
    const favList = collectWillhabenJSONFromShortId(ids)



    favList.forEach(ele => pushToLocalStorageFavoritList(ele))
}

saveURLProperties()