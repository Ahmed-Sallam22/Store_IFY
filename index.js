import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import initApp from './src/index.router.js'
const app = express()

app.use(express.json())

const port = process.env.PORT || 5000
// app.set('case sensitive routing',true)
initApp(app ,express)
app.listen(port, () => 
console.log(`Example app listening on port ${port}!`)
)