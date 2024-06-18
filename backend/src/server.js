"use strict";

import express from "express"
import {config} from "dotenv"
config()
import workoutRoutes from './routes/workouts.js'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URL + '/workouts')
    .then(() => {
        app.listen(process.env.BACKED_PORT, () => {
            console.log('listening on port', process.env.BACKED_PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
