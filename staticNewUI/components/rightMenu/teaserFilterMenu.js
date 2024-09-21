import { html, css, render, LitElement } from "lit"
import { getWillhabenFilterJson, willhabenJson } from "../../mapbox/inputParser/inputWrapper.js"
import { checkBoxStyle, getCheckBoyStyleByScale, teaserStyle } from "./style.js"
import { checkBoxTemplate } from "./checkBoxTemplate.js"
import { globaHostStyle } from "../globalStyle.js"

/**
 * @typedef {"genossenschaft" | "no genossenschaft" | "immoScout"} StaticFilter
 */



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
let teaserRender = () => undefined

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
    console.log("switch in the filter",val);
    
    selectedFilter[val] = isChecked
    customRender()
    teaserRender()
}

let isGenssenschaftFilterEnable = false
let isNotGenssenschaftFilterEnable = false
let isImmoScoutAnd = false

const setNotGenossenschaftFilter = e => {
    isNotGenssenschaftFilterEnable = e.target.checked

    customRender()
    teaserRender()

}

const setGenossenschaftFilter = e => {
    isGenssenschaftFilterEnable = e.target.checked

    customRender()
    teaserRender()

}

const setImmoScourtFilter = e => {
    isImmoScoutAnd = e.target.checked
    console.log(isImmoScoutAnd);
    console.log("immoScout",e);
    
    customRender()
    teaserRender()
    
}
/**
 * @param {string} label
 * @returns {boolean} 
 */
function getSelectedCheckBox(label) {
    console.log("switch",selectedFilter);
    
    if (selectedFilter[label] !== undefined) {
        console.log("switch found", selectedFilter[label]);
        
        return selectedFilter[label]
    }


    /**
     * @type {StaticFilter}
     */
    const staticFilter = label 


    if (staticFilter === "genossenschaft") {
        return isGenssenschaftFilterEnable
    }

    if (staticFilter === "no genossenschaft") {
        return isNotGenssenschaftFilterEnable
    }
    

    if (staticFilter === "immoScout") {
        return isImmoScoutAnd
    }
    //alert("filter is not implement")

    return false
}

const generateTeaserCheckBox = () => {

    return teaserList.map(ele => checkBoxTemplate(ele, () => getSelectedCheckBox(ele), setSelectedFilter))

}



let filterOption = "OR"

class CheckBoxArea extends LitElement {
    // position: fixed; top: 10px; left: 10px; z-index: 9999; background: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px;
    static styles = [teaserStyle, getCheckBoyStyleByScale(0.5), globaHostStyle]

    static properties = {
        isVisible: { type: Boolean }
    };

    constructor() {
        super();
        this.isVisible = true; // Hidden by default
        this.selectedFilter = 'OR'; 
        filterOption = this.selectedFilter
        teaserRender = () => {
            console.log("switch teaser Render called");
            this.requestUpdate()
            
        }
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
        <div class="container">
           
           
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
                <div class="and-area">

                    <div>
                        <span> And filter Area</span>
                    </div>
                    <div>
                        ${checkBoxTemplate(
                            "genossenschaft",
                             () => getSelectedCheckBox("genossenschaft"), 
                             setGenossenschaftFilter)}
                    </div>
                    <div>
                        ${checkBoxTemplate(
                            "no genossenschaft", 
                            () => getSelectedCheckBox("no genossenschaft"),
                            setNotGenossenschaftFilter)}
                    </div>
                    <div>
                        ${checkBoxTemplate(
                            "immoScout", 
                            () => getSelectedCheckBox("immoScout"),
                            setImmoScourtFilter)}
                    </div>
                </div>
                
            </div>
          
        </div>`
    }
}

customElements.define('check-box-area', CheckBoxArea);

/**
 * @param {import("../../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
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
 * @param {import("../../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
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
 * @param {import("../../mapbox/inputParser/inputWrapper.js").WillhabenJson[]} obj
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
