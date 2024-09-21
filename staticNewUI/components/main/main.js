import { LitElement, css, html } from "lit";
import { getFullScreen } from "./style.js"
import { leftButton } from "./leftButton.js";
import { rightButton } from "./rightButton.js";
import { upDownArrow } from "./svg.js";
import { globaHostStyle } from "../globalStyle.js";
import "./floatingActionButton/floatingActionButton.js"

let i = 0 

let mainHeight = 100
let mainWidth = 100

let dispatchSlotSize = (info) => undefined
let dispatchIsBottomListOpen = (event) => undefined


export function setDispatchSlotSize (injectDispatchSlotSize) {
    dispatchSlotSize = injectDispatchSlotSize
}

export function setDispatchIsBottomListOpen (injectDispatchIsButtomListOpen) {
    dispatchIsBottomListOpen = injectDispatchIsButtomListOpen
}

const bottomStyles = css`
        .bottom {
            margin:20px;
            width: 95%;
        }
        `

class MainView extends LitElement {

    static styles = [
        bottomStyles,
        globaHostStyle
    ]

    static get properties () {
        return {
            isListOpen : {type: Boolean},
            isRightOpen: {type: Boolean},
            isBottomOpen: {type: Boolean}
        }  
    }


    constructor () {

        super()

        const isSmartphone = window.matchMedia("(max-width: 768px)").matches;

        if (isSmartphone) {
            this.isLeftOpen = false;
            this.isRightOpen = false;
            this.isBottomOpen = false;
        } else {
            this.isLeftOpen = true;
            this.isRightOpen = true;
            this.isBottomOpen = false;
        }
    }

    firstUpdated() {

        console.log("main fisr update", this.shadowRoot.querySelector(".c"));
        
        setTimeout(()=> {

            mainHeight =  this.shadowRoot.querySelector(".c").clientHeight
            mainWidth = this.shadowRoot.querySelector(".c").clientWidth
            console.log("waiting is doene");
            
        }, 50000)


        dispatchSlotSize({height: mainHeight, width: mainWidth})
    
        const resizeObserver = new ResizeObserver(()=> {
            mainHeight =  this.shadowRoot.querySelector(".c").clientHeight
            mainWidth = this.shadowRoot.querySelector(".c").clientWidth
            console.log("from resize");
            dispatchSlotSize({height: mainHeight, width: mainWidth})
            
        })

        resizeObserver.observe(this.shadowRoot.querySelector(".c"))

    }



    switchMenu (e) {
        if (e === "left"){
            this.isLeftOpen = !this.isLeftOpen
        }
        if (e==="right"){
            this.isRightOpen = !this.isRightOpen
        }
        if (e==="bottom") {
            this.isBottomOpen = ! this.isBottomOpen
            dispatchIsBottomListOpen(this.isBottomOpen)
        }
        this.requestUpdate()

  
    }



    render() {


        let style = html`
        <style>
            ${getFullScreen({
                            isBottomOpen: this.isBottomOpen,
                            isLeftOpen: this.isLeftOpen,
                            isRightOpen: this.isRightOpen
                        })}

            button {
                z-index: 10000;
            }
        </style>
        `

        console.log(getFullScreen({
            isBottomOpen: this.isBottomOpen,
            isLeftOpen: this.isLeftOpen,
            isRightOpen: this.isRightOpen
        }).toString().split("\n").filter(ele => ele.includes("row")), i )

        console.log("isbotom open", this.isBottomOpen)
        i++
        return html`

        ${style}

        <div class="grid-class fullscreen">


            <button class="btnLeftTop"> 
                ${leftButton(() => {
                    this.switchMenu("left")
                    console.log("from the left button");
                    
                } 
                )}
            </button>

            <!--<div class="btnLeftTop"> ${leftButton(() => this.switchMenu("left"))}</div>-->

            
            <!--<button class="btnRightTop" @click=${() => this.switchMenu("right") }> switch right Menu</button>-->
            <button class="btnRightTop" >        
            ${rightButton(() => {
                    this.switchMenu("right")
                    console.log("from the left button");
                    
                } 
                )}
           
            </button>

            <div class="a ${this.isLeftOpen ? "": "hide left"}">
            <slot name="left-menu"></slot> 
            </div>
            <div class="b ${this.isRightOpen ? "": "hide right"}">
                <slot name="right-menu"></slot> 
            </div>
            <div class="c">
                <slot name="main-content"></slot> 
            </div>

            <div class="d">
            <button style="width:100%; background-color:rgb(255,255,255);"  @click=${() => this.switchMenu("bottom") }> ${upDownArrow} </button>
                    <slot class="bottom" name="list-content"></slot> 
            </div>
        </div>

        <floating-action-button></floating-action-button>
        `
    }

}

customElements.define("main-view", MainView)



export const getMainSize = () => {
    const size = ({
        width: mainWidth,
        height: mainHeight,
    })

    console.log("size", size);
    

    return size
}