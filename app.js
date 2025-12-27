import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConn from './config/userDb.js'
import usersRoutes from './routes/userRouter.js'

dotenv.config() //initialize environment variables from .env
dbConn() //initialize Database pool

const app = express() //created instance of express application

app.use(json()) //parsing incoming JSON requests
app.use(cors()) //enabling CORS for all routes
app.use("/users", usersRoutes) //addes users routes

const PORT = process.env.PORT || 3000 //set api port number



//start api server
app.listen(PORT, () => {
    console.log(`User APIs Are running on port ${PORT}`)
}) 