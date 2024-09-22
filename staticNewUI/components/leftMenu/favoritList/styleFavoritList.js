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
}

.favort-input:checked ~ .open-list {
    z-index: 9000;
    background-color: white;
    display: grid;
    position: fixed;
    margin-left: 50px;
    height: 80%;
    width: 80%;
    top: 50px;
    right: 50px;
    border: 5px solid black;
}

`