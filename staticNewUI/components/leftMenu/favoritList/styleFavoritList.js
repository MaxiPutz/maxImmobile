import { css } from "lit"



export const styleFavoritList = css`

button {
    background: white;
    border-radius: 20px;
    border: 5px solid black;
}

button:hover {
    background-color: lightblue;
}

.container {
    margin-right: 20px;
    display: grid;
    border: 5px solid black;
}
.favort-input{
    display:none;

}
.open-list {
    display: grid;
    text-align: center;
    align-items: center;
    display: none;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    column-gap: 55px;
    row-gap: 25px;
    padding: 10px;
    transition: transform 0.5s ease;
    padding-top: 80px;
    padding: 50px;
    padding-bottom: 80px;
    height: 80vh;
}

.favort-input:not(:checked) ~ .open-list {
    z-index: 9000;
    padding: 50px;
    background-color: white;
    display: grid;
    position: fixed;
    top: 0px;
    left: 0px;
    border-right: 5px solid black;
    transform: translateX(-100%);
}

.favort-input:checked ~ .open-list {
    z-index: 90000;
    background-color: white;
    display: grid;
    position: fixed;
    width: 80%;
    top: 0px;
    left: 0px;
    border-right: 5px solid black;
    width: 80vw;

}

.close-button {
    z-index: 90001;
    position: absolute;
    display: grid;
    top: 25px;
    right: 25px;
}

`