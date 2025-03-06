import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000
import morgan from 'morgan'
import cors from 'cors'
import ConnectDB from './config/db.js'

ConnectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get("/",(req,res)=>{
    return res.send("Hello")
})

app.listen(port,()=>{
    console.log(`Server is listening on port: http://localhost:${port}`);
})