import { LitElement, html } from "lit";
import { getFullScreen } from "./style.js"

let i = 0 

let mainHeight = 100
let mainWidth = 100

let dispatchSlotSize = (info) => undefined

export function setDispatchSlotSize (injectDispatchSlotSize) {
    dispatchSlotSize = injectDispatchSlotSize
}


class MainView extends LitElement {


    static get properties () {
        return {
            isListOpen : {type: Boolean},
            isRightOpen: {type: Boolean},
            isBottomOpen: {type: Boolean}
        }  
    }


    constructor () {
        super()
        this.isLeftOpen = true
        this.isRightOpen = true
        this.isBottomOpen = false
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

            <button class="btnLeftTop" @click=${() => this.switchMenu("left")}> switch Left Menu</button>
            
            <button class="btnRightTop" @click=${() => this.switchMenu("right") }> switch right Menu</button>


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
            <button style="width:100%"  @click=${() => this.switchMenu("bottom") }> view List</button>
                    <slot name="list-content"></slot> 
                 
            </div>
        </div>
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