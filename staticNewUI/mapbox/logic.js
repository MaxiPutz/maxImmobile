import { mapId } from "./staticNames.js";
import { mapboxglAccessToken } from "../private/token.js"
import { willhabenJson } from "./inputParser/inputWrapper.js";
import { CardComponent } from "../components/bottom/cardComponent/CardComponent.js";
import { css, html, render } from "lit";
import { closeIcon } from "../components/leftMenu/favoritList/closeSvg.js";


const mousePosition = {
    x: 0,
    y: 0
}

document.addEventListener("click", (e) => {
    console.log("clickLissener", e);
    mousePosition.x = e.x
    mousePosition.y = e.y

    

})

export function logic(map) {


    map.on('click', mapId.willhaben.layer, (e) => {
        const url = e.features[0].properties.url;


        const card = willhabenJson.find(ele => ele.url === url)


        setTimeout(() => {


            const style = css`
            .card-popup {
                position: absolute;
                left: ${mousePosition.x}px;  
                top: ${mousePosition.y }px; 
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            `
            const styleTag = html`
            <style>
                ${style}
            </style>
            `
            const cardPopUp = html`
            ${styleTag}
            <div class="card-popup">
                <button @click=${
                    ()=> {
                        render(html``, document.body)
                    }
                }>${closeIcon}</button>
                ${new CardComponent(card)}
            </div>
            `

            render(cardPopUp, document.body)

        }, 100)
        //window.open(url, '_blank');
    });

    map.on('mouseenter', mapId.willhaben.layer, () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', mapId.willhaben.layer, () => {
        map.getCanvas().style.cursor = '';
    });
}

export function getIsochrone(map, lng, lat, minutes, profile) {
    const url = `https://api.mapbox.com/isochrone/v1/mapbox/${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxglAccessToken}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            if (map.getSource('isochrone')) {
                map.getSource('isochrone').setData(data);
            } else {
                map.addSource('isochrone', {
                    'type': 'geojson',
                    'data': data
                });
                map.addLayer({
                    'id': 'isochrone-layer',
                    'type': 'fill',
                    'source': 'isochrone',
                    'layout': {},
                    'paint': {
                        'fill-color': '#5a3fc0',
                        'fill-opacity': 0.3
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching isochrone data:', error);
        });
}