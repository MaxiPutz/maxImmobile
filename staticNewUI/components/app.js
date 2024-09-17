import {getViewCoords, isViewCoordsReady} from "../mapbox/viewInfos/viewInfos.js"
import {html, render, css } from "lit"

import {applyCheckBoxFilter} from "../components/teaserFilterMenu.js"
import { setWillhabenFilter, willhabenJson } from "../mapbox/inputParser/inputWrapper.js";
//import {map} from "../mapbox/mapbox.js"
import {map} from "../mapbox/mapboxComponent.js"
import { mapId } from '../mapbox/staticNames.js';
import {reloadWillhabenLayer} from "../mapbox/layer/willhabenLayer.js"

const scrollableContainerStyles = `
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
`;

const itemStyles = `
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
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

    console.log(maxPrice);
    
    let filtered = willhabenJson
    .filter(ele => ele.price !== "not found")
    .filter(ele => ele.price >  parseFloat(minPrice)  &&  parseFloat(ele.price) < maxPrice)
    .filter(ele => ele.squareMeters > minM2  && ele.squareMeters < maxM2)
    .filter(ele => {
      
      if (!isReady) {
        return true
      }
      
      

      return  ele.coords.lat > boundary.bottomLeft.lat && 
      ele.coords.lat < boundary.topRight.lat &&
      ele.coords.lng > boundary.bottomLeft.lng &&
      ele.coords.lng < boundary.topRight.lng
      
    })

    filtered = applyCheckBoxFilter(filtered)


    setWillhabenFilter(filtered)

    if ( map.isWillhabenLayerReady ) {
      reloadWillhabenLayer(map, mapId.willhaben)
    }
    
    

    const divs = filtered.map(ele => {
    return html`
    <div style=${scrollableContainerStyles}>

        <div style=${itemStyles}  @click=${() => {
             const url = ele.url
             window.open(url, '_blank');
        }
        }>
        <div>${ele.squareMeters} m²</div>
        <div>${ele.price} €</div>
        <div>${ele.destination}</div>
        </div>
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

             <div> <label for="min-price">Min Price:</label><input type="text" id="min-price" name="min-price" @input=${onInputChange}> </div>
             <div> <label for="max-price">Max Price:</label><input type="text" id="max-price" name="max-price"  @input=${onInputChange}> </div>
        </div>

        <div style="margin-top: 10px;">
           <div>  <label for="min-m2">Min m²:</label><input type="text" id="min-m2" name="min-m2"  @input=${onInputChange}> </div>
           <div>  <label for="max-m2">Max m²:</label><input type="text" id="max-m2" name="max-m2"  @input=${onInputChange}> </div>
        </div>

        <p>${renderDivs().length} found elemnts</p>
        <div  >
            ${renderDivs()}
        </div>
    </div>
  `;
};


render(renderDivs(), document.querySelector("#list"))
render(menuComponent(), document.querySelector("#app-menu"));


export const customRender = () => {
  render(menuComponent(), document.querySelector("#app-menu"));
  render(renderDivs(), document.querySelector("#list"))

}
