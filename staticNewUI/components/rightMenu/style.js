import { css } from "lit";


export const teaserStyle = css`
.info-text {
  position: relative;
}

.and-area {
  margin: 10px;
  border-top: 1px solid;
  
}

.container {
  margin-top: 70px;
}

.hidden {
 display: none;
}

.visible {
position: relative;
margin-left: 20px;
top: 10px;
right: 10px;
background: white;
padding: 10px;
}
`;


export const getCheckBoyStyleByScale = (scale) => css`

    .checkbox-container {
        margin-top: 10px;
    }

    /* The switch - the box around the slider */
    .switch {
      font-size: calc(17px * ${scale});
      position: relative;
      display: inline-block;
      width: calc(3.5em * ${scale});
      height: calc(2em * ${scale});
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: #9fccfa;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .slider:before {
      position: absolute;
      content: "";
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(2em * ${scale});
      width: calc(2em * ${scale});
      inset: 0;
      background-color: white;
      border-radius: 50px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .switch input:checked + .slider {
      background: #0974f1;
    }

    .switch input:focus + .slider {
      box-shadow: 0 0 1px #0974f1;
    }

    .switch input:checked + .slider:before {
      transform: translateX(calc(1.6em * ${scale}));
    }

`

export const checkBoxStyle = css`
/* From Uiverse.io by gharsh11032000 */ 
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #9fccfa;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slider:before {
  position: absolute;
  content: "";
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  width: 2em;
  inset: 0;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch input:checked + .slider {
  background: #0974f1;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #0974f1;
}

.switch input:checked + .slider:before {
  transform: translateX(1.6em);
}


`