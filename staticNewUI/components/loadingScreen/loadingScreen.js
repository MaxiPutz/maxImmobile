import { LitElement, html } from "lit"
import { loadingScreen } from "./loadingStyle.js"


class LoadingScreen extends LitElement {
    static styles = [loadingScreen]

    render() {
        return html`
        <div class="loader">
        <div class="loader-text">Loading...</div>
        <div class="loader-bar"></div>
        </div>

        `
    }
}

customElements.define("loading-screen", LoadingScreen)