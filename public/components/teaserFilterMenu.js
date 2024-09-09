import { html, css, render, LitElement } from "lit"
import { getWillhabenFilterJson, willhabenJson } from "../mapbox/inputParser/inputWrapper.js"

const teaserOptions = {

}

/**
 * @type {String[]}
 */
let teaserList = willhabenJson.reduce((prev, cur) =>  [...prev, ...cur.teaser], []).filter(ele => !ele.includes("m²"))
.reduce ( (prev, cur) => cur.includes(",") ? [...prev, ...cur.split(",") ] : [...prev, cur], []).map(ele => ele.trim())

teaserList.forEach(ele => teaserOptions[ele] === undefined ? teaserOptions[ele] = true : undefined)

teaserList = []

let selectedFilter = {
    
}

let customRender = () => undefined

export function setCustomRenderForTeaserFilterMenu(render) {
    customRender = render
} 


Object.keys(teaserOptions).forEach(ele => {
    console.log(ele, "teaser")
    teaserList.push(ele)
    selectedFilter[ele] = false
})

teaserList = teaserList.sort()

const setSelectedFilter = (event) => {
    console.log(event)
    const isChecked = event.target.checked
    const val = event.target.name

    console.log(isChecked);
    console.log(val);
    
    selectedFilter[val] = isChecked
    customRender()
}

const generateTeaserCheckBox = () => {

    return teaserList.map(ele => html`
        <label for="${ele}"> ${ele}</label>
        <input type="checkbox" id="${ele}" name="${ele}" @change=${(e)=> setSelectedFilter(e)} >
    `)
}

let filterOption = "OR"

class CheckBoxArea extends LitElement {
    // position: fixed; top: 10px; left: 10px; z-index: 9999; background: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px;
    static styles = css`
        .hidden {
        display: none;
        }

        .visible {
        position: absolut;
        top: 10px;
        right: 10px;
        background: white;
        padding: 10px;
        border: 1px solid #ccc;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
    `;

    static properties = {
        isVisible: { type: Boolean }
    };

    constructor() {
        super();
        this.isVisible = false; // Hidden by default
        this.selectedFilter = 'OR'; 
        filterOption = this.selectedFilter
    }

    toggleVisibility(e) {
        this.isVisible = !e.target.checked; // Toggle based on checkbox
    }


    handleFilterChange(e) {
        this.selectedFilter = e.target.value;
        console.log(`Selected filter: ${this.selectedFilter}`);
        filterOption = this.selectedFilter
        customRender()
    }

    render() {
        return html`
        <div>
            <div style="background: rgba(255, 255, 255, 0.8); border-radius: 5px; padding: 10px; text-align: right;">
                <label for="hidecheckBoxArea">hide check box</label>
                <input checked type="checkbox" id="hideArea" name="hideArea" @change="${this.toggleVisibility}">
            </div>
           
            <div class="${this.isVisible ? 'visible' : 'hidden'}">
                <div class="radio-group">
                    <label>
                        <input type="radio" name="filter" value="AND" @change="${this.handleFilterChange}" ?checked="${this.selectedFilter === 'AND'}">
                        AND
                    </label>
                    <label>
                        <input type="radio" name="filter" value="OR" @change="${this.handleFilterChange}" ?checked="${this.selectedFilter === 'OR'}">
                        OR
                    </label>
                </div>
                ${generateTeaserCheckBox()}
            </div>
          
        </div>`
    }
}

customElements.define('check-box-area', CheckBoxArea);

/**
 * @param {import("../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
 */
export const applyCheckBoxFilter  = (obj) => {
    return filterOption === "OR" ?  orFilter(obj) : andFilter(obj)
}

/**
 * @param {import("../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
 */
function andFilter(obj) {
    const filterList = Object.entries(selectedFilter).filter(([key, val]) => val).map(([key, val]) => key)
    console.log(filterList);

    for (const selected of filterList) {
        obj = obj.filter(ele => ele.teaser.join(" ").includes(selected) )

        console.log("filter list length", obj.length);
        
    }
    
    return obj
}

/**
 * @param {import("../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
 */
function orFilter(obj) {
    const filterList = Object.entries(selectedFilter).filter(([key, val]) => val).map(([key, val]) => key)
    console.log(filterList);

    if (filterList.length === 0) {
        return obj
    }

    let result = []
    for (const selected of filterList) {
        result.push(...obj.filter(ele => ele.teaser.join(" ").includes(selected) ))

        console.log("filter list length", obj.length);
        
    }
    
    return result
}
