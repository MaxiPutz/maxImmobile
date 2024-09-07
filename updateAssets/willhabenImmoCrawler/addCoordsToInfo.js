import fs from "fs"
import {getCoordinates} from "./lib/getCoordinates.js"

export async function addCoordsToInfo() {
    const data = JSON.parse( fs.readFileSync("infos.json").toString() )

console.log(data)

const result =  []
/*await Promise.all( data.map (async ele => {
    const coords = await getCoordinates(ele.destination)

    return {
        ...ele,
        coords
    }
}))*/

for (let ele of data ) {
    const coords = await getCoordinates(ele.destination)
    result.push({
        ...ele,
        coords
    })
}


fs.writeFileSync("result.json", JSON.stringify(result, undefined, 4))


}


//addCoordsToInfo()
