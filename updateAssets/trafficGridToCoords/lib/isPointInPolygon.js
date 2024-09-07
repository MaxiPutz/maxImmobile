import axios from 'axios';
import * as turf from '@turf/turf';
import cities from "./willhabenVillage.js"

// Function to fetch the polygon data from the URL
export async function fetchAreaPolygon(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return data.features[0].geometry;  // Assuming the polygon is in the first feature
    } catch (error) {
        console.error("Error fetching area polygon:", error);
        throw error;
    }
}

// Function to check if the city's coordinates are within the polygon
export function isCityInArea(cityCoords, polygon) {
    const point = turf.point(cityCoords);
    const area = turf.polygon(polygon.coordinates);
    return turf.booleanPointInPolygon(point, area);
}

// Example cities with their coordinates [longitude, latitude]
// NOTE: These are example coordinates. Replace them with the actual coordinates of each village.



// Fetch the polygon from the URL and check each city
/*
(async () => {
    const url = "https://api.mapbox.com/isochrone/v1/mapbox/driving-traffic/16.355084%2C48.227157?contours_minutes=60&polygons=true&denoise=0.6&generalize=308&access_token=pk.eyJ1IjoibWF4aXB1dHoiLCJhIjoiY2p0eXoyNHBvMjVobzRlbXB0aHBscTd6NCJ9.498DhQ66cjxrx1hmPBYkag";
    const polygon = await fetchAreaPolygon(url);



    for (const ele of cities) {
        const coords = ele.coords
        const city = ele.name
        if (isCityInArea(coords, polygon)) {
            console.log(`${city} is within the area.`);
        } else {
            console.log(`${city} is not within the area.`);
        }
    }

    let filteredCities = cities.filter(ele => isCityInArea(ele.coords, polygon)).filter(ele => !ele.name.includes("Wien,") )

    console.log(filteredCities);
    

})();*/
