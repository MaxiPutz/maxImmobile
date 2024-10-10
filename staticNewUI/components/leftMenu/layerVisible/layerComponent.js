import { css, html, LitElement } from "lit";
import { toggleRailLayerVisible } from "../../../mapbox/layer/railLayer.js";
import { map } from "../../../mapbox/mapboxComponent.js";
import { mapId } from "../../../mapbox/staticNames.js";
import { toggleBusLayerVisible } from "../../../mapbox/layer/busLayer.js";




export class LayerComponent extends LitElement {

    static styles = css`
        .container {
            display: grid;
            justify-content: space-around;
            padding: 5px;
            border: solid;
            border-width: 5px;

            margin: 10px;
            margin-right: 30px;
            justify-content: space-around;
            /* align-items: start; */
            justify-items: center;
            grid-template-columns: 1fr 1fr;
            border-width: 5px;
        }

        input {
            display: none;
        }

        input:not(:checked) ~ .icon {
            opacity: 0.3;
        }

        input:checked ~ .icon {
            opacity: 1;
        }
    `

    constructor() {
        super()
        console.log("layerComponent", "constructor");
    }

    firstUpdated() {
        const element = this.shadowRoot.querySelector("input")
        element.checked = true;
    }
    
    render() {
        console.log("layerComponent", "render");


        return html`
            <div class="container">
                <label class="checkbox">
                    <input type="checkbox" @change=${() => toggleRailLayerVisible(map, mapId.publicRailStation)}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/train.png" class="icon">
                </label>
                <label class="checkbox">
                    <input type="checkbox" @change=${() => toggleBusLayerVisible(map, mapId.publicBusStation)}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/bus.png" class="icon">
                </label>
            </div>
        `
    }
    
}
customElements.define("layer-component", LayerComponent)