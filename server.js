import express from "express"
import cors from "cors"
import fs from "fs"

const port = 3000

const app = express()

app.use(cors())
app.use("/new", express.static('staticNewUI')); 
app.use('/old',express.static('static'));
app.use(express.static('public'));



app.listen(port, () => console.log("server is listen on port " + port + "\n" + `productiv is if you run npm build then you can join the webside on http://yourUrl:${port}` + ` debug version is on http://localhost:${port}/new`))

const transitPath = "./static/assets/transit/"
const files = fs.readdirSync(transitPath).filter(ele => ele.includes(".json"))
console.log(files);
 


fs.writeFileSync(transitPath + "index.js", `
  export const transitOptions = ${JSON.stringify(files)}
  `)

app.get('/', (req, res) => {
  res.send('Hello, World!');
})


