import { css } from "lit";

export const floatingActinButtonStyle = css`

.fab-container {
    z-index: 10;
    position: absolute;
    display: block;
    bottom: 80px;
    right: 80px;
}


.button-menu {
  transform: translateX(-2px);
  display: block;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  background-color:  #007bff;
  border: 2px solid #1e1e1e;
  color: #1e1e1e;
  font-size: 30px;
  font-weight: 700;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  -webkit-box-shadow: 0px 3px 10px 0px rgba(16, 16, 16, 0.5);
  -moz-box-shadow: 0px 3px 10px 0px rgba(16, 16, 16, 0.5);
  box-shadow: 0px 3px 10px 0px rgba(16, 16, 16, 0.5);
}

button svg {
    width: 100%;
    height: 100%;
  }

.checkbox {
  display: none;
  width: 60px;
  height: 60px;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}

.option {
  display: block;
  position: absolute;
  background-color: white;
  border: 2px solid rgb(0,0,0);
  color: rgb(0,0,0);
  z-index: 1;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
  -webkit-box-shadow: 3px 3px 10px 0px rgba(16, 16, 16, 0.5);
  -moz-box-shadow: 3px 3px 10px 0px rgba(16, 16, 16, 0.5);
  box-shadow: 3px 3px 10px 0px rgba(16, 16, 16, 0.5);
}

.checkbox:hover ~ .button-menu,
.checkbox:checked ~ .button-menu {
  background-color: #007bff;
  scale: 0.98;
  box-shadow: none;
}

.checkbox:not(:checked) ~ .button-menu::before {
}

.checkbox:checked ~ .button-menu::after {
  scale: 0.98;
  box-shadow: none;
}

.checkbox:not(:checked) ~ .option {
  box-shadow: none;
}

.option:hover {
}

.sortdown {
    box-shadow: none;
    scale: 0.9;
}

.sortup {
    scale: 1.15;
}



.checkbox:checked ~ .option-a {
  transition-delay: 0.1s;
  transform: translateY(-70px);
}

.checkbox:checked ~ .option-b {
  transition-delay: 0.2s;
  transform: translateY(-140px);
}

.checkbox:checked ~ .option-c {
  transition-delay: 0.3s;
  transform: translateY(-210px);
}

`