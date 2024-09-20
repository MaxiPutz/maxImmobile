import { css, html } from "lit"


const style = css`
#checkbox-r {
  display: none;
}

.toggle-r {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: .3s;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
  padding: 4px;
  border-radius: 3px;
}

.bars-r {
  width: 100%;
  height: 4px;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
  transition-duration: .3s;
  z-index: 1000;
}


#checkbox-r:checked + .toggle-r #bar2-r {
  transform: translateY(14px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: .3s;
  z-index: 2;
}

#checkbox-r:checked + .toggle-r #bar1-r {
  transform: translateY(28px) rotate(-60deg);
  transition-duration: .3s;
  transform-origin: left;
  z-index: 1;
}

#checkbox-r:checked + .toggle-r {
  transform: rotate(90deg);
}


`

const styleTag= html `
<style>
    ${style}
</style>
`

/**
 * 
 * @param {function (string)} callback 
 */
export const rightButton = (callback) => {
    return html`
    ${styleTag}
    <input id="checkbox-r" type="checkbox" @change=${() => {
        console.log("from checkbox")
        callback()
    }}>
    <label class="toggle-r" for="checkbox-r">
        <div id="bar1-r" class="bars-r"></div>
        <div id="bar2-r" class="bars-r"></div>
        <div id="bar3-r" class="bars-r"></div>
    </label>
    `
}

