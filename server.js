import express from "express"
import cors from "cors"
import fs from "fs"

const port = 3000
const BASE_PATH = process.env.BASE_PATH ?? ""

console.log(BASE_PATH)
const app = express()

app.use(cors())
app.use(`${BASE_PATH}/new`, express.static("staticNewUI"))
app.use(`${BASE_PATH}/old`, express.static("static"))
app.use(`${BASE_PATH}`, express.static("public"))



app.listen(port, () => console.log("server is listen on port " + port + "\n" + `productiv is if you run npm build then you can join the webside on http://yourUrl:${port}` + ` debug version is on http://localhost:${port}/new`))

const transitPath = "./assets/transit/"
let files = fs.readdirSync(transitPath).filter(ele => ele.includes(".json"))

fs.writeFileSync(transitPath + "index.js", `
  export const transitOptions = ${JSON.stringify(files)}
  `)

files = fs.readdirSync(transitPath)

const staticDirs = [
  "./public/assets/transit/",
  "./staticNewUI/assets/transit/",
  "./static/assets/transit/"
]

staticDirs.flatMap(dir => fs.readdirSync(dir).map(_dir => dir + _dir).filter(e => e.includes(".js"))).forEach(ele => fs.unlinkSync(ele))

files.forEach(file => {
  const content = fs.readFileSync(transitPath + "/" + file).toString()

  staticDirs.forEach(dir => fs.writeFileSync(dir + file, content))
})

app.get('/', (req, res) => {
  res.send('Hello, World!');
})




