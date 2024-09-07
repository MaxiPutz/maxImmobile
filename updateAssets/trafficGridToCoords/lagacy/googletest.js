async function getGooglePublicTransportationDirections(origin, destination, apiKey) {
    /**
     * Fetches the latest public transportation directions between an origin and a destination using Google Maps Directions API.
     *
     * @param {string} origin - The starting location as a string (e.g., "40.7128,-74.0060" or "New York, NY").
     * @param {string} destination - The destination location as a string (e.g., "34.0522,-118.2437" or "Los Angeles, CA").
     * @param {string} apiKey - Your Google Maps API key.
     *
     * @returns {Object} - The JSON response from the Google Maps Directions API containing route information.
     */
    
    // Construct the API URL
    const url = `https://maps.googleapis.com/maps/api/directions/json`;

    // Define the parameters
    const params = new URLSearchParams({
        origin: origin,
        destination: destination,
        mode: 'transit', // Set the mode to public transportation
        key: apiKey,
        alternatives: 'true',
        language: 'en',
        transit_mode: 'bus,subway,train,tram', // Specify the modes of public transportation
        units: 'metric' // Use metric units
    });

    // Make the request to the Google Maps Directions API
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
const origin = "40.7128,-74.0060"; // New York City (latitude, longitude)
const destination = "34.0522,-118.2437"; // Los Angeles (latitude, longitude)
const apiKey = "your_google_maps_api_key";

getGooglePublicTransportationDirections(origin, destination, apiKey)
    .then(directions => {
        console.log(directions);
    })
    .catch(error => {
        console.error("Error fetching directions:", error);
    });
