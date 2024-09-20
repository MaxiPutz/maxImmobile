import { html, LitElement } from "lit"
import { getViewCoords, isViewCoordsReady } from "../../mapbox/viewInfos/viewInfos.js"
import { applyCheckBoxFilter } from "../rightMenu/teaserFilterMenu.js"
import { setWillhabenFilter, willhabenJson } from "../../mapbox/inputParser/inputWrapper.js"
import { reloadWillhabenLayer } from "../../mapbox/layer/willhabenLayer.js"
import { dispatchSlotSize, map } from "../../mapbox/mapboxComponent.js"
import {  getCardStyle, listStyles } from "./styles.js"
import { mapId } from "../../mapbox/staticNames.js"
import { cardtemplateComponent } from "./cardTemplate.js"
import { globaHostStyle } from "../globalStyle.js"

/**
 * @typedef {Object} filterParam
 * @property {Number} minPrice
 * @property {Number} maxPrice
 * @property {Number} minM2
 * @property {Number} maxM2
 */





/**
 * @param {boolean} event
 */
export let dispatchIsButtomListOpen = (event) => undefined

/**
 * @param {filterParam} filterParam
 */
export let dispatchFilterParam = (filterParam) => undefined

/**
 * @param {import("../../mapbox/viewInfos/viewInfos.js").Boundary} boundary
 *
 */
export let dispatchBoundaryParam = (boundary) => undefined

export let reloadBottomList = () => undefined



class BottomComponent extends LitElement {

    static styles = [listStyles, getCardStyle(), globaHostStyle]

    constructor () {
        super()

 
        const initBoundary = getViewCoords()
        /**
         * @type {filterParam & import("../../mapbox/viewInfos/viewInfos.js").Boundary}
         */
        this.filterVal = {
            minPrice : -1,
            maxPrice : 999999999,
            minM2 : -1,
            maxM2 : 999999,
            ...initBoundary
        }
    
        this.isBottomListOpen = false
        
        reloadBottomList  = () => {
            dispatchFilterParam(this.filterVal)
        }



        dispatchIsButtomListOpen = (event) => {
            console.log("from bottom component", event);
            this.isBottomListOpen = event
            if (event) {
                this.shadowRoot.querySelector("#list").classList.remove("close")
                this.shadowRoot.querySelector("#list").classList.add("open")

            } else {
                this.shadowRoot.querySelector("#list").classList.remove("open")
                this.shadowRoot.querySelector("#list").classList.add("close")

            }
            this.requestUpdate()
        }

        /**
         * @type {filterParam}
         */
        dispatchFilterParam = (filterParam) => {
            console.log("filterParam", filterParam);
            
            this.filterVal = {
                ...this.filterVal,
                ...filterParam
            }            
            this.requestUpdate()
        }

        dispatchBoundaryParam = (boundary) => {
            console.log("dispatched Boundary", boundary);
            
            if (!this.isBottomListOpen) {
                this.filterVal = {
                    ...this.filterVal,
                    ...boundary
                }
            }
    

            console.log("dispatched filters", this.filterVal);
            
            this.requestUpdate()
        }

    


    }

    render() {

        console.log("this.filterVal",this.filterVal);
        
        return html`
        <div id="list" class="close">
            ${renderDivs(this.filterVal)}
        </div>
        `
    }
}
customElements.define("bottom-commponent", BottomComponent)



/**
 * 
 * @param {filterParam & import("../../mapbox/viewInfos/viewInfos.js").Boundary} filterParam 
 * @returns 
 */
function renderDivs (filterParam) {
    const minPrice = filterParam.minPrice
    const minM2 = filterParam.minM2
    const maxM2 = filterParam.maxM2
    const maxPrice = filterParam.maxPrice 

    
    

    const boundary = filterParam
    const isReady = isViewCoordsReady()

    
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
    
    
    /*
    const divs = filtered.map(ele => {
    return html`
    <div >

        <div  @click=${() => {
             const url = ele.url
             window.open(url, '_blank');
        }
        }>
        <div class="ellipsis" >${ele.squareMeters} m²</div>
        <div class="ellipsis" >${ele.price} €</div>
        <div class="ellipsis" >${ele.destination}</div>
        </div>
    </div>
      
    `;
    }).slice(0, 100);
    console.log(divs);
    */

    return filtered.map(ele => cardtemplateComponent({
        destination: ele.destination,
        price: ele.price,
        squareMeters: ele.squareMeters
    }, () => window.open(ele.url, "_blank"))).slice(0, 100)

    return html`
      ${divs}
    ` 
}



