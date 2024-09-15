import { fetchUrl } from "../fetchWillhabenImmo/lib/fetchWillHabenDoc.js"
import fs from "fs"
import { getImmoJson } from "./lib/getImmoJson.js";
import {convertPropertyToInputJson} from "./lib/immoScourtToMaxImmo.js"

const postcodesJSON = Object.entries(JSON.parse( fs.readFileSync("./postcodesMap.json")))
const postcodes = JSON.parse(fs.readFileSync("./postcodesMap.json"))


let getUrl = (postcode) => 
    `https://www.immobilienscout24.at/regional/${postcode}/wohnung-bis-1100-euro-mieten`
    //"https://www.immobilienscout24.at/regional/niederoesterreich/wohnung-mieten/seite-2?primaryPriceTo=1300"
    //"https://www.immobilienscout24.at/regional/niederoesterreich/wohnung-mieten?primaryPriceTo=1300"
    //"https://www.immobilienscout24.at/regional/3400/wohnung-mieten"

const tmp = []
let message = ""
const result = []
let i = 0
for (const [postcode, obj] of postcodesJSON) {
    
    const res = await getImmoJson(getUrl(postcode))
    if (res.length === 15) {
        message = getUrl(postcode)
        
    }
    tmp.push(res.length)
    result.push(...res)

    i++
    console.log(i, postcodesJSON.length);
    
    
}

console.log(tmp)
console.log(tmp.reduce((prev, cur) => prev + cur))
console.log(tmp.filter(ele => ele === 15).length   ) 

console.log(message)
fs.writeFileSync("./detailResult.json", JSON.stringify(result, undefined, 4 ))


const res = result.map(ele => convertPropertyToInputJson(ele, postcodes))
.filter(ele => ele.price !== "NaN" && ele.price !== undefined && ele.price !== "")
.filter(ele => ele.squareMeters)
console.log(res)

fs.writeFileSync("./result.json", JSON.stringify(res, undefined, 4))

