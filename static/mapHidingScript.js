import { html, render, } from 'https://cdn.zywave.com/lit-html@2.1.1/lit-html.js';
import { styleMap } from "https://cdn.zywave.com/lit-html@2.1.1/directives/style-map.js"

const hideMapCheckbox = () => {


    return html` 
        <div style="position: fixed; top: 10px; left: 10px; z-index: 9999; background: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px;">
            <label>hide map</label>
            <input type="checkbox" @change=${(event => {
                console.log(event);
                
            const isChecked = event.target.checked
            const mapDiv = document.getElementById('map');
            if (isChecked) {
                mapDiv.classList.add('hidden');
            } else {
                mapDiv.classList.remove('hidden');
            }

        })}/>
        </div>`
}

render(hideMapCheckbox(), document.body)

/*

document.addEventListener('DOMContentLoaded', function () {
    const mapDiv = document.getElementById('map');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hideMapCheckbox';
    checkbox.style.display = 'block';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'hideMapCheckbox';
    checkboxLabel.textContent = 'Hide Map';

    const appMenu = document.getElementById('app-menu');
    appMenu.appendChild(checkboxLabel);
    appMenu.appendChild(checkbox);

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            mapDiv.classList.add('hidden');
        } else {
            mapDiv.classList.remove('hidden');
        }
    });
});
*/