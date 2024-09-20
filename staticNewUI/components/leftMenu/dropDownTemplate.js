import { css, html } from "lit";


/**
 * @param {string[]} options
 * @param {number} selectedIndex
 * @param {function({number} index)} callback
 * @returns 
 */
export function dropdownComponent(options, selectedIndex, callback) {
    return html`
    <div class="menu">
        <div class="item">
            <a href="#" class="link">
            <span> ${options[selectedIndex]} </span>
            <svg viewBox="0 0 360 360" xml:space="preserve">
                <g id="SVGRepo_iconCarrier">
                <path
                    id="XMLID_225_"
                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                ></path>
                </g>
            </svg>
            </a>
            <div class="submenu">
                ${options.map((ele, i) => {
                    return html`
                    <div class="submenu-item">
                        <a @click= ${() => {
                        console.log(i, ele)
                        callback(i)
                        }} href="#" class="submenu-link">${ele}</a>
                    </div>
                    `
                })}
            </div>
        </div>
    </div>

    `
}