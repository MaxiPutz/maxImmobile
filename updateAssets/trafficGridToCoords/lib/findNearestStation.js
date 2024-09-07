import {client } from "./hafasClient.js"
// Latitude and longitude to search around
const latitude = 48.34636849437491
const longitude = 16.491885636290036

// Function to find the nearest public station
export async function findNearestStation(lat, lng) {
    try {
     
        const nearbyLocations = await client.nearby({
            type: "location",
            latitude: lat, 
            longitude: lng,
        }, {results: 3});
        
        if (nearbyLocations && nearbyLocations.length > 0) {
            console.log('Nearest public stations:');
            const promises = []
            nearbyLocations.forEach((location, index) => {
                promises.push(new Promise((res) => {
                    console.log(location.id)
                    console.log(location.ids)
    
                    console.log(`${index + 1}: ${location.name} (Distance: ${location.distance} meters)`);

                    res({
                        isValid: true,
                        name: location.name,
                        id: location.id,
                        lat: lat,
                        long: lng,
                        apiCoords: {
                            lat: location.latitude,
                            long: location.longitude,
                        },
                        dist: location.distance,
                        location,
                        
                    })
                }))
            });
            
            const result = await Promise.all(promises)

            return result
        } else {
            console.log('No nearby stations found.');
            return {
                isValid: false,
                name: undefined,
                id: undefined,
                lat: undefined,
                long: undefined,
                dist: undefined,
                location: undefined
            }
        }
    } catch (error) {
        console.error('Error finding nearby stations:', error);
        return {
            isValid: false,
            name: undefined,
            id: undefined,
            lat: undefined,
            long: undefined,
            dist: undefined,
            location: undefined
        }
    }
}

// Example usage
(async () => {
    await findNearestStation(latitude, longitude);
})();
