import { getRandomPoints, getHomogeneousPoints, generateGrid, distCoordsToMeter } from "./lib/generateRandomPoints.js"
import { findNearestStation } from "./lib/findNearestStation.js"
import { client } from "./lib/hafasClient.js"
import { getNextMonday } from "./lib/nextMondayAt6to10.js"
import fs from "fs"
import { calcPublicDuration } from "./lib/calcPublicDuration.js"

const searchAndRecalcGrid = false

const skipStation = 1 //<-----------------------------achtung should be 1 for testing 10

const latitude =  
//48.1855 // Wien HBF
48.23714265416501 // dresdnerstraße u6  
// 48.1855 // Wien HBF
const longitude = 
//16.3781  // Wien HBF
16.37967587837673 // dresdnerstraße u6 
 //16.3781  // Wien HBF


//const points = getRandomPoints(latitude, longitude, 65, 10)
const points = generateGrid({ lat: latitude, lng: longitude }, 60000, 1000)



let res = []

if (searchAndRecalcGrid) {

    for (const ele of points) {
        res.push(
            await findNearestStation(ele.lat, ele.lng)
        )
        console.log(ele);

    }



    res = res.reduce((prev, curr, i) => curr.length == undefined ? [...prev, curr] : [...prev, ...curr], [])



    console.log(res)
    console.log(res.length);
    res = res.filter(res => res.isValid)//.filter(ele => ele.name.includes("Bahnhof"))

    fs.writeFileSync("endPoint.json", JSON.stringify(res, undefined, 4))
} else {
    res = JSON.parse( fs.readFileSync("endPoint.json").toString()) 
}


console.log(res.length);

console.log(res);


const startPoints = res



const endPoint = await findNearestStation(latitude, longitude)


console.log(startPoints);

let result = []
let detailResult = []
for (let i = 0; i< startPoints.length; i+=skipStation) {
    const startPoint = startPoints[i]


    console.log("startpoint", startPoint);
    console.log(i, startPoints.length);


    let time = undefined   
    let journeys = undefined
    try {
         const durationObj = await calcPublicDuration(startPoint.id, endPoint[0].id)
    
        time = durationObj.time
        journeys = durationObj.journeys
    } catch {

    }

    console.log(time);

    
    const endP = endPoint[0]

    const endPointDist = distCoordsToMeter({ lat: startPoint.lat, lng: startPoint.long }, { lat: endP.lat, lng: endP.long })
    const speed = endPointDist / 1000 / (time / 60)

    /*
    const startStationPointLat = journeys[0].legs[0].origin.latitude
    const startStationPointLnt = journeys[0].legs[0].origin.longitude
    */

    const resultEle = {
        time: time,
        /*
        startStationPoint : {
            lat: startStationPointLat,
            long: startStationPointLnt,
            name: startPoint.name,
            id: startPoint.id,
            log: startStationPointLnt,
        },
        */
        startPoint: {
            lat: startPoint.lat,
            long: startPoint.long,
            name: startPoint.name,
            id: startPoint.id
        },
        endPoint: {
            lat: endP.lat,
            long: endP.long,
            name: endP.name,
            id: endP.id
        },
        endPointDist,
        speed,
        distToStation: endP.dist
    }
    result.push(resultEle)
    detailResult.push({
        ...resultEle,
        journeys,
    })
    
}

console.log(result);



fs.writeFileSync("points.json", JSON.stringify(points, undefined, 4))



result = result.filter(ele => ele.time)
detailResult = detailResult.filter(ele => ele.time)


fs.writeFileSync("result.json", JSON.stringify(result, undefined, 4))
fs.writeFileSync("detailResult.json", JSON.stringify(detailResult, undefined, 4))





// 8178001
//