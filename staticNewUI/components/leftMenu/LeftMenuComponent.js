import { html, LitElement, css } from "lit";
import { transitOptions } from "../../assets/transit/index.js";
import { setSelectTransitIndex } from "../../mapbox/inputParser/inputWrapper.js";
import { reloadTransitLayer, reloadTransitSquareLayer } from "../../mapbox/layer/transitLayer.js";
import { mapId } from "../../mapbox/staticNames.js";
import { map } from "../../mapbox/mapboxComponent.js";
import {leftMenuStyle, dropDownStyle} from "./style.js"
import { dropdownComponent } from "./dropDownTemplate.js";
import { globaHostStyle } from "../globalStyle.js";

let minPrice = -1;
let maxPrice = 999999999;
let minM2 = -1;
let maxM2 = 999999;

let selectedIndex = 0

/**
 * @param {import("../bottom/BottomComponent").filterParam} filterParam
 */
let dispatchFilter = (filterParam) => undefined

export const setDispatchFilter = (injectDisptachFilter) => {
    dispatchFilter = injectDisptachFilter
  }

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

    /**
     * @type {import("./bottom/BottomComponent.js").filterParam}
     */
    const obj = {
      minPrice : minPrice === "" ? 0 : parseFloat(minPrice),
      maxPrice : maxPrice === "" ? 10000 : parseFloat(maxPrice),
      minM2 : minM2 === "" ? 0 : parseFloat(minM2),
      maxM2: maxM2 === ""? 100000 : parseFloat(maxM2)
    }

    dispatchFilter(obj)
  };




class LeftMenuComponent extends LitElement {
  
    static styles = [leftMenuStyle, dropDownStyle, globaHostStyle ]

    constructor () {
      super()

    }


    headerComponent()  {
      return html`
      <div>
              <div>
              ${dropdownComponent(transitOptions, selectedIndex, (num)=> {
                selectedIndex = num
                setSelectTransitIndex( num)
                reloadTransitSquareLayer(map, mapId.transitSquareMap)
                reloadTransitLayer(map, mapId.transitText)
                this.requestUpdate()
              })}
                  </label>
              </div>
          </div>`
  }

    render () {
        return html`
        <div class="container">
          ${this.headerComponent()}
          ${menuComponent()}
        </div>
        `
    }
}

customElements.define("left-menu-component", LeftMenuComponent)

function menuComponent()   {
    return html`
      <div>
          <div>

              ${filterInput("Min Price:", "min-price")}
              ${filterInput("Max Price", "max-price")}

          </div>
  
          <div style="margin-top: 10px;">
              ${filterInput("Min mm²", "min-m2" )}
              ${filterInput("Max mm²", "max-m2" )}
          </div>
      </div>
    `;
  };

  /**
   * @param {string} label
   * @param {string} id
   * @returns 
   */
function filterInput(label, id) {

  return html`
  <div class="input-container">
    <input placeholder="${label}" class="input-field" type="text" id=${id} @input=${onInputChange}>
    <label for="input-field" class="input-label">${label}</label>
    <span class="input-highlight"></span>
  </div>
`
}




function dorpDown () {
  return html`
  
<div class="select">
  <div
    class="selected"
    data-default="All"
    data-one="option-1"
    data-two="option-2"
    data-three="option-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
  <div class="options">

  ${transitOptions.map((ele, i ) => html`
    <div title="${ele}">
      <input id="${ele}" name="option" type="radio"  />
      <label class="option" for="option-${i}" data-txt="${ele}"></label>
    </div>
      
      `)}
  </div>
</div>

  `
}