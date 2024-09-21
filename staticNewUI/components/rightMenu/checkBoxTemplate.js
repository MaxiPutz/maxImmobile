import { css, html } from "lit"



let debounceTimeout =  () => undefined;

/**
 * @param {string} checkboxLabel 
 * @param {function () boolean } isChecked
 * @param {function (any) } callback 
 * @returns 
 */
export function checkBoxTemplate(checkboxLabel, getIsChecked, callback) {
    const isCheckedNext = getIsChecked()
    console.log("switch should be every time called", isCheckedNext);


    return html`
        <div class="checkbox-container" @click=${(e)=> {
                    console.log("switch",checkboxLabel);
                    console.log("switch ischeckedNext",isCheckedNext);
                    console.log("switch checkbox click", "div");
                    
                    const event = {
                        target: {
                            checked: !isCheckedNext,
                            name: checkboxLabel
                        } 
                    }

                    clearTimeout(debounceTimeout)
                    debounceTimeout = setTimeout(()=> {
                        callback(event)
                    }, 50)

        }}>
            <label class="switch">
            <input .checked=${isCheckedNext} type="checkbox" 
            id=${checkboxLabel} name=${checkboxLabel} 
            @change=${(e)=> {
                    console.log("switch checkbox click", "checkbox", e);
                    return
                    callback(e)
                    
                    }}
            >
            <span class="slider"></span>
            </label>
            <span class="info-text">${checkboxLabel}</span>

        </div>
    `
    

    return html`
         <div class="checkbox-container"  @click=${(e)=> {

                    
                    const isCheckedNext = !getIsChecked()

                    console.log("switch",checkboxLabel);
                    

                    console.log("switch ischeckedNext",isCheckedNext);

                    const event = {
                        target: {
                            checked: isCheckedNext,
                            name: checkboxLabel
                        } 
                    }

                    callback(event)
                    }}>
            <label class="switch" for="${checkboxLabel}" > 
                <input  id="${checkboxLabel}" name="${checkboxLabel}" @change=${(e)=> {
                    console.log("switch click", e);
                    
                    callback(e)
                    }} >
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