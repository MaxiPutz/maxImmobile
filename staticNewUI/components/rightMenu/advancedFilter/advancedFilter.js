import { css, html, LitElement, unsafeCSS } from "lit";
import { styleAdvancedFilter } from "./styleFilter.js";


export class AdvancedFilter extends LitElement {

    static styles = [
        css`
        :host {
            background-color: black;
            height: 100vh;
            width: 100vw;
        }
        `,
        styleAdvancedFilter
    ]

    /**
     * @param {string[]} list
     */
    constructor(list) {
        super()
        this.list = list
        this.title =  this.list[0]
        console.log(this.title);
        
        this.callback = (update) => {
            this.title = update
            this.requestUpdate()
        }
        
    }

    render() {
        console.log("render", this.title);
        
        return html`
        <div>
            ${filterListComponent(this.list, this.title, this.callback)}
            ${filterListComponent(this.list, this.title, this.callback)}

        </div>
        `
    }
}
customElements.define("advanced-filter", AdvancedFilter)


const filterListComponent = (list, title, callback) => {

 
    

    return html`
<div class="select">
  <div
    class="selected"
  >
    ${title}
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
    ${list.map((ele) => html`
         <div title="${ele}">
      <input id="${ele}" name="option" type="radio"  @change=${()=> callback(ele)}/>
      <label class="option" for="${ele}" data-txt="${ele}"></label>
    </div>
            `)}
    
  </div>
</div>

    `
}