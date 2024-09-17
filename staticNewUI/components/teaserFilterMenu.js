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

let isGenssenschaftFilterEnable = false
let isNotGenssenschaftFilterEnable = false
let isImmoScoutAnd = false

const setNotGenossenschaftFilter = e => {
    isNotGenssenschaftFilterEnable = e.target.checked

    customRender()
}

const setGenossenschaftFilter = e => {
    isGenssenschaftFilterEnable = e.target.checked

    customRender()
}

const setImmoScourtFilter = e => {
    isImmoScoutAnd = e.target.checked
    console.log(isImmoScoutAnd);
    customRender()
    
}

const generateTeaserCheckBox = () => {

    return teaserList.map(ele => html`
        <input type="checkbox" id="${ele}" name="${ele}" @change=${(e)=> setSelectedFilter(e)} >
        <label for="${ele}"> ${ele}</label>
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
        this.isVisible = true; // Hidden by default
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
                <div>
                    ${generateTeaserCheckBox()}
                </div>
                <div>
                    <input type="checkbox" id="genossenshaft" name="genossenshaft" @change=${(e)=> setGenossenschaftFilter(e)} >
                    <label for="genossenshaft"> genossenshaft</label>
                </div>
                <div>
                    <input type="checkbox" id="notgenossenshaft" name="notgenossenshaft" @change=${(e)=> setNotGenossenschaftFilter(e)} >
                    <label for="notgenossenshaft"> notgenossenshaft</label>
                </div>
                <div>
                    <input type="checkbox" id="immoScout" name="immoScout" @change=${(e)=> setImmoScourtFilter(e)} >
                    <label for="immoScout"> immoScout</label>
                </div>
            </div>
          
        </div>`
    }
}

customElements.define('check-box-area', CheckBoxArea);

/**
 * @param {import("../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
 */
export const applyCheckBoxFilter  = (obj) => {

    if (isImmoScoutAnd) {

        const t = obj.filter(ele1 => ele1.teaser.some(ele => ele === ("ImmoScout")) )
        console.log("t", t.length);
        obj = t
        //obj = obj.filter(ele1 => ele1.teaser.join(" ").includes("ImmoScout"))
    }

    if (isGenssenschaftFilterEnable || isNotGenssenschaftFilterEnable ) {
        let tmp = []
        if (isGenssenschaftFilterEnable) {
            tmp.push(... obj.filter(ele => ele.isGenossenschaft) )
        }
        if (isNotGenssenschaftFilterEnable) {
            tmp.push(...obj.filter(ele => !ele.isGenossenschaft) )
        }

        obj = tmp
    }


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
