import {css} from "lit"

export const loadingScreen = css`
/* From Uiverse.io by Satwinder04 */ 
.loader {
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader-text {
  font-size: 24px;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  align-self: center;
}

.loader-bar {
  width: 30%;
  height: 10px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0);
  animation: loader-bar-animation 2s ease-in-out infinite;
}

@keyframes loader-bar-animation {
  0% {
    /* transform: translateX(-100%) rotate(270deg); */
    transform: translateX(-100%);
  }

  50% {
    /* transform: translateX(100%) rotate(-90deg); */
    transform: translateX(100%);
  }

  100% {
    /* transform: translateX(-100%) rotate(270deg); */
    transform: translateX(-100%);
  }
}
`