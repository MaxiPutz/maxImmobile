import { setCustomRenderForTeaserFilterMenu } from "./components/teaserFilterMenu.js"
import { map } from "./mapbox/mapbox.js";
import { getIsochrone } from "./mapbox/logic.js";
import { setCustomHeaderRender, setCustomRender, setMarkCoords } from "./mapbox/viewInfos/viewInfos.js";
import {customRender} from "./components/app.js"
import {customHeaderRender} from "./components/header.js"
import {} from "./mapHidingScript.js"
import {} from "./components/guestBook.js"

const defaultLat = 48.2082
const defaultLng = 16.3738

setCustomRender(customRender)
setCustomHeaderRender(customHeaderRender)
setCustomRenderForTeaserFilterMenu(customRender)

let marker = new mapboxgl.Marker({
    draggable: true
})
.setLngLat([defaultLng, defaultLat
])
.addTo(map);

setMarkCoords({lng: defaultLng, lat: defaultLat})

marker.on('dragend', () => {
    const { lng, lat } = marker.getLngLat();
    const minutes = document.getElementById('minutes').value;
    const profile = document.getElementById('profile').value;
    
    setMarkCoords({lat: lat, lng: lng})
    getIsochrone(map, lng, lat, minutes, profile);
});



document.getElementById('getIsochrone').addEventListener('click', () => {
    const minutes = document.getElementById('minutes').value;
    const profile = document.getElementById('profile').value;
    const { lng, lat } = marker.getLngLat();
    getIsochrone(map, lng, lat, minutes, profile);
});

