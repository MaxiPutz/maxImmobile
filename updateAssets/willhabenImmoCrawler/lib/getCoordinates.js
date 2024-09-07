import {token} from "../private/token.js"

export async function getCoordinates(villageString) {
        
        const query = encodeURIComponent(`${villageString}`);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].center;
                console.log(`Coordinates for ${villageString}: [${coordinates[1]}, ${coordinates[0]}]`);
                return {
                    latitude: coordinates[1],
                    longitude: coordinates[0]
                };
            } else {
                console.log(`No coordinates found for ${villageString}.`);
                return null;
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
}