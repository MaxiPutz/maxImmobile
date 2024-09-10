import express from "express"
import cors from "cors"
import fs from "fs"

const port = 3000

const app = express()

app.use(cors())
app.use(express.static('static'));

app.listen(port, () => console.log("server is listen on port " + port))

const transitPath = "./static/assets/transit/"
const files = fs.readdirSync(transitPath).filter(ele => ele.includes(".json"))
console.log(files);



fs.writeFileSync(transitPath + "index.js", `
  export const transitOptions = ${JSON.stringify(files)}
  `)

app.get('/', (req, res) => {
  res.send('Hello, World!');
})


