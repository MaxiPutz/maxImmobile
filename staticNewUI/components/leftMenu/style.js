import { css } from "lit";


export const leftMenuStyle = css`
:host{
  background-color: white;
  z-index: 1;
}

.container {
    margin-top: 70px;
    background-color: white;
    height: 100%
}

select {
    padding: 10px;
    margin-top: 10px;
    width: 200px; /* Adjust as needed */
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    cursor: pointer;
    appearance: none; /* For a cleaner look */
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

option {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 150px; /* Adjust the width as needed */
    display: block;
    max-width: 100%;
}


/* Input container */
.input-container {
  position: relative;
  margin: 20px;
}

/* Input field */
.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  background-color: transparent;
}

/* Input label */
.input-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(204, 204, 204, 0);
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Input highlight */
.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #007bff;
  transition: all 0.3s ease;
}

/* Input field:focus styles */
.input-field:focus + .input-label {
  top: -20px;
  font-size: 12px;
  color: #007bff;
}

.input-field:focus + .input-label + .input-highlight {
  width: 100%;
}

/** new drop down */


`


export const dropDownStyle =css`
/* From Uiverse.io by gharsh11032000 */ 
.menu {
  font-size: 16px;
  line-height: 1.6;
  width: fit-content;
  display: flex;
  list-style: none;
}

.menu a {
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #000000;

}

.menu .link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 36px;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.menu .link::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0a3cff;
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.menu .link svg {
  width: 14px;
  height: 14px;
  fill: #000000;
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.menu .item {
  position: relative;
}

.menu .item .submenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100%;
  border-radius: 0 0 16px 16px;
  left: 0;
  width: 100%;
  overflow: hidden;
  border: 1px solid #cccccc;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-12px);
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1;
  pointer-events: none;
  list-style: none;
}

.menu .item:hover .submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
  border-top: transparent;
  border-color: #0a3cff;
  background-color: white;
}

.menu .item:hover .link {
  color: #ffffff;
  border-radius: 16px 16px 0 0;
}

.menu .item:hover .link::after {
  transform: scaleX(1);
  transform-origin: right;
}

.menu .item:hover .link svg {
  fill: #ffffff;
  transform: rotate(-180deg);
}

.submenu .submenu-item {
  width: 100%;
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.submenu .submenu-link {
  display: block;
  padding: 12px 24px;
  width: 100%;
  position: relative;
  text-align: center;
  transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.submenu .submenu-item:last-child .submenu-link {
  border-bottom: none;
}

.submenu .submenu-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  width: 100%;
  height: 100%;
  background-color: #0a3cff;
  z-index: -1;
  transform-origin: left;
  transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.submenu .submenu-link:hover:before {
  transform: scaleX(1);
  transform-origin: right;
}

.submenu .submenu-link:hover {
  color: #ffffff;
}

`