"use strict";

import express from "express"
import {config} from "dotenv"
config()
import workoutRoutes from './routes/workouts.js'
import {DbConnect} from "./config/DbConnect";

const app = express()

const port = 4000

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.use('/api/workouts', workoutRoutes)

app.listen(port, () => {
    console.log('listening on port', port)
})

const connection = new DbConnect()