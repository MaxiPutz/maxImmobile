import accessTokenObject from "./accestoken.js";

async function getPublicTransportationDirections(origin, destination, accessToken) {
    /**
     * Fetches the latest public transportation directions between an origin and a destination using Mapbox Directions API.
     *
     * @param {Array} origin - An array containing the latitude and longitude of the origin [latitude, longitude].
     * @param {Array} destination - An array containing the latitude and longitude of the destination [latitude, longitude].
     * @param {string} accessToken - Your Mapbox API access token.
     *
     * @returns {Object} - The JSON response from the Mapbox Directions API containing route information.
     */
    
    // Construct the API URL
    const url = `https://api.mapbox.com/directions/v5/mapbox/transit/${origin[1]},${origin[0]};${destination[1]},${destination[0]}`;
    
    // Define the parameters
    const params = new URLSearchParams({
        access_token: accessToken,
        geometries: "geojson",
        overview: "full",
        steps: "true",
        alternatives: "true",
        annotations: "duration,distance",
        language: "en",
        overview: "simplified"
    });

    // Make the request to the Mapbox API
    try {
        const response = await fetch(`${url}?${params.toString()}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch directions:", error);
        throw error;
    }
}

// Example usage
const origin = [40.7128, -74.0060]; // New York City (latitude, longitude)
const destination = [34.0522, -118.2437]; // Los Angeles (latitude, longitude)
const accessToken = accessTokenObject.token

getPublicTransportationDirections(origin, destination, accessToken)
    .then(directions => {
        console.log(directions);
    })
    .catch(error => {
        console.error("Error fetching directions:", error);
    });
