import fs from "fs"

const input1 = JSON.parse( fs.readFileSync("../fetchImmoScout/result.json"))
const input2 = JSON.parse( fs.readFileSync("../fetchWillhabenImmo/result.json"))

const output = [...input1, ...input2]

fs.writeFileSync("../../static/assets/input.json", JSON.stringify(output))