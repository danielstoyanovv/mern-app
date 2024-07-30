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
import {validateUserRequest} from "./middleware/validateUserRequest";
import {createUser, updateUser, deleteUser} from "./controllers/userController";
import {VerifyToken} from "./middleware/verifyToken";

const app = express()

const port = 4000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({mssg: 'Welcome to the app'})
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', authRoutes)

app.post("/admin", verifyAdmin, (req: Request, res: Response) => {
    const { username } = req.body;
    res.send(`This is an Admin Route. Welcome ${username}`);
});

app.post("/api/users", validateUserRequest, createUser);

app.patch('/api/users/:id', validateUserRequest, verifyAdmin, VerifyToken, updateUser)

app.delete('/api/users/:id', verifyAdmin, VerifyToken, deleteUser)

app.listen(port, () => {
    console.log('listening on port', port)
})

const connection = new DbConnect()