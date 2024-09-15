import fs from "fs"


const isDebug = false

const allowedTeaserItems = [
  "1 Zimmer",
  "2 Zimmer",
  "3 Zimmer",
  "4 Zimmer",
  "5 Zimmer",
  "6 Zimmer",
  "7 Zimmer",
  "Balkon",
  "Dachterrasse",
  "Garten",
  "Loggia",
  "Terrasse",
  "Wintergarten"
];



/**
 * @typedef {Object} InputJson
 * @property {string} postcode
 * @property {string} price - The price of the property.
 * @property {string[]} teaser - An array of strings providing a short description of the property.
 * @property {string} destination - The address of the property.
 * @property {string} url - The URL link to the property listing.
 * @property {Object} coords - The geographical coordinates of the property.
 * @property {number} coords.latitude - The latitude of the property location.
 * @property {number} coords.longitude - The longitude of the property location.
 * @property {number} coords.lat - The latitude of the property location (alias).
 * @property {number} coords.lng - The longitude of the property location (alias).
 * @property {boolean} isGenossenschaft
 * @property {number} squareMeters
 */

/**
 * Converts a property JSON object to the InputJson format.
 * @param {Object} property - The property JSON object.
 * @param {Object} postcodeMap - A map of postcodes to coordinates.
 * @returns {InputJson} - The converted InputJson object.
 */
export function convertPropertyToInputJson(property, postcodeMap) {
  // Extract postcode from the address string
  const addressString = property.addressString || "";
  const postcodeMatch = addressString.match(/\b\d{4}\b/);
  const postcode = postcodeMatch ? postcodeMatch[0] : "";

  // Get coordinates from the postcode map
  const coordsFromMap = postcodeMap[postcode] || { latitude: null, longitude: null };

  // Prepare the teaser array
  const teaser = [];
  teaser.push("ImmoScout")
  if (property.headline.includes("Loggia")) {
    teaser.push("Loggia")
  }




  // Initialize squareMeters and other numerical properties
  let squareMeters = null;
  let numberOfRooms = null;

  // Helper function to parse value ranges
  function parseValueRange(valueStr) {
    // Remove any units (e.g., "m²")
    const valueWithoutUnits = valueStr.replace(/[^\d,.–]/g, '');
    // Split by range separator (e.g., "–" or "-")
    const rangeSeparator = /–|-/;
    const parts = valueWithoutUnits.split(rangeSeparator).map(part => part.trim());

    // Convert parts to numbers
    const numbers = parts.map(str => parseFloat(str.replace(',', '.'))).filter(num => !isNaN(num));

    if (numbers.length === 0) {
      return null;
    } else if (numbers.length === 1) {
      return numbers[0];
    } else {
      // Handle ranges by taking the average
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }
  }
  if (Array.isArray(property.badges)) {
    property.badges.forEach((badge) => {
      const teaserCandidate = badge.label
      if (allowedTeaserItems.some(ele => ele.toLowerCase() === teaserCandidate.toLowerCase())) {
        teaser.push(teaserCandidate)

      }
    })
  }

  // Process mainKeyFacts
  if (Array.isArray(property.mainKeyFacts)) {
    property.mainKeyFacts.forEach((fact) => {
      if (fact.value) {
        const roomSize = `${fact.key} ${fact.value}`.toLowerCase()
        if (allowedTeaserItems.some(ele => ele.toLowerCase() === roomSize)) {
          teaser.push(roomSize);
        }


        // Check for square meters
        if (fact.value.includes("m²")) {
          const areaValue = parseValueRange(fact.value);
          if (areaValue !== null) {
            squareMeters = areaValue;
          }
        } else if (fact.label && fact.label.toLowerCase() === "zimmer") {
          // Extract number of rooms
          const roomsValue = parseValueRange(fact.value);
          if (roomsValue !== null) {
            numberOfRooms = roomsValue;
          }
        }
      }
    });
  }

  // If squareMeters is still null, try to use primaryArea
  if (squareMeters === null && property.primaryArea != null) {
    squareMeters = parseFloat(property.primaryArea);
  }

  // Determine isGenossenschaft (e.g., based on badges)
  const isGenossenschaft = property.badges
    ? property.badges.some((badge) => badge.label === "Genossenschaft")
    : false;

  // Construct the InputJson object
  const inputJson = {
    postcode,
    price: property.primaryPrice != null ? property.primaryPrice.toString() : "",
    teaser,
    destination: addressString,
    url: property.links ? property.links.absoluteURL : "",
    coords: {
      latitude: coordsFromMap.latitude,
      longitude: coordsFromMap.longitude,
      lat: coordsFromMap.latitude,
      lng: coordsFromMap.longitude,
    },
    isGenossenschaft,
    squareMeters,
    // Optionally include numberOfRooms
    // numberOfRooms,
  };

  if (parseFloat(inputJson.price) === 0) {
    inputJson.price = property.primaryPriceKeyFact.value.replace("ab ", "").split(" ")[0]


  }

  return inputJson;
}



if (isDebug) {
  const input = JSON.parse(fs.readFileSync("./detailResult.json"))
  const postcodes = JSON.parse(fs.readFileSync("./postcodesMap.json"))

  console.log(input);
  console.log(postcodes);

  const result = input.map(ele => convertPropertyToInputJson(ele, postcodes))
    .filter(ele => ele.price !== "NaN" && ele.price !== undefined && ele.price !== "")
    .filter(ele => ele.squareMeters)
  console.log(result)

  fs.writeFileSync("./result.json", JSON.stringify(result, undefined, 4))

}



