import { css, html } from "lit"


const style = css`
#checkbox {
  display: none;
}

.toggle {
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

.bars {
  width: 100%;
  height: 4px;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
  transition-duration: .3s;
  z-index: 1000;
}


#checkbox:checked + .toggle #bar2 {
  transform: translateY(14px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: .3s;
  z-index: 2;
}

#checkbox:checked + .toggle #bar1 {
  transform: translateY(28px) rotate(-60deg);
  transition-duration: .3s;
  transform-origin: left;
  z-index: 1;
}

#checkbox:checked + .toggle {
  transform: rotate(-90deg);
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
export const leftButton = (callback) => {
    return html`
    ${styleTag}
    <input id="checkbox" type="checkbox" @change=${() => {
        callback()
    }}>
    <label class="toggle" for="checkbox">
        <div id="bar1" class="bars"></div>
        <div id="bar2" class="bars"></div>
        <div id="bar3" class="bars"></div>
    </label>
    `
}

