import { css, html, LitElement } from "lit"


export const cardStyle = css`
:host {
  width: 150px;
  height: 120px;
}

.checkbox-card{
  display: none;
}



.flip-card {
  padding: 3px;
  background-color: white;
  width: 150px;
  height: 120px;
  perspective: 1000px;
  font-family: sans-serif;
}

.title {
  font-size: 1em;
  font-weight: 500;
  text-align: center;
  margin: 0;
}

.teaser {
  font-size: 0.5em;
  font-weight: 150;
  text-align: center;
  margin: 0;
}

.price {
  font-size: 1em;
  font-weight: 500;
  text-align: center;
  margin: 0;
}

.teaser {
  font-size: 0.5em;
  font-weight: 150;
  text-align: center;
  margin: 0;
}
.destination {
  font-size: 0.5em;
  font-weight: 50;
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.checkbox-card:checked + .flip-card .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 5px solid black;
  border-radius: 1rem;
}

.flip-card-front {
  background: white;
  color: black;
}

.flip-card-back {
  background: white;
  color: black;
  transform: rotateY(180deg);
}

.fav-card {
  background-color: lightgreen
}
`

export const flipIcon = css`
.icon-checkbox {
  display: none;
}

.icon-container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  perspective: 1000px;
  display: grid;
  align-items: center;
}

.icon-checkbox:checked  ~ [class*=bgc]  .icon-container {
  transform: rotateY(180deg);
}



.icon-container {
  position: relative;
  width: 100%;
  height: 100%; /* Make the height adjust to the content */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.icon-disable, .icon-enable {
  display: none; /* Hide icons by default */
}

.icon-checkbox:checked ~  [class*=bgc]  .icon-container .icon-enable {
  display: block; /* Show the enabled icon when checked */
}

.icon-checkbox:not(:checked) ~ [class*=bgc]  .icon-container .icon-disable {
  display: block; /* Show the disabled icon when not checked */
}

`

export const gridStyle = css`

/* Grid styling */
.grid-container {
  padding: 5px;
  height: 100%;
  justify-content: stretch;
  align-items: center;
  display: grid;
  grid-template-areas: 
    "fav fav cfp"
    "hid hid cfp"
    "opn opn cfp";
}
.fav {
  grid-area: fav;
}
.hid {
  grid-area: hid;
}
.opn {
  grid-area: opn;
}

.cfp {
  grid-area: cfp;
}


.fav, .hid, .opn, .cfp {
  display: grid;
  height: 100%;
}



.fav-bgc {
  height: 100%;

  background: linear-gradient(to right, white 50%, green 50%) left;
  background-size: 200%;
  transition: .5s ease-out;
}

.hid-bgc {
  background: linear-gradient(to right, white 50%, red 50%) left;
  background-size: 200%;
  transition: .5s ease-out;
}

.opn-bgc {
  background: linear-gradient(to right, white 50%, blue 50%) left;
  background-size: 200%;
  transition: .5s ease-out;
}

.cfp-bgc {
  background: linear-gradient(to right, white 50%, blue 50%) left;
  background-size: 200%;
  transition: .5s ease-out;
}

[class*="bgc"] {
  height: 100%;
}



.icon-checkbox:checked ~ [class*="bgc"] {
  background-color: white ;
  transition: all 1s ease-out;
  color: rgba(255, 255, 255, 0.8);
  background-position: right
}

`