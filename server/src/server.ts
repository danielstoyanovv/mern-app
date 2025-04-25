"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config();
import {MongoDbConnect} from "./config/MongoDbConnect";
import helmet from "helmet";
import cors from "cors"
import {createUserRouter} from "./routes/users/create";
import {allUsersRouter} from "./routes/users/all";
import {errorHandlerMiddleware} from "./middlewares/error-handlerMiddleware";

const app = express()

const port = process.env.BACKED_PORT || 4000
const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"

app.use(express.json())

app.use(helmet())

app.use(cors())

// app.post("/" + API_PREFIX + "/" + API_VERSION + "/users", createUser);
//
// app.patch("/" + API_PREFIX + "/" + API_VERSION + "/users/:id", userRequestValidatorMiddleware, verifyEmailMiddleware, authMiddleware, updateUser)
//
// app.delete("/" + API_PREFIX + "/" + API_VERSION + "/users/:id", authMiddleware , deleteUser)
//
// app.post("/" + API_PREFIX + "/" + API_VERSION + "/login", userRequestValidatorMiddleware, loginUser)
//
// app.get("/" + API_PREFIX + "/" + API_VERSION +  "/users", getCachedUsersMiddleware, getUsers);
//
// app.get("/" + API_PREFIX + "/" + API_VERSION + "/users/:id", getUserFromCacheMiddleware, getUser)

app.use(createUserRouter)
app.use(allUsersRouter)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log('listening on port', port)
})

const database = new MongoDbConnect()