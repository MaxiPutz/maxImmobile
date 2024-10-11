import { css } from "lit"

const girdClass = css`

    :host {
    }

    .grid-class {
            display: grid;
    }

    .a {
        grid-area: a;
    }   

    .b {
        grid-area: b;
        background-color: white;
    }
     
    .c {
        grid-area: c;
        background-color: white;
    }

    .d {
        grid-area: d;
        z-index: 3;
        background-color: white;
    }

    div {
        height: 100%;
        width: 100%;
    }

    slot {
        height: 100%;
        width: 100;
    }
`

/**
 * @param {Object} openInfo
 * @param {boolean} openInfo.isLeftOpen 
 * @param {boolean} openInfo.isRightOpen 
 * @param {boolean} openInfo.isBottomOpen 
 * @returns {string}
 */
export const getFullScreen =  (openInfo)=> {
    console.log(openInfo);
    console.log(`    grid-template-rows: ${openInfo.isBottomOpen ? 0 : 1}fr ${openInfo.isBottomOpen ? 0 : 1}fr 1fr;`);
    
    
 return css`
    ${girdClass}
   
   .fullscreen {
        grid-template-areas: 
            "a c c b"
            "a c c b"
            "a d d b";

        grid-template-rows: ${openInfo.isBottomOpen ? 0 : 1}fr ${openInfo.isBottomOpen ? 0 : 1}fr 1fr;
        grid-template-columns:${openInfo.isLeftOpen ? 1 : 0 }fr ${calcSpace(openInfo)}fr 1fr ${openInfo.isRightOpen ? 1 : 0 }fr;

        height: 100vh;
        width: 100vw;
        transition: 0.3s;
    }

    .hide {
        position: fixed;
        transition: 0.3s;
        width: 1fr;
        z-index: -1;
 
    }

    .left {
        transform: translateX(-100%);
    }

    .right {
        right: 0px;
        transform: translateX(100%);
        z-index: -2;
    }

    .btnLeftTop {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: white;
        z-index: 10000;
    }

    .btnRightTop {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background-color: white;

    }
`
}


/**
 * @param {Object} openInfo
 * @param {boolean} openInfo.isLeftOpen 
 * @param {boolean} openInfo.isRightOpen 
 * @param {boolean} openInfo.isBottomOpen 
 * @returns {string}
 */
function calcSpace(openInfo) {
    openInfo.isBottomOpen = false
    return Object.values(openInfo).reduce((prev, cur) => !cur ? prev + 1 : prev , 1 )
}