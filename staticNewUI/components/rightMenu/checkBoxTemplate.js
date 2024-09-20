import { html } from "lit"

/**
 * @param {string} checkboxLabel 
 * @param {function (any) } callback 
 * @returns 
 */
export function checkBoxTemplate(checkboxLabel, callback) {
    return html`
         <div class="checkbox-container" >
            <label class="switch" for="${checkboxLabel}"> 
                <input type="checkbox" id="${checkboxLabel}" name="${checkboxLabel}" @change=${(e)=> callback(e)} >
                <span  class="slider"> </span> 
            </label>
            <span class="info-text">${checkboxLabel}</span>
        </div>

    `

}

/*
return teaserList.map(ele => html`
    <div>

      <label class="switch" for="${ele}"> 
        <input type="checkbox" id="${ele}" name="${ele}" @change=${(e)=> setSelectedFilter(e)} >
        <span  class="slider"> </span> 
       </label>
        <span>${ele}</span>
    </div>

    `)*/