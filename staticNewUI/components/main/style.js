import { css } from "lit"

const girdClass = css`

    .grid-class {
            display: grid;
    }

    .a {
        grid-area: a;
        background-color: blue;
    }   

    .b {
        grid-area: b;
        background-color: gray;
    }
     
    .c {
        grid-area: c;
        background-color: yellow;
    }

    .d {
        grid-area: d;
        background-color: green;
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
        transition: 0.3s;
    }

    .hide {
        position: fixed;
        transition: 0.3s;
        width: 1fr;
 
    }

    .left {
        transform: translateX(-100%);
    }

    .right {
        right: 0px;
        transform: translateX(100%);
    }

    .btnLeftTop {
        position: fixed;
        top: 20px;
        left: 20px
    }

    .btnRightTop {
        position: fixed;
        top: 20px;
        right: 20px
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