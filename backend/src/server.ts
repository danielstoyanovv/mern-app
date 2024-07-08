"use strict";

import express from "express"
import {config} from "dotenv"
config()
import workoutRoutes from './routes/workouts.js'
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import {DbConnect} from "./config/DbConnect";
import {verifyAdmin} from './middleware/verifyAdmin'
import { Request, Response } from "express"

const app = express()

const port = 4000

declare module 'express-serve-static-core' {
    export interface Request {
        user: any
    }
}

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', authRoutes)

app.post("/admin", verifyAdmin, (req: Request, res: Response) => {
    const { username } = req.body;
    res.send(`This is an Admin Route. Welcome ${username}`);
});

app.listen(port, () => {
    console.log('listening on port', port)
})

const connection = new DbConnect()