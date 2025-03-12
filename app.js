import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000
import morgan from 'morgan'
import cors from 'cors'
import ConnectDB from './config/db.js'
import web from './routes/web.js'

ConnectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use("/api/v1/auth",web)
app.use("/api/v1/auth",web)
app.use("/api/v1/auth",web)
app.use("/api/v1/auth",web)

app.listen(port,()=>{
    console.log(`Server is listening on port: http://localhost:${port}`);
})