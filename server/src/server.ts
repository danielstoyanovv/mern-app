"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config();
import {MongoDbConnect} from "./config/MongoDbConnect";
import helmet from "helmet";
import cors from "cors"
import {createUserRouter} from "./routes/users/create";
import {allUsersRouter} from "./routes/users/all";
import {oneUserRouter} from "./routes/users/one";
import {deleteUserRouter} from "./routes/users/delete";
import {patchUserRouter} from "./routes/users/update";
import {errorHandlerMiddleware} from "./middlewares/error-handlerMiddleware";
import {loginRouter} from "./routes/auth/login";

const app = express()

const port = process.env.BACKED_PORT || 4000

app.use(express.json())

app.use(helmet())

app.use(cors())

app.use(createUserRouter)
app.use(allUsersRouter)
app.use(oneUserRouter)
app.use(deleteUserRouter)
app.use(patchUserRouter)
app.use(loginRouter)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log('listening on port', port)
})

const database = new MongoDbConnect()