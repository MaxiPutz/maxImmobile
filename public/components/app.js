import {getViewCoords, isViewCoordsReady} from "../mapbox/viewInfos/viewInfos.js"
import { html, render,  } from 'https://cdn.zywave.com/lit-html@2.1.1/lit-html.js';
import {styleMap} from "https://cdn.zywave.com/lit-html@2.1.1/directives/style-map.js"

import { setWillhabenFilter, willhabenJson } from "../mapbox/inputParser/inputWrapper.js";
import {map} from "../mapbox/mapbox.js"
import { mapId } from '../mapbox/staticNames.js';
import {reloadWillhabenLayer} from "../mapbox/layer/willhabenLayer.js"

const scrollableContainerStyles = {
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '10px',
  border: '1px solid #ccc',
};

const itemStyles = {
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const onInputChange = (e) => {
    console.log(e);
    
    const { id, value } = e.target;
  
    console.log(value);
    console.log(id);
    
    
    if (id === 'min-price') {
      minPrice = value;
    } else if (id === 'max-price') {
      maxPrice = value;
    } else if (id === 'min-m2') {
      minM2 = value;
    } else if (id === 'max-m2') {
      maxM2 = value;
    }

    renderDivs()
    render(menuComponent(), document.querySelector('#app-menu'));
  };


let minPrice = -1;
let maxPrice = 999999999;
let minM2 = -1;
let maxM2 = 999999;


export const renderDivs = () => {

    const boundary = getViewCoords()
    const isReady = isViewCoordsReady()


    const filtered = willhabenJson
    .filter(ele => ele.price !== "not found")
    .filter(ele => ele.price > minPrice  && ele.price < maxPrice)
    .filter(ele => ele.squareMeters > minM2  && ele.squareMeters < maxM2)
    .filter(ele => {
      
      if (!isReady) {
        return true
      }
      
      console.log(ele.coords.lat > boundary.bottomLeft.lat && 
        ele.coords.lat < boundary.topRight.lat);
      

      return  ele.coords.lat > boundary.bottomLeft.lat && 
      ele.coords.lat < boundary.topRight.lat &&
      ele.coords.lng > boundary.bottomLeft.lng &&
      ele.coords.lng < boundary.topRight.lng
      
    })

    setWillhabenFilter(filtered)

    if ( map.isWillhabenLayerReady ) {
      reloadWillhabenLayer(map, mapId.willhaben)
    }
    
    

    const divs = filtered.map(ele => {
    return html`
        <div style=${styleMap(itemStyles)}  @click=${() => {
             const url = ele.url
             window.open(url, '_blank');
        }
        }>
        <div>${ele.teaser.join(" ")}</div>
        <div>${ele.price}</div>
        <div>${ele.destination}</div>
        </div>
    `;
    });
    console.log(divs);
    return divs
}



const menuComponent = () => {
  return html`
    <div>
        <div>
            <label for="min-price">Min Price:</label>
            <input type="text" id="min-price" name="min-price" @input=${onInputChange}>
            <label for="max-price">Max Price:</label>
            <input type="text" id="max-price" name="max-price"  @input=${onInputChange}>
        </div>

        <div style="margin-top: 10px;">
            <label for="min-m2">Min m²:</label>
            <input type="text" id="min-m2" name="min-m2"  @input=${onInputChange}>
            <label for="max-m2">Max m²:</label>
            <input type="text" id="max-m2" name="max-m2"  @input=${onInputChange}>
        </div>

        <p>${renderDivs().length} found elemnts</p>
        <div style=${styleMap(scrollableContainerStyles)} >
            ${renderDivs()}
        </div>
    </div>
  `;
};


render(menuComponent(), document.querySelector("#app-menu"));


export const customRender = () => {
  render(menuComponent(), document.querySelector("#app-menu"));
}
