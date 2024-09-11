import {token} from "../../../static/private/token.js"

export const getCoordinates = async (villageString) => {
    const query = encodeURIComponent(`${villageString}`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
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
      return null;
    }
  };
  
  export const isInEurope = (coords) => {
    const latMin = 34.5;
    const latMax = 71.2;
    const lngMin = -31.3;
    const lngMax = 39.5;
  
    return coords.lat >= latMin && coords.lat <= latMax && coords.lng >= lngMin && coords.lng <= lngMax;
  };