import { LitElement, html } from 'lit';
import { floatingActinButtonStyle } from "./style.js"
import { globaHostStyle } from '../../globalStyle.js';
import { euro, sizeIcon, sortDefault } from './svg.js';


/**
 * @typedef Sort
 * @property {boolean} up
 * @property {boolean} down
 * @property {string} sortLable
*/

/**
 * @param {Sort []}sortState
 */
let dispatchSortState = (sortState)=> undefined

/**
 * @param {function (Sort[])}
 */
export function setDispatchSortState(injectDispatchSortState) {
    dispatchSortState = injectDispatchSortState
}

class FloatingActionButton extends LitElement {

    static styles = [floatingActinButtonStyle, globaHostStyle];

    constructor() {
        super();
        this.isChecked = false

        /**
        * @type {Sort[]}
        */
        this.sortObject = [
            {
                sortLable: "euro",
                up: false,
                down: false
            },
            {
                sortLable: "size",
                up: false,
                down: false
            }]
    }

    handleCheckboxChange(e) {
        // Update the `isChecked` property based on the checkbox state
        this.isChecked = !this.isChecked;
        console.log('Checkbox changed:', this.isChecked);



        // Request component update
        this.requestUpdate();
    }


    /**
     * @param {string} label 
     */
    setOtherSortInactive(label) {
        for (let i = 0; i<this.sortObject.length; i++) {
            if (this.sortObject[i].sortLable !== label) {
                this.sortObject[i].up = false
                this.sortObject[i].down = false
            }
        }
    }

        /**
        * @param {string} label 
        */
        setSort(label) {
            for (let i = 0; i<this.sortObject.length; i++) {
                if (this.sortObject[i].sortLable === label) {

                    const isUp = this.sortObject[i].down
                    const isDown = this.sortObject[i].up

                    if(isUp === isDown) {
                        this.sortObject[i] = {
                            sortLable: label,
                            up: false,
                            down: true
                        }
                        console.log("from first aciotn");
                        
                        return
                    }

                    if (isUp) {
                        console.log("from is up");

                        this.sortObject[i] = {
                            sortLable: label,
                            up: true,
                            down: false
                        }
                        return
                    }
                    if (isDown) {
                        console.log("from is down");

                        this.sortObject[i] = {
                            sortLable: label,
                            up: false,
                            down: true
                        }
                        return
                    }
                }
            }
        }

    render() {

        const euroState = this.sortObject.find((ele)=> ele.sortLable === "euro")
        const euroClass = euroState.up ? "sortup" : euroState.down ? "sortdown" : ""

        const sizeState = this.sortObject.find((ele)=> ele.sortLable === "size")
        const sizeClass = sizeState.up ? "sortup" : sizeState.down ? "sortdown" : ""


        return html`
            <div class="fab-container">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    .checked=${this.isChecked} 
                    @change=${() => {

                /*this.handleCheckboxChange*/
            }
            }
                    />
                
                <button class="button-menu" @click=${this.handleCheckboxChange}>${sortDefault}</button>
                <button class="option-a option ${euroClass}" @click=${()=> {
                    const sortLable = "euro"
                    this.setOtherSortInactive(sortLable)
                    this.setSort(sortLable)
                    dispatchSortState(this.sortObject)
                    console.log(this.sortObject);
                    this.requestUpdate()

                }} >${euro}</button>
                <button class="option-b option ${sizeClass}" @click=${()=> {
                    const sortLable = "size"
                    this.setOtherSortInactive(sortLable)
                    this.setSort(sortLable)
                    console.log(this.sortObject);
                    dispatchSortState(this.sortObject)

                    this.requestUpdate()

                    

                }}>${sizeIcon}</button>
            </div>
        `;
    }
}

customElements.define('floating-action-button', FloatingActionButton);
