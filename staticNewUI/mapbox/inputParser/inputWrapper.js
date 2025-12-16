import { transitOptions } from "../../assets/transit/index.js"
import { isLagacy, parseLagacy } from "./lagacyParser/lagacyParser.js";
import { BASE_PATH } from "../../../ENV_BASE_PATH.js";
/**
 * @typedef {Object} WillhabenJson
 * @property {string} postcode
 * @property {string} price - The price of the property.
 * @property {string[]} teaser - An array of strings providing a short description of the property.
 * @property {string} destination - The address of the property.
 * @property {string} url - The URL link to the property listing.
 * @property {Object} coords - The geographical coordinates of the property.
 * @property {number} coords.latitude - The latitude of the property location.
 * @property {number} coords.longitude - The longitude of the property location.
 * @property {number} coords.lat - The latitude of the property location.
 * @property {number} coords.lng - The longitude of the property location.
 * @property {boolean} isGenossenschaft
 * @property {number} squareMeters
 */

/**
 * Represents a journey between two points.
 * @typedef {Object} Journey
 * @property {number} time - The duration of the journey in minutes.
 * @property {Object} startPoint - The starting point of the journey.
 * @property {number} startPoint.lat - The latitude of the starting point.
 * @property {number} startPoint.long - The longitude of the starting point.
 * @property {string} startPoint.name - The name of the starting point.
 * @property {string} startPoint.id - The ID of the starting point.
 * @property {Object} endPoint - The ending point of the journey.
 * @property {number} endPoint.lat - The latitude of the ending point.
 * @property {number} endPoint.lng - The latitude of the ending point.
 * @property {number} endPoint.long - The longitude of the ending point.
 * @property {string} endPoint.name - The name of the ending point.
 * @property {string} endPoint.id - The ID of the ending point.
 * @property {number} endPointDist - The distance to the end point in meters.
 * @property {number} speed - The speed of the journey in km/h.
 * @property {number} distToStation - The distance to the next station in meters.
 */


async function loadAssetes() {
  function fetchAll() {
    let promisesAll = []

    promisesAll.push(new Promise((resolve) => {
      fetch(`./${BASE_PATH ?? ""}/assets/input.json`).then((ele) => {
        resolve({
          file: "input",
          data: ele
        })
      })


    }))


    const transitPath = `./${BASE_PATH}/assets/transit/`
    const transitFiles = transitOptions.map(ele => transitPath + ele)

    promisesAll.push(...transitFiles.map((ele) => new Promise((resolve) => fetch(ele).then(ele => resolve(({ file: "transit", data: ele }))))))

    return Promise.all(promisesAll)
  }


  const fetchedData = await fetchAll()
  console.log("fetchAll data", fetchedData);


  for (let i = 0; i < fetchedData.length; i++) {
    const element = fetchedData[i];
    console.log("fetchAll element", element);

    //let data = await element.data.json()

  }

  return Promise.all(fetchedData.map((ele) => new Promise(async (resolve) => {
    const data = await ele.data.json()

    resolve({
      ...ele,
      data: data
    })
  })))
}


const allAssets = await loadAssetes()

const app = document.querySelector(".app")
console.log(app);
app.classList.add("loaded")

console.log("fetch all", allAssets);


/**
 * @type {WillhabenJson[]}
 */
let raw = allAssets.find(ele => ele.file === "input").data // (await (await fetch(`./${BASE_PATH ?? ""}/assets/input.json`)).json()) raw = raw.slice(0, 100)
/** An array of properties available for rent or sale.
 * @type {WillhabenJson[]}
 */
export const willhabenJson = isLagacy(raw) ? parseLagacy(raw) : raw




/*
const transitPath = "../../assets/transit/"
let transitCollector =  await Promise.all( transitOptions.map(ele => transitPath + ele).map( ele => fetch(ele) )) 
console.log("transitCollecotr", transitCollector);
*/
const transitCollector = allAssets.filter(ele => ele.file === "transit").map(ele => ele.data) //await Promise.all(transitCollector.map(ele => ele.json()))

console.log("transitCollecotr", transitCollector);



/**
 * An array of properties available for rent or sale.
 * @type {Journey[]}
 */
export const transitInfoJson = transitCollector.map((ele) => ele.map((ele) => ({
  ...ele,
  startPoint: {
    ...ele.startPoint,
    lng: ele.startPoint.long
  },
  endPoint: {
    ...ele.endPoint,
    lng: ele.endPoint.long
  },
})))



let selectTransitIndex = 0

export const setSelectTransitIndex = (num) => {
  console.log("selected Index", num);

  selectTransitIndex = num
}

export const getSelectedTransitInfoJson = () => {

  return transitInfoJson[selectTransitIndex]
}

/**
 * An array of properties available for rent or sale.
 * @type {WillhabenJson[]}
 */
let willhabenJsonFiltered = willhabenJson

/**
 * An array of properties available for rent or sale.
 * @param {WillhabenJson[]} arr
 */
export function setWillhabenFilter(arr) {
  willhabenJsonFiltered = arr
  console.log("willhabenJsonFilterd", willhabenJsonFiltered);
  //customRender()

}

export function getWillhabenFilterJson() {
  console.log("this is witten", willhabenJsonFiltered);

  return willhabenJsonFiltered
}

